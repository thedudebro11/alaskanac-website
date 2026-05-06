import type { Metadata } from 'next';
import { ContactForm } from '@/components/shared/ContactForm';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { MapEmbed } from '@/components/shared/MapEmbed';
import { NAP } from '@/components/shared/NAP';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { generateHVACBusinessSchema } from '@/lib/schema';
import { BUSINESS } from '@/content/business';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact Alaskan Air Conditioning — Tucson & Phoenix, AZ',
  description:
    'Contact Alaskan Air Conditioning & Heating in Tucson and Phoenix, AZ. ' +
    'Schedule service, request a free quote, or call (844) 364-5800 for 24/7 emergency service.',
  alternates: {
    canonical: 'https://www.alaskanac.com/contact/',
  },
};

export default function ContactPage() {
  const mapSrc = BUSINESS.tucson.mapsEmbedSrc.replace(
    'MAPS_API_KEY',
    process.env.MAPS_API_KEY ?? ''
  );

  return (
    <>
      <SchemaScript schema={generateHVACBusinessSchema('homepage')} />

      <div className={styles.hero}>
        <div className="container">
          <BreadcrumbNav
            crumbs={[
              { name: 'Home', href: '/' },
              { name: 'Contact' },
            ]}
          />
          <h1 className={styles.h1}>
            Contact Alaskan Air Conditioning — Tucson &amp; Phoenix, AZ
          </h1>
          <p className={styles.sub}>
            Schedule service, request a free quote, or ask a question.
            For emergencies, call <a href={BUSINESS.phone.href}>{BUSINESS.phone.display}</a> — we answer 24/7.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div>
              <h2 className={styles.sectionHeading}>Send Us a Message</h2>
              <ContactForm />
            </div>

            <div className={styles.info}>
              <h2 className={styles.sectionHeading}>Contact Information</h2>

              <div className={styles.locations}>
                <div>
                  <h3 className={styles.locationTitle}>Tucson</h3>
                  <NAP location="tucson" />
                </div>
                <div>
                  <h3 className={styles.locationTitle}>Phoenix</h3>
                  <NAP location="phoenix" />
                </div>
              </div>

              <div className={styles.hours}>
                <h3 className={styles.locationTitle}>Business Hours</h3>
                <p>⚠️ CLIENT INPUT: Add business hours here</p>
                <p style={{ marginTop: 'var(--space-2)', fontSize: '14px', color: 'var(--color-orange)' }}>
                  24/7 Emergency Service Available
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-12)' }}>
            <MapEmbed
              src={mapSrc}
              title="Alaskan Air Conditioning Tucson — 2305 N 7th Ave"
            />
          </div>
        </div>
      </section>
    </>
  );
}
