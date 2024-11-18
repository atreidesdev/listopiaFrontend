import { GameProps } from '@/entities/game/model/types';
import Image from 'next/image';
import { GenreList } from '@/entities/genre/ui/genresList';
import { ThemeList } from '@/entities/theme/ui/themeList';
import { POSTER_PLACEHOLDER } from '@/shared/constants';
import styles from './game.module.css';
import { formatDate } from '@/shared/utils/formatDate';
import { formatAgeRating } from '@/entities/ageRating/utils/formatAgeRating';
import { ReactNode } from 'react';

type GameComponentProps = GameProps & {
  children?: ReactNode;
};

export const Game = (props: GameComponentProps) => {
  const gameStatusTranslation = {
    announced: 'Анонсирована',
    in_develope: 'В разработке',
    early_access: 'Ранний доступ',
    released: 'Выпущена',
    cancelled: 'Отменена',
    unknown: 'Неизвестно',
  };

  return (
    <div className={styles.game}>
      <div className={styles.actions}>
        <Image
          src={props.posterPath || POSTER_PLACEHOLDER}
          alt={props.title}
          width={300}
          height={450}
        />
        {props.children}
      </div>
      <div className={styles.info}>
        <h1>{props.title}</h1>
        <div className={styles.infoRow}>
          <h2>Статус:</h2>
          <h2>{gameStatusTranslation[props.status]}</h2>
        </div>
        <div className={styles.infoRow}>
          <h2>Дата выхода:</h2>
          <h2>{props.release && formatDate(props.release)}</h2>
        </div>
        <div className={styles.infoRow}>
          <h2>Возрастной рейтинг:</h2>
          <h2>{formatAgeRating(props.ageRating)}</h2>
        </div>
        <div className={styles.infoRow}>
          <h2>Рейтинг:</h2>
          <h2>{props.rating}</h2>
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
          <h2>Разработчик:</h2>
          <h2>
            {props.developers?.map((developer) => developer.name).join(', ')}
          </h2>
        </div>
        <div className={styles.infoRow}>
          <h2>Платформа:</h2>
          <h2>
            {props.platforms?.map((platform) => platform.name).join(', ')}
          </h2>
        </div>
        <div className={styles.infoRow}>
          <h2>Издатель:</h2>
          <h2>
            {props.publishers?.map((publisher) => publisher.name).join(', ')}
          </h2>
        </div>
        <h2>Описание:</h2>
        <h2>{props.description}</h2>
      </div>
    </div>
  );
};
