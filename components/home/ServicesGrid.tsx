import { SERVICES } from '@/content/services';
import { ServiceCard } from '@/components/shared/ServiceCard';
import styles from './ServicesGrid.module.css';

export function ServicesGrid() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h2 className={styles.heading}>Our HVAC Services</h2>
        <p className={styles.sub}>
          From our signature Alaskafication maintenance to full system installation,
          we cover every aspect of your home comfort.
        </p>
        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
