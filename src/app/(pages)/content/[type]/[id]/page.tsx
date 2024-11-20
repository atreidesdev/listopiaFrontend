import { Book } from '@/entities/book/ui/book';
import { Game } from '@/entities/game/ui/game';
import { BookProps } from '@/entities/book/model/types';
import { GameProps } from '@/entities/game/model/types';
import { MovieProps } from '@/entities/movie/model/types';
import { apiGet } from '@/shared/api/fetch';
import { Metadata } from 'next';
import { Movie } from '@/entities/movie/ui/movie';
import * as Sentry from '@sentry/nextjs';
import { ListItemWidget } from '@/widgets/ListItemWidget/ui/ListItemWidget';

export const revalidate = 60;
export const dynamicParams = true;

type PageProps = {
  params: { type: string; id: number };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type, id } = params;

  try {
    let data: MovieProps | BookProps | GameProps | null = null;

    if (type === 'movies') {
      data = await apiGet<MovieProps>(`movie/${id}`);
    } else if (type === 'books') {
      data = await apiGet<BookProps>(`book/${id}`);
    } else if (type === 'games') {
      data = await apiGet<GameProps>(`game/${id}`);
    }

    if (data) {
      return {
        title: data.title,
        description: data.description,
      };
    }
  } catch (error) {
    Sentry.captureException(error);
  }

  return {
    title: 'Ошибка загрузки данных',
    description: 'Не удалось загрузить данные для этой страницы.',
  };
}

export default async function ContentByTypeByIdPage({ params }: PageProps) {
  const { type, id } = params;
  let data: MovieProps | BookProps | GameProps | null = null;

  try {
    if (type === 'movies') {
      data = await apiGet<MovieProps>(`movie/${id}`);
    } else if (type === 'books') {
      data = await apiGet<BookProps>(`book/${id}`);
    } else if (type === 'games') {
      data = await apiGet<GameProps>(`game/${id}`);
    }
  } catch (error) {
    Sentry.captureException(error);
    data = null;
  }

  return (
    <div>
      {data ? (
        <>
          {type === 'movies' && (
            <Movie {...(data as MovieProps)}>
              <ListItemWidget contentType={'movie'} contentId={data.id} />
            </Movie>
          )}
          {type === 'books' && (
            <Book {...(data as BookProps)}>
              <ListItemWidget contentType={'book'} contentId={data.id} />
            </Book>
          )}
          {type === 'games' && (
            <Game {...(data as GameProps)}>
              <ListItemWidget contentType={'game'} contentId={data.id} />
            </Game>
          )}
        </>
      ) : (
        <p>Ошибка загрузки данных</p>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const [movieData, bookData, gameData] = await Promise.all([
      apiGet<MovieProps[]>('movie'),
      apiGet<BookProps[]>('book'),
      apiGet<GameProps[]>('game'),
    ]);

    const moviePaths = movieData.map((movie) => ({
      type: 'movies',
      id: movie.id.toString(),
    }));
    const bookPaths = bookData.map((book) => ({
      type: 'books',
      id: book.id.toString(),
    }));
    const gamePaths = gameData.map((game) => ({
      type: 'games',
      id: game.id.toString(),
    }));

    return [...moviePaths, ...bookPaths, ...gamePaths];
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
}
