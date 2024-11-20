'use client';

import React, { useState, useEffect } from 'react';
import { authStore } from '@/shared/auth/authStore';
import styles from './AddToCollection.module.css';
import {
  addToCollection,
  fetchUserCollections,
} from '@/entities/collection/model/api';
import * as Sentry from '@sentry/nextjs';

type Collection = {
  id: number;
  name: string;
  description: string | null;
};

type Props = {
  genreType: 'movie' | 'book' | 'game';
  contentId: number;
};

export const AddToCollection = ({ genreType, contentId }: Props) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const username = authStore.username;
        if (!username) return;

        const userCollections = await fetchUserCollections(username);
        setCollections(userCollections);
      } catch (error) {
        Sentry.captureException(error);
        alert('Ошибка загрузки коллекций');
      }
    };

    loadCollections();
  }, []);

  const handleAddToCollection = async (collectionId: number) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await addToCollection(collectionId, genreType, contentId);
      alert('Элемент успешно добавлен в коллекцию');
    } catch (error) {
      Sentry.captureException(error);
      alert('Элемент уже добавлен');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCollectionId = Number(e.target.value);
    if (selectedCollectionId) {
      handleAddToCollection(selectedCollectionId);
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="collection-select">Добавить в коллекцию</label>
      <select
        id="collection-select"
        onChange={handleChange}
        disabled={isLoading}
        className={styles.select}
      >
        <option value="" disabled>
          Выберите коллекцию
        </option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>
      {isLoading && <p className={styles.loading}>Добавление...</p>}
    </div>
  );
};
