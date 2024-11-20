'use client';
import { useEffect, useState } from 'react';
import { CardList } from '@/shared/ui/card/ui/cardList';
import { CardProps } from '@/shared/ui/card/ui/card';
import { Pagination } from '@/widgets/Pagination/ui/Pagination';
import {
  CollectionResponse,
  fetchCollections,
} from '@/entities/collection/model/api';
import * as Sentry from '@sentry/nextjs';
import styles from './page.module.css';
import { UPLOADS_URL } from '@/shared/constants';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;

export default function CollectionsPage() {
  const [collections, setCollections] = useState<CardProps[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = collections.slice(startIndex, endIndex);

  const hasNextPage = collections.length > page * pageSize;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: CollectionResponse[] = await fetchCollections();
        const mappedCollections: CardProps[] = data.map((collection) => ({
          id: collection.id,
          type: 'collections',
          posterPath: collection.posterPath
            ? UPLOADS_URL + collection.posterPath
            : '',
          title: collection.name,
          release: collection.createdAt,
          rating: null,
        }));
        setCollections(mappedCollections);
      } catch (error) {
        Sentry.captureException(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.page}>
        {currentItems.length > 0 ? (
          <CardList cards={currentItems} />
        ) : (
          <p>Нет данных для отображения</p>
        )}
        <Pagination
          currentPage={page}
          hasNextPage={hasNextPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
