import { LOCATIONS } from '@/content/locations';
import styles from './NAP.module.css';

interface Props {
  location: 'tucson' | 'phoenix';
  className?: string;
}

export function NAP({ location, className }: Props) {
  const loc = LOCATIONS[location];

  return (
    <address className={`${styles.nap} ${className ?? ''}`}>
      <span className={styles.name}>{loc.name}</span>
      <a href={loc.phone.href} className={styles.phone}>{loc.phone.display}</a>
      <span className={styles.address}>{loc.address.full}</span>
    </address>
  );
}
