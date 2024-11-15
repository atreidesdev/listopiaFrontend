import { apiGet } from '@/shared/api/fetch';
import { Metadata } from 'next';

export const revalidate = 60;
export const dynamicParams = true;

interface Collection {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  visitCount: number;
  posterPath: string;
  name: string;
  description: string;
  userId: number;
  visibility: string;
}

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = params;
  try {
    const collection = await apiGet<Collection>(`collection/${id}`);
    if (collection) {
      return {
        title: `${collection.name} - Коллекция`,
        description: `Страница коллекции "${collection.name}". ${collection.description}`,
      };
    }
  } catch (error) {
    console.error('Ошибка загрузки метаданных для коллекции:', error);
  }

  return {
    title: 'Коллекция не найдена',
    description: 'Не удалось загрузить данные для коллекции.',
  };
}

export default async function CollectionByIdPage({ params }: PageProps) {
  const { id } = params;
  let collectionData: Collection | null = null;

  try {
    collectionData = await apiGet<Collection>(`collection/${id}`);
  } catch (error) {
    console.error('Ошибка загрузки данных коллекции:', error);
  }

  return (
    <div>
      <h1>Коллекция: {collectionData?.name || 'Не найдена'}</h1>
      {collectionData ? (
        <pre>{JSON.stringify(collectionData, null, 2)}</pre>
      ) : (
        <p>Ошибка загрузки данных коллекции...</p>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const collections = await apiGet<Collection[]>('collection');
    return collections.map((collection) => ({
      id: collection.id.toString(),
    }));
  } catch (error) {
    console.error('Ошибка при получении путей для коллекций:', error);
    return [];
  }
}
