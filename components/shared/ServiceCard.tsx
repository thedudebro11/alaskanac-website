import Link from 'next/link';
import type { ServicePage } from '@/lib/types';
import styles from './ServiceCard.module.css';

interface Props {
  service: ServicePage;
}

export function ServiceCard({ service }: Props) {
  return (
    <Link href={`/${service.slug}/`} className={styles.card}>
      {service.isSignature && (
        <span className={styles.badge}>Signature Service</span>
      )}
      <div className={styles.icon} aria-hidden="true">
        {/* Icon placeholder — replace with heroicons or lucide-react */}
        ❄
      </div>
      <h3 className={styles.name}>{service.name}</h3>
      <p className={styles.tagline}>{service.tagline}</p>
      <span className={styles.cta}>Learn more →</span>
    </Link>
  );
}
