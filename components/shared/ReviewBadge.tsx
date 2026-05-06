import { BUSINESS } from '@/content/business';
import styles from './ReviewBadge.module.css';

interface Props {
  className?: string;
}

export function ReviewBadge({ className }: Props) {
  return (
    <span className={`${styles.badge} ${className ?? ''}`}>
      <span className={styles.stars} aria-hidden="true">★</span>
      <span className={styles.text}>
        {BUSINESS.ratings.schemaValue} · {BUSINESS.ratings.displayCount} reviews
      </span>
    </span>
  );
}
