import { AgeRatingType } from '@/entities/ageRating/model/types';
import { Genre } from '@/entities/genre/model/types';
import { Person } from '@/entities/person/model/types';
import { Studio } from '@/entities/studio/model/types';
import { Theme } from '@/entities/theme/model/types';

type MovieType = 'live_action' | 'anime' | 'animation';

export type MovieStatus =
  | 'announced'
  | 'in_production'
  | 'post_production'
  | 'released'
  | 'ongoing'
  | 'completed'
  | 'cancelled'
  | 'unknown';

export type Movie = {
  id: number;
  createdAt: string;
  updatedAt: string;
  visitCount: number;
  title: string;
  description?: string;
  MovieType: MovieType;
  posterPath: string | null;
  release?: string;
  status: MovieStatus;
  duration: number;
  isSeries: boolean;
  seriesCount: number;
  ageRating: AgeRatingType;
  rating: number | null;
  links: string | null;
  translations: string | null;
  genres?: Genre[];
  themes?: Theme[];
  directors?: Person[];
  studios?: Studio[];
};
