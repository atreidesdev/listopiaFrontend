import { apiPost, apiDelete, apiPut, apiGet } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';
import { StatusCount } from '@/entities/listItem/model/types';
import { ListItemProps } from '@/entities/listItem/ui/ListItem';

export const addOrUpdateListItem = async (
  type: string,
  contentId: string | number,
  status: keyof StatusCount,
) => {
  try {
    await apiPost(`list/${type}/${contentId}`, { status });
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const deleteListItem = async (
  type: string,
  contentId: string | number,
) => {
  try {
    await apiDelete(`list/${type}/${contentId}`);
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const updateRating = async (
  type: string,
  contentId: string | number,
  payload: { rating: number | null },
) => {
  try {
    await apiPut(`list/movie/1/rating`, payload);
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const fetchListItems = async (
  username: string,
  contentType: 'movies' | 'books' | 'games',
  status: string,
): Promise<ListItemProps[] | { error: string }> => {
  try {
    const response: ListItemProps[] = await apiGet(
      `list/${username}/${contentType.slice(0, -1)}/${status}`,
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.map((item: any) => {
      const contentId =
        contentType === 'movies'
          ? item.movieId
          : contentType === 'books'
            ? item.bookId
            : item.gameId;

      const title =
        contentType === 'movies'
          ? item.movie?.title
          : contentType === 'books'
            ? item.book?.title
            : item.game?.title;

      return {
        contentType,
        contentId: contentId?.toString() || 'unknown',
        title: title || 'Без названия',
        rating: item.rating?.rating || null,
      };
    });
  } catch (error) {
    Sentry.captureException(error);
    return { error: 'Ошибка при загрузке списка' };
  }
};
