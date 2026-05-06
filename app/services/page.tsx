import type { Metadata } from 'next';
import { SERVICES } from '@/content/services';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { CTABanner } from '@/components/shared/CTABanner';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'HVAC Services Tucson & Phoenix AZ | Alaskan Air Conditioning',
  description:
    'HVAC services in Tucson and Phoenix: Alaskafication maintenance, AC installation, ' +
    'heating & furnaces, indoor air quality. NATE-certified. Call (844) 364-5800.',
  alternates: {
    canonical: 'https://www.alaskanac.com/services/',
  },
};

export default function ServicesPage() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <BreadcrumbNav crumbs={[{ name: 'Home', href: '/' }, { name: 'Services' }]} />
          <h1 className={styles.h1}>HVAC Services in Tucson &amp; Phoenix, AZ</h1>
          <p className={styles.sub}>
            From our signature Alaskafication maintenance to full system installation,
            Alaskan Air Conditioning covers every aspect of your home comfort.
            NATE-certified. Serving Arizona since 1972.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Not sure which service you need?"
        subtext="Call us — we'll diagnose the problem and recommend the right solution."
        buttonLabel="Call (844) 364-5800"
        buttonHref="tel:8443645800"
        variant="blue"
      />
    </>
  );
}
