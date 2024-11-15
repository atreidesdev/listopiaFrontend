import { Book } from '@/entities/book/model/types';
import { Game } from '@/entities/game/model/types';
import { Movie } from '@/entities/movie/model/types';
import { apiGet } from '@/shared/api/fetch';
import { Metadata } from 'next';

export const revalidate = 60;
export const dynamicParams = true;

interface PageProps {
  params: { type: string; id: number };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type, id } = params;
  try {
    let data: Movie | Book | Game | null = null;

    if (type === 'movie') {
      data = await apiGet<Movie>(`movie/${id}`);
    } else if (type === 'book') {
      data = await apiGet<Book>(`book/${id}`);
    } else if (type === 'game') {
      data = await apiGet<Game>(`game/${id}`);
    }

    if (data) {
      return {
        title: data.title,
        description: data.description,
      };
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }

  return {
    title: 'Ошибка загрузки данных',
    description: 'Не удалось загрузить данные для этой страницы.',
  };
}

export default async function ContentByTypeByIdPage({ params }: PageProps) {
  const { type, id } = params;
  let data: Movie | Book | Game | null = null;

  try {
    if (type === 'movie') {
      data = await apiGet<Movie>(`movie/${id}`);
    } else if (type === 'book') {
      data = await apiGet<Book>(`book/${id}`);
    } else if (type === 'game') {
      data = await apiGet<Game>(`game/${id}`);
    }
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    data = null;
  }

  return (
    <div>
      <h1>Type: {type}</h1>
      <h2>ID: {id}</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Ошибка загрузки данных</p>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const [movieData, bookData, gameData] = await Promise.all([
      apiGet<Movie[]>('movie'),
      apiGet<Book[]>('book'),
      apiGet<Game[]>('game'),
    ]);

    const moviePaths = movieData.map((movie) => ({
      type: 'movie',
      id: movie.id.toString(),
    }));
    const bookPaths = bookData.map((book) => ({
      type: 'book',
      id: book.id.toString(),
    }));
    const gamePaths = gameData.map((game) => ({
      type: 'game',
      id: game.id.toString(),
    }));

    return [...moviePaths, ...bookPaths, ...gamePaths];
  } catch (error) {
    console.error('Error fetching paths:', error);
    return [];
  }
}
