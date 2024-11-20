'use client';

import { useState, useCallback } from 'react';
import styles from './AddRating.module.css';
import { updateRating } from '@/entities/listItem/model/api';
import * as Sentry from '@sentry/nextjs';

type AddRatingProps = {
  contentType: 'movie' | 'book' | 'game';
  contentId: number;
  initialRating?: number | null;
};

export const AddRating = ({
  contentType,
  contentId,
  initialRating,
}: AddRatingProps) => {
  const [rating, setRating] = useState<number | null>(initialRating ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const handleRatingChange = useCallback(
    async (newRating: number | null) => {
      setIsLoading(true);
      try {
        await updateRating(contentType, contentId, { rating: newRating ?? 0 });
        setRating(newRating ?? 0);
      } catch (error) {
        Sentry.captureException(error);
      } finally {
        setIsLoading(false);
      }
    },
    [contentType, contentId],
  );

  const handleBlur = () => {
    handleRatingChange(rating ?? 0);
  };

  const handleInputChange = (value: string) => {
    const parsedValue = parseInt(value, 10);

    setRating(
      isNaN(parsedValue) || parsedValue < 1 || parsedValue > 100
        ? null
        : parsedValue,
    );
  };

  return (
    <div className={styles.ratingContainer}>
      <input
        id="rating-input"
        type="number"
        min="1"
        max="100"
        value={rating ?? ''}
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={handleBlur}
        disabled={isLoading}
        className={styles.input}
        placeholder="1-100"
      />
    </div>
  );
};
