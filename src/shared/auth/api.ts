import { apiPost } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';

type Login = {
  email: string;
  password: string;
};

type Register = {
  username: string;
} & Login;

type AuthResponse = {
  error?: string;
  access_token: string;
  refresh_token: string;
};

export const login = async ({ email, password }: Login) => {
  const requestBody = { email, password };

  try {
    return await apiPost<AuthResponse>('auth/login', requestBody);
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const register = async ({ email, username, password }: Register) => {
  const requestBody = { email, password, username };

  try {
    return await apiPost<AuthResponse>('auth/register', requestBody);
  } catch (error) {
    Sentry.captureException(error);
  }
};
