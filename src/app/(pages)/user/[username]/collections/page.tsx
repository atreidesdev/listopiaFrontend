import { Collection } from '@/entities/collection/model/types';
import { apiGet } from '@/shared/api/fetch';
import { Metadata } from 'next';
import * as Sentry from '@sentry/nextjs';

export const revalidate = 60;
export const dynamicParams = true;

type PageProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = params;
  try {
    const data = await apiGet<Collection[]>(`collection/${username}`);
    if (data) {
      return {
        title: username + 'Collections',
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

export default async function CollectionByUsernamePage({ params }: PageProps) {
  const { username } = params;
  let data: Collection[] | null;

  try {
    data = await apiGet<Collection[]>(`collection/${username}`);
  } catch (error) {
    data = null;
    Sentry.captureException(error);
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
