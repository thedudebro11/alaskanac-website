import { BUSINESS } from '@/content/business';
import styles from './TrustBar.module.css';

// Static HTML — rendered server-side, NOT client-side JS.
// Current site bug: trust bar items are JS-only (invisible to crawlers + without JS).
// This component is a Server Component by default in Next.js App Router.
const TRUST_ITEMS = [
  `Serving Arizona Since ${BUSINESS.foundingYear}`,
  'NATE Certified Technicians',
  'Trane Comfort Specialist',
  'Google Guaranteed',
  '24/7 Emergency Service',
  `${BUSINESS.ratings.displayCount} 5-Star Reviews`,
  `${BUSINESS.license}`,
];

export function TrustBar() {
  return (
    <section className={styles.bar} aria-label="Trust signals">
      <div className={`container ${styles.inner}`}>
        {TRUST_ITEMS.map((item) => (
          <div key={item} className={styles.item}>
            <span className={styles.check} aria-hidden="true">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
