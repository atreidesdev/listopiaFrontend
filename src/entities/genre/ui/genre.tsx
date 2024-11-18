import { GenreProps } from '@/entities/genre/model/types';
import styles from './genre.module.css';

type GenreComponentProps = GenreProps & { isLast?: boolean };

export const Genre = (props: GenreComponentProps) => {
  return (
    <span className={styles.genre}>
      {props.name}
      {!props.isLast && ', '}
    </span>
  );
};
