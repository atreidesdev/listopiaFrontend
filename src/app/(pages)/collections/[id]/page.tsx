'use client';
import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { CardProps } from '@/shared/ui/card/ui/card';
import { CardList } from '@/shared/ui/card/ui/cardList';
import { apiGet } from '@/shared/api/fetch';

type Collection = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  visitCount: number;
  posterPath: string;
  name: string;
  description: string;
  userId: number;
  visibility: string;
  books: { title: string; posterPath: string | null }[];
  movies: { title: string; posterPath: string | null }[];
  games: { title: string; posterPath: string | null }[];
};

type PageProps = {
  params: { id: string };
};

export default function CollectionByIdPage({ params }: PageProps) {
  const { id } = params;
  const [collectionData, setCollectionData] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const data = await apiGet<Collection>(`collection/${id}`);
        setCollectionData(data);
      } catch (err) {
        Sentry.captureException(err);
        setError('Либо коллекции нет, либо она приватная(');
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [id]);

  const books: CardProps[] =
    collectionData?.books.map((book) => ({
      type: 'books',
      id: collectionData?.id,
      posterPath: book.posterPath,
      title: book.title,
    })) || [];

  const movies: CardProps[] =
    collectionData?.movies.map((movie) => ({
      type: 'movies',
      id: collectionData?.id,
      posterPath: movie.posterPath,
      title: movie.title,
    })) || [];

  const games: CardProps[] =
    collectionData?.games.map((game) => ({
      type: 'games',
      id: collectionData?.id,
      posterPath: game.posterPath,
      title: game.title,
    })) || [];

  return (
    <div>
      <h1>Коллекция: {collectionData?.name}</h1>
      <div>
        {loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {books.length > 0 && (
              <div>
                <h2>Книги</h2>
                <CardList cards={books} />
              </div>
            )}
            {movies.length > 0 && (
              <div>
                <h2>Фильмы</h2>
                <CardList cards={movies} />
              </div>
            )}
            {games.length > 0 && (
              <div>
                <h2>Игры</h2>
                <CardList cards={games} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
