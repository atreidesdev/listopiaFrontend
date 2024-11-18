import styles from './page.module.css';
import { CardList } from '@/shared/ui/card/ui/cardList';

export default function Home() {
  const cardsData = [
    {
      posterPath:
        'https://avatars.mds.yandex.net/get-entity_search/478540/858214722/S600xU_2x',
      title: 'Dune 2',
      rating: 88.33,
      release: '2024-01-01T00:00:00.000Z',
      type: 'movie',
      id: 1,
    },
    {
      posterPath:
        'https://avatars.mds.yandex.net/get-entity_search/478540/858214722/S600xU_2x',
      title: 'The Matrix 4',
      rating: 75.5,
      release: '2024-03-15T00:00:00.000Z',
      type: 'movie',
      id: 2,
    },
    {
      posterPath:
        'https://avatars.mds.yandex.net/get-entity_search/478540/858214722/S600xU_2x',
      title: 'The Matrix 4',
      rating: 75.5,
      release: '2024-03-15T00:00:00.000Z',
      type: 'movie',
      id: 2,
    },
    {
      posterPath:
        'https://avatars.mds.yandex.net/get-entity_search/478540/858214722/S600xU_2x',
      title: 'The Matrix 4',
      rating: 75.5,
      release: '2024-03-15T00:00:00.000Z',
      type: 'movie',
      id: 2,
    },
    {
      posterPath:
        'https://avatars.mds.yandex.net/get-entity_search/478540/858214722/S600xU_2x',
      title: 'The Matrix 4',
      rating: 75.5,
      release: '2024-03-15T00:00:00.000Z',
      type: 'movie',
      id: 2,
    },
  ];

  return (
    <main className={styles.main}>
      <CardList cards={cardsData} />
    </main>
  );
}
