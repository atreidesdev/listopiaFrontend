import { Book } from '@/entities/book/model/types';
import { Game } from '@/entities/game/model/types';
import { Movie } from '@/entities/movie/model/types';
import { User } from '@/entities/user/model/types';

export type Collection = {
  id: string;
  name: string;
  description?: string;
  posterPath?: string;
  user: User;

  books: Pick<Book, 'posterPath' | 'title'>[];
  movies: Pick<Movie, 'posterPath' | 'title'>[];
  games: Pick<Game, 'posterPath' | 'title'>[];
};
