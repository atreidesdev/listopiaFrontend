import { Genre } from '@/entities/genre/ui/genre';
import { GenreProps } from '@/entities/genre/model/types';

type GenreListProps = {
  genres: GenreProps[];
};

export const GenreList = (props: GenreListProps) => {
  return (
    <h2>
      {props.genres.map((genre, index) => (
        <Genre
          key={genre.id}
          id={genre.id}
          name={genre.name}
          isLast={index === props.genres.length - 1}
        />
      ))}
    </h2>
  );
};
