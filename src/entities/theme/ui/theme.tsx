import styles from './theme.module.css';
import { ThemeProps } from '@/entities/theme/model/types';

type ThemeComponentProps = ThemeProps & { isLast?: boolean };

export const Theme = (props: ThemeComponentProps) => {
  return (
    <span className={styles.theme}>
      {props.name}
      {!props.isLast && ', '}
    </span>
  );
};
