import { apiGet, apiPost } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';

export type CollectionResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  visitCount: number;
  posterPath: string | null;
  name: string;
  description: string | null;
  userId: number;
  visibility: string;
};

export const fetchCollections = async (): Promise<CollectionResponse[]> => {
  try {
    return await apiGet<CollectionResponse[]>('collection');
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
};

export const fetchUserCollections = async (
  username: string,
): Promise<CollectionResponse[]> => {
  try {
    return await apiGet<CollectionResponse[]>(`collection/1/${username}/`);
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
};

export const addToCollection = async (
  collectionId: number,
  genreType: 'movie' | 'book' | 'game',
  contentId: number,
): Promise<void> => {
  try {
    await apiPost(`collection/${collectionId}/${genreType}/${contentId}`, {});
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};
