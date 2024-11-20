'use client';

import styles from './Lists.module.css';
import { NavItem } from '@/shared/ui/navItem/navItem';
import {
  StatusCountByType,
  typeSpecificTranslations,
} from '@/entities/listItem/model/types';

const Lists = (props: StatusCountByType & { username: string }) => {
  const renderStatus = (type: keyof StatusCountByType, label: string) => {
    const translations = typeSpecificTranslations[type];

    return (
      <div className={styles.List}>
        <h3>{label}</h3>
        <div className={styles.ListCounts}>
          {Object.entries(props[type]).map(([key, value]) => (
            <NavItem
              key={key}
              route={{
                route: `user/${props.username}/${type}/${key}`,
                label: `${translations[key]}: ${value}`,
              }}
              path={''}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.ListsContainer}>
      {renderStatus('movies', 'Фильмы')}
      {renderStatus('games', 'Игры')}
      {renderStatus('books', 'Книги')}
    </div>
  );
};

export default Lists;
