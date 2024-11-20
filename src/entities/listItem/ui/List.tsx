'use client';
import { useEffect, useState } from 'react';
import { ListItem, ListItemProps } from '@/entities/listItem/ui/ListItem';
import styles from './ListItem.module.css';
import { fetchListItems } from '@/entities/listItem/model/api';
import {
  typeSpecificTranslations,
  contentTypeTranslations,
} from '@/entities/listItem/model/types';

type Props = {
  contentType: 'movies' | 'books' | 'games';
  username: string;
  status: string;
};

export const List = (props: Props) => {
  const [items, setItems] = useState<ListItemProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchListItems(
        props.username,
        props.contentType,
        props.status,
      );
      if ('error' in result) {
        setError(result.error);
      } else {
        setItems(result);
      }
    };

    loadData();
  }, [props.contentType, props.status, props.username]);

  const translatedStatus =
    props.contentType in typeSpecificTranslations
      ? typeSpecificTranslations[props.contentType][props.status]
      : props.status;

  const translatedContentType =
    props.contentType in contentTypeTranslations
      ? contentTypeTranslations[props.contentType]
      : props.contentType;

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.header}>
        {translatedContentType}: {translatedStatus}
      </h2>
      <div className={styles.list}>
        {items.map((item) => (
          <ListItem key={item.contentId} {...item} />
        ))}
      </div>
    </div>
  );
};
