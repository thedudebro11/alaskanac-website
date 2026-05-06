import styles from './EmergencyBadge.module.css';

export function EmergencyBadge() {
  return (
    <span className={styles.badge} aria-label="24/7 emergency service available">
      24/7 Emergency Service
    </span>
  );
}
