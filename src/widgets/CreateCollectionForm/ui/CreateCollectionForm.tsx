import { ButtonProps } from '@/shared/ui/button/button';
import { Form } from '@/shared/ui/form/form';
import { InputFieldProps } from '@/shared/ui/inputField/inputField';
import * as Sentry from '@sentry/nextjs';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { createCollection } from '../model/api';
import styles from './CreateCollectionForm.module.css';

type CreateCollectionFormValues = {
  name: string;
  description?: string;
  poster: File | null;
  visibility: 'public' | 'private';
};

export const CreateCollectionForm = () => {
  const [loading, setLoading] = useState(false);
  const [poster, setPoster] = useState<File | null>(null);

  const onSubmit: SubmitHandler<CreateCollectionFormValues> = async (data) => {
    setLoading(true);

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

      alert('Коллекция успешно создана');
    } catch (error) {
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
        placeholder: 'Видимость коллекции ',
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
    <div className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="file"
          id="input__file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          className={styles.inputFile}
        />
        <label htmlFor="input__file" className={styles.inputFileButton}>
          <span className={styles.inputFileButtonText}>
            {poster ? poster.name : 'Выберите постер'}
          </span>
        </label>
      </div>
      <Form fields={fields} onSubmit={onSubmit} buttons={buttons} />
    </div>
  );
};
