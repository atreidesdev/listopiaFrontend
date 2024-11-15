import { AgeRatingType } from '@/entities/ageRating/model/types';
import { Genre } from '@/entities/genre/model/types';
import { Person } from '@/entities/person/model/types';
import { Theme } from '@/entities/theme/model/types';

export type BookStatus =
  | 'announced'
  | 'writing'
  | 'editing'
  | 'airing'
  | 'published'
  | 'cancelled'
  | 'unknown';

export type Book = {
  id: number;
  createdAt: string;
  updatedAt: string;
  visitCount: number;
  title: string;
  description: string;
  posterPath: string | null;
  release: string;
  status: BookStatus;
  readingHoursCount: number;
  ageRating: AgeRatingType;
  rating: number | null;
  links: string | null;
  translations: string | null;
  genres: Genre[];
  themes: Theme[];
  authors: Person[];
};
