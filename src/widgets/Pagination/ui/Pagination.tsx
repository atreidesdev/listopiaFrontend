import styles from './Pagination.module.css';
import { Button } from '@/shared/ui/button/button';
type PaginationProps = {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
};

export const Pagination = (props: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <Button
        variant="primary"
        onClick={() => props.onPageChange(props.currentPage - 1)}
        disabled={props.currentPage <= 1}
        name={'⬅'}
      />
      <Button
        variant="primary"
        onClick={() => props.onPageChange(props.currentPage + 1)}
        disabled={!props.hasNextPage}
        name={'➡'}
      />
    </div>
  );
};
