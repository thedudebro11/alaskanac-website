import type { Metadata } from 'next';
import { SERVICES } from '@/content/services';
import { LOCATIONS } from '@/content/locations';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { MapEmbed } from '@/components/shared/MapEmbed';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { CTABanner } from '@/components/shared/CTABanner';
import { generateHVACBusinessSchema } from '@/lib/schema';
import { BUSINESS } from '@/content/business';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'HVAC & Air Conditioning Services in Tucson, AZ | Alaskan AC',
  description:
    'Expert HVAC and air conditioning in Tucson, AZ. Alaskafications, AC installation, ' +
    'heating service. NATE-certified. Call (520) 815-5555.',
  alternates: { canonical: 'https://www.alaskanac.com/tucson-az/' },
};

export default function TucsonPage() {
  const location = LOCATIONS.tucson;
  const mapSrc = location.mapsEmbedSrc.replace('MAPS_API_KEY', process.env.MAPS_API_KEY ?? '');

  return (
    <>
      <SchemaScript schema={generateHVACBusinessSchema('tucson')} />

      <div className={styles.hero}>
        <div className="container">
          <BreadcrumbNav
            crumbs={[{ name: 'Home', href: '/' }, { name: 'Tucson, AZ' }]}
          />
          <h1 className={styles.h1}>HVAC &amp; Air Conditioning Services in Tucson, AZ</h1>
          <p className={styles.sub}>
            Alaskan Air Conditioning has served Tucson homeowners since {BUSINESS.foundingYear}.
            NATE-certified technicians. Trane Comfort Specialist. Google Guaranteed.
          </p>
          <p className={styles.address}>
            📍 {location.address.full} · <a href={location.phone.href}>{location.phone.display}</a>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className={styles.sectionHeading}>Our Services in Tucson, AZ</h2>
          <div className={styles.grid}>
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section--gray" style={{ padding: 'var(--space-16) 0' }}>
        <div className="container">
          <h2 className={styles.sectionHeading}>Tucson Service Areas</h2>
          <p style={{ color: 'var(--color-gray-600)', marginTop: 'var(--space-4)' }}>
            ⚠️ CLIENT INPUT: Add Tucson neighborhoods and zip codes served.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className={styles.sectionHeading} style={{ marginBottom: 'var(--space-8)' }}>
            Find Us in Tucson
          </h2>
          <MapEmbed
            src={mapSrc}
            title="Alaskan Air Conditioning — 2305 N 7th Ave, Tucson, AZ"
          />
        </div>
      </section>

      <CTABanner
        headline="Schedule HVAC service in Tucson today"
        subtext="Same-day service available. 24/7 emergency line."
        buttonLabel="Schedule Now — Tucson"
        buttonHref="/contact/"
        variant="blue"
      />
    </>
  );
}
