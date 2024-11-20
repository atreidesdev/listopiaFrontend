'use client';
import React, { useState } from 'react';
import { updateAvatar } from '@/widgets/UpdateAvatarForm/model/api';
import * as Sentry from '@sentry/nextjs';
import styles from './UpdateAvatarForm.module.css';
import { Button } from '@/shared/ui/button/button';

const UpdateAvatarForm = ({ userId }: { userId: string | number }) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!avatar) {
      setError('Добавьте файл');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await updateAvatar(userId, avatar);

      if (error) {
        setError(error);
      } else {
        setSuccess(true);
        setError(null);
      }
    } catch (error) {
      setError('Ошибка обновления аватара');
      Sentry.captureException(error, { level: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            type="file"
            id="avatarInput"
            onChange={handleFileChange}
            accept="image/*"
            disabled={isLoading}
            className={styles.inputFile}
          />
          <label htmlFor="avatarInput" className={styles.inputFileButton}>
            <span>{avatar ? avatar.name : 'Выберите аватар'}</span>
          </label>
        </div>
        <Button
          type="submit"
          disabled={isLoading || !avatar}
          name={'обновить'}
        />
      </form>
      {success && <p style={{ color: 'green' }}>Аватар успешно обновлен</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateAvatarForm;
