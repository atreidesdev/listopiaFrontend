import { apiGet } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';
import { StatusCount } from '@/entities/listItem/model/types';

export type ListItemResponse = {
  listItem: {
    status: keyof StatusCount;
  };
  rating?: {
    rating: number;
  };
};

export const getListItem = async (
  type: 'movie' | 'game' | 'book',
  contentId: string | number,
): Promise<ListItemResponse | null> => {
  try {
    return await apiGet(`list/${type}/${contentId}/details`);
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};
