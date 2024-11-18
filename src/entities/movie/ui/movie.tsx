import { MovieProps } from '@/entities/movie/model/types';
import Image from 'next/image';
import { GenreList } from '@/entities/genre/ui/genresList';
import { ThemeList } from '@/entities/theme/ui/themeList';
import { POSTER_PLACEHOLDER } from '@/shared/constants';
import styles from './movie.module.css';
import { formatDate } from '@/shared/utils/formatDate';
import { ReactNode } from 'react';
import { formatAgeRating } from '@/entities/ageRating/utils/formatAgeRating';

type MovieComponentProps = MovieProps & {
  children?: ReactNode;
};

export const Movie = (props: MovieComponentProps) => {
  const movieTypeTranslation = {
    live_action: props.isSeries ? 'Сериал' : 'Фильм',
    anime: 'Аниме',
    animation: 'Мультфильм',
  };

  const movieStatusTranslation = {
    announced: 'Анонсирован',
    in_production: 'В производстве',
    post_production: 'Пост-продакшн',
    released: 'Выпущен',
    ongoing: 'Идет показ',
    completed: 'Завершен',
    cancelled: 'Отменен',
    unknown: 'Неизвестно',
  };

  return (
    <div>
      <div className={styles.movie}>
        <div className={styles.actions}>
          <div>
            <Image
              src={props.posterPath || POSTER_PLACEHOLDER}
              alt={props.title}
              width={300}
              height={450}
            />
            {props.children}
          </div>
        </div>
        <div className={styles.info}>
          <h1>{props.title}</h1>
          <div className={styles.infoRow}>
            <h2>Статус:</h2>
            <h2>{movieStatusTranslation[props.status]}</h2>
          </div>
          <div className={styles.infoRow}>
            <h2>Дата выхода:</h2>
            <h2>{props.release && formatDate(props.release)}</h2>
          </div>
          <div className={styles.infoRow}>
            <h2>Тип:</h2>
            <h2>{movieTypeTranslation[props.MovieType]}</h2>
          </div>
          {props.isSeries && (
            <div className={styles.infoRow}>
              <h2>Количество серий:</h2>
              <h2>{props.seriesCount}</h2>
            </div>
          )}
          <div className={styles.infoRow}>
            <h2>Время:</h2>
            <h2>{props.duration && props.duration + ' минут'}</h2>
          </div>
          <div className={styles.infoRow}>
            <h2>Рейтинг:</h2>
            <h2>{props.rating || null}</h2>
          </div>
          <div className={styles.infoRow}>
            <h2>Жанры:</h2>
            <GenreList genres={props.genres} />
          </div>
          <div className={styles.infoRow}>
            <h2>Темы:</h2>
            <ThemeList themes={props.themes} />
          </div>
          <div className={styles.infoRow}>
            <h2>Режиссер:</h2>
            <h2>
              {props.directors?.map((director) => director.name).join(', ')}
            </h2>
          </div>
          <div className={styles.infoRow}>
            <h2>Студия:</h2>
            <h2>{props.studios?.map((studio) => studio.name).join(', ')}</h2>
          </div>
          <div className={styles.infoRow}>
            <h2>Возрастной рейтинг:</h2>
            <h2>{formatAgeRating(props.ageRating)}</h2>
          </div>
          <h2>Описание:</h2>
          <h2>{props.description || null}</h2>
        </div>
      </div>
    </div>
  );
};
