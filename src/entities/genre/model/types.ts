export type GenreType = 'book' | 'movie' | 'game';

export type GenreProps = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  visitCount?: number;
  name: string;
  description?: string;
  genreTypes?: GenreType[];
};
