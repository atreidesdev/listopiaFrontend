import { NavItem } from '@/shared/ui/navItem/navItem';
import styles from './ListItem.module.css';

export type ListItemProps = {
  contentType: string;
  contentId: string;
  title: string;
  rating: number | null;
};

export const ListItem = (props: ListItemProps) => {
  return (
    <div className={styles.listItem}>
      <div className={styles.title}>
        <NavItem
          route={{
            label: props.title,
            route: `content/${props.contentType}/${props.contentId}`,
          }}
          path={''}
          shouldScaleOnHover={false}
        />
      </div>
      <div className={styles.rating}>{props.rating}</div>
    </div>
  );
};
