'use client';
import { useStores } from '@/app/store/useStore';
import { login } from '@/shared/auth/api';
import { ButtonProps } from '@/shared/ui/button/button';
import { Form } from '@/shared/ui/form/form';
import { InputFieldProps } from '@/shared/ui/inputField/inputField';
import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

type LoginFormValues = {
  username: string;
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { authStore } = useStores();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(data);

      if (response?.access_token && response?.refresh_token) {
        authStore.setTokens(response.access_token, response.refresh_token);
        console.log('Login successful:', response);
        window.location.href = '/';
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      setError('Login error');
      Sentry.captureException(error, { level: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fields: Omit<InputFieldProps<LoginFormValues>, 'control'>[] = [
    {
      name: 'email',
      placeholder: 'Enter your email',
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter a valid email address',
        },
      },
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      rules: {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters long',
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          message:
            'Password must contain uppercase, lowercase letters, and numbers',
        },
      },
    },
  ];

  const buttons: ButtonProps[] = [
    {
      name: 'Login',
      type: 'submit',
      variant: 'primary',
    },
    {
      name: 'Reset',
      type: 'reset',
      variant: 'secondary',
    },
  ];

  return (
    <>
      <Form fields={fields} onSubmit={onSubmit} buttons={buttons} />
      {loading && <p>Logging in...</p>}
      {error && <p className="error">Ошибка входа: {error}</p>}
    </>
  );
};
