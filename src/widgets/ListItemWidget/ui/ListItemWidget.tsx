'use client';

import { useState, useEffect } from 'react';
import styles from './ListItemWidget.module.css';
import { AddListItem } from '@/features/AddListItem/ui/AddListItem';
import { AddRating } from '@/features/AddRating/AddRating';
import { useStores } from '@/app/store/useStore';
import {
  getListItem,
  ListItemResponse,
} from '@/widgets/ListItemWidget/model/api';
import * as Sentry from '@sentry/nextjs';

type ListItemWidgetProps = {
  contentType: 'movie' | 'book' | 'game';
  contentId: number;
};

export const ListItemWidget = ({
  contentType,
  contentId,
}: ListItemWidgetProps) => {
  const { authStore } = useStores();
  const token = authStore.getToken();
  const [listItemData, setListItemData] = useState<ListItemResponse | null>(
    null,
  );
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        setIsLoading(true);
        const data = await getListItem(contentType, contentId);
        setListItemData(data);
      } catch (error) {
        Sentry.captureException(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isClient && token) {
      fetchData();
    }
  }, [contentType, contentId, token, isClient]);

  if (!token || isLoading) {
    return null;
  }

  return (
    <div className={styles.widget}>
      <AddListItem
        contentType={contentType}
        contentId={contentId}
        currentStatus={listItemData?.listItem?.status}
      />
      <AddRating
        contentType={contentType}
        contentId={contentId}
        initialRating={listItemData?.rating?.rating || null}
      />
    </div>
  );
};
