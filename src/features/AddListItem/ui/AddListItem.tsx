'use client';

import { useState, useEffect } from 'react';
import styles from './AddListItem.module.css';
import {
  StatusCount,
  statusOptions,
  typeSpecificTranslations,
} from '@/entities/listItem/model/types';
import {
  addOrUpdateListItem,
  deleteListItem,
} from '@/entities/listItem/model/api';
import * as Sentry from '@sentry/nextjs';

type Props = {
  contentType?: 'movie' | 'book' | 'game';
  contentId: string | number;
  currentStatus?: keyof StatusCount | null | undefined;
};

export const AddListItem = (props: Props) => {
  const { currentStatus, contentType, contentId } = props;

  const [selectedStatus, setSelectedStatus] = useState<
    keyof StatusCount | '' | 'remove'
  >(currentStatus ?? '');

  useEffect(() => {
    if (currentStatus !== undefined) {
      setSelectedStatus(currentStatus || '');
    }
  }, [currentStatus]);

  const typeWithS = contentType ? contentType + 's' : '';
  const translations = typeSpecificTranslations[typeWithS];

  const handleStatusChange = async (status: keyof StatusCount | 'remove') => {
    const type = contentType || '';

    if (status === 'remove') {
      setSelectedStatus('');
      try {
        await deleteListItem(type, contentId);
      } catch (error) {
        Sentry.captureException(error);
      }
    } else {
      setSelectedStatus(status);
      try {
        await addOrUpdateListItem(type, contentId, status);
      } catch (error) {
        Sentry.captureException(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <select
          id="status-select"
          className={styles.select}
          value={selectedStatus}
          onChange={(e) =>
            handleStatusChange(e.target.value as keyof StatusCount | 'remove')
          }
        >
          <option value="" disabled hidden>
            Выберите статус
          </option>

          {Object.entries(statusOptions).map(([key, label]) => (
            <option key={key} value={key}>
              {translations[key] || label}
            </option>
          ))}

          {selectedStatus && <option value="remove">Удалить статус</option>}
        </select>
      </div>
    </div>
  );
};
