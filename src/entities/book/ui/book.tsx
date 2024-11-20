import { BookProps } from '@/entities/book/model/types';
import Image from 'next/image';
import { GenreList } from '@/entities/genre/ui/genresList';
import { ThemeList } from '@/entities/theme/ui/themeList';
import { POSTER_PLACEHOLDER } from '@/shared/constants';
import styles from './book.module.css';
import { formatDate } from '@/shared/utils/formatDate';
import { formatAgeRating } from '@/entities/ageRating/utils/formatAgeRating';
import { ReactNode } from 'react';
import { Comments } from '@/widgets/Comments/ui/Comments';

type BookComponentProps = BookProps & {
  children?: ReactNode;
};

export const Book = (props: BookComponentProps) => {
  const bookStatusTranslation: Record<BookProps['status'], string> = {
    announced: 'Анонсирована',
    writing: 'В работе',
    editing: 'Редактируется',
    airing: 'Публикуется',
    published: 'Опубликована',
    cancelled: 'Отменена',
    unknown: 'Неизвестно',
  };

  return (
    <div className={styles.page}>
      <div className={styles.book}>
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
            <h2>{bookStatusTranslation[props.status]}</h2>
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
            <h2>Жанры:</h2>
            <GenreList genres={props.genres} />
          </div>
          <div className={styles.infoRow}>
            <h2>Темы:</h2>
            <ThemeList themes={props.themes} />
          </div>
          <h2>Описание:</h2>
          <h2>{props.description}</h2>
        </div>
      </div>
      <Comments contentId={props.id} contentType={'books'} />
    </div>
  );
};
