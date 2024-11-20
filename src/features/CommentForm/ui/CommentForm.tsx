'use client';

import { ButtonProps } from '@/shared/ui/button/button';
import { Form } from '@/shared/ui/form/form';
import { InputFieldProps } from '@/shared/ui/inputField/inputField';
import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { postComment } from '@/features/CommentForm/model/api';
import styles from './CommentForm.module.css';

type CommentFormValues = {
  text: string;
};

export const CommentForm = ({
  contentType,
  contentId,
}: {
  contentType: string;
  contentId: number;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await postComment(contentType, contentId, data);
      alert('Комментарий добавлен');
    } catch (error) {
      setError('Ошибка при добавлении комментария');
      Sentry.captureException(error, { level: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fields: Omit<InputFieldProps<CommentFormValues>, 'control'>[] = [
    {
      name: 'text',
      placeholder: 'Добавьте комментарий',
      rules: {
        required: 'Комментарий обязателен',
      },
    },
  ];

  const buttons: ButtonProps[] = [
    {
      name: 'Добавить комментарий',
      type: 'submit',
      variant: 'primary',
      disabled: loading,
    },
  ];

  return (
    <div className={styles.form}>
      <Form fields={fields} onSubmit={onSubmit} buttons={buttons} />
      {error && <p className="error">Ошибка: {error}</p>}
    </div>
  );
};
