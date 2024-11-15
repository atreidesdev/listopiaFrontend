import {apiPost} from '@/shared/api/fetch';

type Login = {
  email: string;
  password: string;
};

type Register = {
  username: string;
} & Login;

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

export const login = async ({ email, password }: Login) => {
  const requestBody = { email, password };

  try {
    return await apiPost<AuthResponse>('auth/login', requestBody);
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};

export const register = async ({ email, username, password }: Register) => {
  const requestBody = { email, password, username };

  try {
    return await apiPost<AuthResponse>('auth/register', requestBody);
  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }
};
