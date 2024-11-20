'use client';
import { useEffect, useState } from 'react';
import { CardList } from '@/shared/ui/card/ui/cardList';
import { CardProps } from '@/shared/ui/card/ui/card';
import { Pagination } from '@/widgets/Pagination/ui/Pagination';
import {
  CollectionResponse,
  fetchUserCollections,
} from '@/entities/collection/model/api';
import * as Sentry from '@sentry/nextjs';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;

export default function UserCollectionsPage() {
  const { username }: { username: string } = useParams();

  const [collections, setCollections] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
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
        if (!username) return;
        const data: CollectionResponse[] = await fetchUserCollections(username);
        const mappedCollections: CardProps[] = data.map((collection) => ({
          id: collection.id,
          type: 'collections',
          posterPath: collection.posterPath,
          title: collection.name,
          release: collection.createdAt,
          rating: null,
        }));
        setCollections(mappedCollections);
      } catch (error) {
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

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
