import { Card, CardProps } from '@/shared/ui/card/ui/card';
import styles from './cardList.module.css';

type CardListProps = {
  cards: CardProps[];
};

export const CardList = (props: CardListProps) => {
  return (
    <div className={styles.cardList}>
      {props.cards.map((card) => (
        <Card
          key={card.id}
          type={card.type}
          id={card.id}
          posterPath={card.posterPath}
          title={card.title}
          release={card.release}
          rating={card.rating}
        />
      ))}
    </div>
  );
};
