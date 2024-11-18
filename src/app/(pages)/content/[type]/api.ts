import { apiGet } from '@/shared/api/fetch';
import { CardProps } from '@/shared/ui/card/ui/card';
import { ThemeProps } from '@/entities/theme/model/types';
import { GenreProps } from '@/entities/genre/model/types';
import * as Sentry from '@sentry/nextjs';

const fetchDataByType = async (
  type: string,
  page: number,
  pageSize: number,
  genreIds: number[],
  themeIds: number[],
): Promise<CardProps[] | null> => {
  const queryParams: string[] = [];

  queryParams.push(`page=${page}`);
  queryParams.push(`pageSize=${pageSize}`);

  if (genreIds.length > 0) {
    queryParams.push(`genreIds=${genreIds.join(',')}`);
  }

  if (themeIds.length > 0) {
    queryParams.push(`themeIds=${themeIds.join(',')}`);
  }

  const query = `?${queryParams.join('&')}`;

  let result: CardProps[] | null = null;

  if (type === 'movies') {
    result = await apiGet<CardProps[]>(`movie${query}`);
  } else if (type === 'books') {
    result = await apiGet<CardProps[]>(`book${query}`);
  } else if (type === 'games') {
    result = await apiGet<CardProps[]>(`game${query}`);
  }

  if (result) {
    return result.map((item) => ({ ...item, type }));
  }

  return null;
};

const fetchHasNextPage = async (
  type: string,
  page: number,
  pageSize: number,
  genreIds: number[],
  themeIds: number[],
): Promise<boolean> => {
  const nextPageQuery = new URLSearchParams({
    page: `${page + 1}`,
    pageSize: `${pageSize}`,
    genreIds: genreIds.join(','),
    themeIds: themeIds.join(','),
  }).toString();

  const query = `?${nextPageQuery}`;

  let nextPageResult: CardProps[] | null = null;

  if (type === 'movies') {
    nextPageResult = await apiGet<CardProps[]>(`movie${query}`);
  } else if (type === 'books') {
    nextPageResult = await apiGet<CardProps[]>(`book${query}`);
  } else if (type === 'games') {
    nextPageResult = await apiGet<CardProps[]>(`game${query}`);
  }

  return !!(nextPageResult && nextPageResult.length > 0);
};

const fetchGenres = async (type: string): Promise<GenreProps[]> => {
  try {
    const modifiedType = type.slice(0, -1);
    return await apiGet<GenreProps[]>(`genre/${modifiedType}`);
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
};

const fetchThemes = async (type: string): Promise<ThemeProps[]> => {
  try {
    const modifiedType = type.slice(0, -1);
    return await apiGet<ThemeProps[]>(`theme/${modifiedType}`);
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
};

export { fetchDataByType, fetchHasNextPage, fetchGenres, fetchThemes };
