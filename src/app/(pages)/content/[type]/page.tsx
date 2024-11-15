import { Book } from '@/entities/book/model/types';
import { Game } from '@/entities/game/model/types';
import { Movie } from '@/entities/movie/model/types';
import { apiGet } from '@/shared/api/fetch';
import { Metadata } from 'next';

export const revalidate = 60;
export const dynamicParams = true;

interface PageProps {
  params: { type: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = params;
  try {
    let data: Movie[] | Book[] | Game[] | null = null;

    if (type === 'movie') {
      data = await apiGet<Movie[]>(`movie`);
    } else if (type === 'book') {
      data = await apiGet<Book[]>(`book`);
    } else if (type === 'game') {
      data = await apiGet<Game[]>(`game`);
    }

    if (data) {
      return {
        title: type,
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

export default async function ContentByTypePage({ params }: PageProps) {
  const { type } = params;
  let data: Movie[] | Book[] | Game[] | null = null;

  try {
    if (type === 'movie') {
      data = await apiGet<Movie[]>(`movie`);
    } else if (type === 'book') {
      data = await apiGet<Book[]>(`book`);
    } else if (type === 'game') {
      data = await apiGet<Game[]>(`game`);
    }
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    data = null;
  }

  return (
    <div>
      <h1>Type: {type}</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Ошибка загрузки данных</p>
      )}
    </div>
  );
}
