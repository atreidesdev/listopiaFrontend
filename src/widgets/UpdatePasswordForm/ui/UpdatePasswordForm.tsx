'use client';
import { ButtonProps } from '@/shared/ui/button/button';
import { Form } from '@/shared/ui/form/form';
import { InputFieldProps } from '@/shared/ui/inputField/inputField';
import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Loader } from '@/shared/ui/loader/loader';
import { updatePassword } from '../model/api';

type UpdatePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
};

export const UpdatePasswordForm = ({ userId }: { userId: number }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<UpdatePasswordFormValues> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await updatePassword(userId, data);

      if (!error) {
        alert('Пароль обновлен');
      } else {
        setError(error || 'Неверный ответ от сервера');
      }
    } catch (error) {
      setError('Ошибка обновления пароля');
      Sentry.captureException(error, { level: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fields: Omit<InputFieldProps<UpdatePasswordFormValues>, 'control'>[] = [
    {
      name: 'currentPassword',
      type: 'password',
      placeholder: 'Введите текущий пароль',
      rules: {
        required: 'Текущий пароль обязателен',
      },
    },
    {
      name: 'newPassword',
      type: 'password',
      placeholder: 'Введите новый пароль',
      rules: {
        required: 'Новый пароль обязателен',
        minLength: {
          value: 8,
          message: 'Пароль должен содержать минимум 8 символов',
        },
      },
    },
  ];

  const buttons: ButtonProps[] = [
    {
      name: 'Обновить пароль',
      type: 'submit',
      variant: 'primary',
    },
  ];

  return (
    <div>
      <Form fields={fields} onSubmit={onSubmit} buttons={buttons} />
      {loading && <Loader />}
      {error && <p className="error">Ошибка: {error}</p>}
    </div>
  );
};
