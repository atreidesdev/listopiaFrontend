import styles from './card.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { POSTER_PLACEHOLDER } from '@/shared/constants';

export type CardProps = {
  type: string;
  id: number;
  posterPath: string | null;
  title: string;
  release?: string | null;
  rating?: number | null;
};

export const Card = (props: CardProps) => {
  const releaseYear = props.release
    ? new Date(props.release).getFullYear()
    : null;

  const prefixedType = ['movies', 'books', 'games'].includes(props.type)
    ? `content/${props.type}`
    : props.type;

  return (
    <Link href={`/${prefixedType}/${props.id}`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.poster}>
          <Image
            src={props.posterPath || POSTER_PLACEHOLDER}
            alt={props.title}
            width={200}
            height={300}
            placeholder={'empty'}
            priority={true}
          />
        </div>
        <div className={styles.details}>
          <h2 className={styles.title}>{props.title}</h2>
          <div className={styles.meta}>
            <h3 className={styles.release}>{releaseYear || '\u00A0'}</h3>
            <h3 className={styles.rating}>
              {props.rating?.toFixed(1) || '\u00A0'}
            </h3>
          </div>
        </div>
      </article>
    </Link>
  );
};
