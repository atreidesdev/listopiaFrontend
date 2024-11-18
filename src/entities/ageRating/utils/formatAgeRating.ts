import { AgeRatingType } from '@/entities/ageRating/model/types';

export const formatAgeRating = (ageRating: AgeRatingType): string => {
  const ageRatingMapping: Record<AgeRatingType, string> = {
    g: 'Для всех',
    pg: '10+',
    'pg-13': '13+',
    r: '17+ (с родителями)',
    'nc-17': '17+',
    unknown: ' ',
  };

  return ageRatingMapping[ageRating] || ' ';
};
