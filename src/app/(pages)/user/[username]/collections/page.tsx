import { Collection } from '@/entities/collection/model/types';
import { apiGet } from '@/shared/api/fetch';
import { Metadata } from 'next';

export const revalidate = 60;
export const dynamicParams = true;

interface PageProps {
  params: { username: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = params;
  try {
    let data: Collection[] | null;

    data = await apiGet<Collection[]>(`collection/${username}`);

    if (data) {
      return {
        title: username + 'Collections',
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

export default async function CollectionByUsernamePage({ params }: PageProps) {
  const { username } = params;
  let data: Collection[] | null = null;

  try {
    data = await apiGet<Collection[]>(`collection/${username}`);

    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    data = null;
  }

  return (
    <div>
      <h1>Username: {username} collections</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Ошибка загрузки данных</p>
      )}
    </div>
  );
}
