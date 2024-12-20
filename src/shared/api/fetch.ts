import authStore from '@/shared/auth/authStore';
import { API_URL } from '@/shared/constants';
import { Fetches } from '@siberiacancode/fetches';
import * as Sentry from '@sentry/nextjs';

type PendingRequest = {
  resolve: (value: string | null) => void;
  reject: (error: Error) => void;
};

export const fetchesInstance = new Fetches({
  baseURL: API_URL,
});

let isRefreshing = false;
let pendingRequests: PendingRequest[] = [];

type Config = {
  headers?: Record<string, string>;
  _retry?: boolean;
};

type HttpRequest = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown> | FormData;
};

const refreshAuthToken = async (): Promise<string | null> => {
  const { refreshToken } = authStore;
  try {
    const { access_token, refresh_token } = await fetchesInstance.post<{
      access_token: string;
      refresh_token: string;
    }>('auth/refresh-token', { refreshToken });

    authStore.setTokens(access_token, refresh_token);
    pendingRequests.forEach(({ resolve }) => resolve(access_token));
    pendingRequests = [];
    return access_token;
  } catch (error: unknown) {
    pendingRequests.forEach(({ reject }) => reject(error as Error));
    pendingRequests = [];
    authStore.clearTokens();
    Sentry.captureException(error as Error);

    throw error;
  } finally {
    isRefreshing = false;
  }
};

const handleAuthError = async (
  originalRequest: HttpRequest,
): Promise<unknown> => {
  if (!isRefreshing) {
    isRefreshing = true;
    const newToken = await refreshAuthToken();
    if (newToken) {
      if (originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      } else {
        originalRequest.headers = { Authorization: `Bearer ${newToken}` };
      }
      const { method, url, body, ...config } = originalRequest;
      switch (method) {
        case 'GET':
          return fetchesInstance.get(url, config);
        case 'POST':
          return fetchesInstance.post(url, body, config);
        case 'PUT':
          return fetchesInstance.put(url, body, config);
        case 'DELETE':
          return fetchesInstance.delete(url, config);
        default:
          throw new Error('Unsupported request method');
      }
    }
  } else {
    return new Promise((resolve, reject) => {
      pendingRequests.push({ resolve, reject });
    }).then((token) => {
      if (token && originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
      }
      const { method, url, body, ...config } = originalRequest;
      switch (method) {
        case 'GET':
          return fetchesInstance.get(url, config);
        case 'POST':
          return fetchesInstance.post(url, body, config);
        case 'PUT':
          return fetchesInstance.put(url, body, config);
        case 'DELETE':
          return fetchesInstance.delete(url, config);
        default:
          throw new Error('Unsupported request method');
      }
    });
  }
};

const attachToken = (config: Config): Config => {
  const token = authStore.getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

export const apiGet = async <T>(
  url: string,
  config: Config = {},
): Promise<T> => {
  const requestConfig = attachToken({ ...config });
  try {
    return await fetchesInstance.get<T>(url, requestConfig);
  } catch (error: unknown) {
    Sentry.captureException(error as Error);
    if (!requestConfig._retry) {
      requestConfig._retry = true;
      return handleAuthError({
        ...requestConfig,
        method: 'GET',
        url,
      }) as Promise<T>;
    }
    throw error;
  }
};

export const apiPost = async <T>(
  url: string,
  body?: Record<string, unknown> | FormData,
  config: Config = {},
): Promise<T> => {
  const requestConfig = attachToken({ ...config });

  try {
    return await fetchesInstance.post<T>(url, body, requestConfig);
  } catch (error: unknown) {
    Sentry.captureException(error as Error);
    if (!requestConfig._retry) {
      requestConfig._retry = true;
      return handleAuthError({
        ...requestConfig,
        method: 'POST',
        url,
        body,
      }) as Promise<T>;
    }
    throw error;
  }
};

export const apiDelete = async <T>(
  url: string,
  config: Config = {},
): Promise<T> => {
  const requestConfig = attachToken({ ...config });
  try {
    return await fetchesInstance.delete<T>(url, requestConfig);
  } catch (error: unknown) {
    Sentry.captureException(error as Error);
    if (!requestConfig._retry) {
      requestConfig._retry = true;
      return handleAuthError({
        ...requestConfig,
        method: 'DELETE',
        url,
      }) as Promise<T>;
    }
    throw error;
  }
};

export const apiPut = async <T>(
  url: string,
  body?: Record<string, unknown> | FormData,
  config: Config = {},
): Promise<T> => {
  const requestConfig = attachToken({ ...config });

  try {
    return await fetchesInstance.put<T>(url, body, requestConfig);
  } catch (error: unknown) {
    Sentry.captureException(error as Error);
    if (!requestConfig._retry) {
      requestConfig._retry = true;
      return handleAuthError({
        ...requestConfig,
        method: 'PUT',
        url,
        body,
      }) as Promise<T>;
    }
    throw error;
  }
};
