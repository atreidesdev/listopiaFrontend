export type GenreType = 'book' | 'movie' | 'game';

export type Genre = {
  id: number;
  createdAt: string;
  updatedAt: string;
  visitCount: number;
  name: string;
  description: string;
  genreTypes: GenreType[];
};
