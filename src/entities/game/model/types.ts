import { AgeRatingType } from '@/entities/ageRating/model/types';
import { Developer } from '@/entities/developer/model/types';
import { Genre } from '@/entities/genre/model/types';
import { Platform } from '@/entities/platform/model/types';
import { Publisher } from '@/entities/publisher/model/types';
import { Theme } from '@/entities/theme/model/types';

type GameStatus =
  | 'announced'
  | 'in_develope'
  | 'early_access'
  | 'released'
  | 'cancelled'
  | 'unknown';

export type Game = {
  id: number;
  createdAt: string;
  updatedAt: string;
  visitCount: number;
  title: string;
  description?: string;
  posterPath: string | null;
  release?: string;
  status: GameStatus;
  ageRating: AgeRatingType;
  rating: number | null;
  links: string | null;
  translations: string | null;
  genres?: Genre[];
  themes?: Theme[];
  developers?: Developer[];
  platforms?: Platform[];
  publishers?: Publisher[];
};
