'use client';
import { useStores } from '@/app/store/useStore';
import { login } from '@/shared/auth/api';
import { ButtonProps } from '@/shared/ui/button/button';
import { Form } from '@/shared/ui/form/form';
import { InputFieldProps } from '@/shared/ui/inputField/inputField';
import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import styles from './LoginForm.module.css';
import { Loader } from '@/shared/ui/loader/loader';

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
        window.location.href = '/';
      } else {
        setError(response?.error || 'Неверный ответ от сервера');
      }
    } catch (error) {
      setError('Ошибка входа');
      Sentry.captureException(error, { level: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fields: Omit<InputFieldProps<LoginFormValues>, 'control'>[] = [
    {
      name: 'email',
      placeholder: 'Введите ваш email',
      rules: {
        required: 'Email обязателен',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Введите корректный email',
        },
      },
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Введите ваш пароль',
      rules: {
        required: 'Пароль обязателен',
        minLength: {
          value: 8,
          message: 'Пароль должен содержать минимум 8 символов',
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          message:
            'Пароль должен содержать заглавные и строчные буквы, а также цифры',
        },
      },
    },
  ];

  const buttons: ButtonProps[] = [
    {
      name: 'Войти',
      type: 'submit',
      variant: 'primary',
    },
  ];

  return (
    <div className={styles.LoginForm}>
      <Form fields={fields} onSubmit={onSubmit} buttons={buttons} />
      {loading && <Loader />}
      {error && <p className="error">Ошибка входа: {error}</p>}
    </div>
  );
};
