import { GenreType } from '@/entities/genre/model/types';

export type ThemeProps = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  visitCount?: number;
  name: string;
  description?: string;
  genreTypes?: GenreType[];
};
