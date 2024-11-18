import { BookProps } from '@/entities/book/model/types';
import { GameProps } from '@/entities/game/model/types';
import { MovieProps } from '@/entities/movie/model/types';
import { User } from '@/entities/user/model/types';

export type Collection = {
  id: string;
  name: string;
  description?: string;
  posterPath?: string;
  user: User;

  books: Pick<BookProps, 'posterPath' | 'title'>[];
  movies: Pick<GameProps, 'posterPath' | 'title'>[];
  games: Pick<MovieProps, 'posterPath' | 'title'>[];
};
