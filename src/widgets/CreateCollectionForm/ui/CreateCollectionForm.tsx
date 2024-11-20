import { ButtonProps } from '@/shared/ui/button/button';
import { Form } from '@/shared/ui/form/form';
import { InputFieldProps } from '@/shared/ui/inputField/inputField';
import * as Sentry from '@sentry/nextjs';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Loader } from '@/shared/ui/loader/loader';
import { createCollection } from '../model/api';

type CreateCollectionFormValues = {
  name: string;
  description?: string;
  poster: File | null;
  visibility: 'public' | 'private';
};

export const CreateCollectionForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [poster, setPoster] = useState<File | null>(null);

  const onSubmit: SubmitHandler<CreateCollectionFormValues> = async (data) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) {
      formData.append('description', data.description);
    }
    if (poster) {
      formData.append('poster', poster);
    }
    formData.append('visibility', data.visibility);
    try {
      await createCollection(formData);
      setSuccess(true);
      setError(null);
      alert('Коллекция успешно создана');
    } catch (error) {
      setError('Ошибка создания коллекции');
      Sentry.captureException(error, { level: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPoster(file);
    }
  };

  const fields: Omit<InputFieldProps<CreateCollectionFormValues>, 'control'>[] =
    [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Введите название коллекции',
        rules: {
          required: 'Название коллекции обязательно',
        },
      },
      {
        name: 'description',
        type: 'text',
        placeholder: 'Введите описание коллекции (необязательно)',
        rules: {
          required: '',
        },
      },
      {
        name: 'visibility',
        type: 'select',
        placeholder: 'Выберите видимость коллекции',
        options: [
          { label: 'Публичная', value: 'public' },
          { label: 'Приватная', value: 'private' },
        ],
        rules: {
          required: 'Выберите видимость коллекции',
        },
      },
    ];

  const buttons: ButtonProps[] = [
    {
      name: 'Создать коллекцию',
      type: 'submit',
      variant: 'primary',
    },
  ];

  return (
    <div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
        {poster && <p>Выбран файл: {poster.name}</p>}
      </div>
      <Form fields={fields} onSubmit={onSubmit} buttons={buttons} />

      {loading && <Loader />}
      {success && <p style={{ color: 'green' }}>Коллекция успешно создана!</p>}
      {error && <p className="error">Ошибка: {error}</p>}
    </div>
  );
};
