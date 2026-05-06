import type { Metadata } from 'next';
import { SERVICES } from '@/content/services';
import { LOCATIONS } from '@/content/locations';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { CTABanner } from '@/components/shared/CTABanner';
import { generateHVACBusinessSchema } from '@/lib/schema';
import { BUSINESS } from '@/content/business';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'HVAC & Air Conditioning Services in Phoenix, AZ | Alaskan AC',
  description:
    'Expert HVAC and air conditioning in Phoenix, AZ. Alaskafications, AC installation, ' +
    'heating service. NATE-certified. Alaskan Air Conditioning.',
  alternates: { canonical: 'https://www.alaskanac.com/phoenix-az/' },
};

export default function PhoenixPage() {
  const location = LOCATIONS.phoenix;

  return (
    <>
      <SchemaScript schema={generateHVACBusinessSchema('phoenix')} />

      <div className={styles.hero}>
        <div className="container">
          <BreadcrumbNav
            crumbs={[{ name: 'Home', href: '/' }, { name: 'Phoenix, AZ' }]}
          />
          <h1 className={styles.h1}>HVAC &amp; Air Conditioning Services in Phoenix, AZ</h1>
          <p className={styles.sub}>
            Alaskan Air Conditioning serves Phoenix homeowners with the same NATE-certified
            expertise and Alaskan-quality service we deliver in Tucson.
            Trusted since {BUSINESS.foundingYear}.
          </p>
          {/* ⚠️ CLIENT INPUT: Add Phoenix address + phone once confirmed */}
          <p className={styles.addressNote}>
            📍 {location.address.full !== '⚠️ CLIENT INPUT: full Phoenix address'
              ? location.address.full
              : 'Phoenix, AZ — address coming soon'}
            {' · '}
            <a href={location.phone.href !== '⚠️ CLIENT INPUT: tel:XXXXXXXXXX' ? location.phone.href : '#'}>
              {location.phone.display !== '⚠️ CLIENT INPUT: Phoenix GBP phone'
                ? location.phone.display
                : 'Call for Phoenix location'}
            </a>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className={styles.sectionHeading}>Our Services in Phoenix, AZ</h2>
          <div className={styles.grid}>
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Schedule HVAC service in Phoenix today"
        subtext="Same NATE-certified quality as Tucson. 24/7 emergency line."
        buttonLabel="Schedule Now — Phoenix"
        buttonHref="/contact/"
        variant="blue"
      />
    </>
  );
}
