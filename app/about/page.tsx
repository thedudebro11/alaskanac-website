import type { Metadata } from 'next';
import { BUSINESS } from '@/content/business';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { CTABanner } from '@/components/shared/CTABanner';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Alaskan Air Conditioning & Heating | Tucson AZ',
  description:
    'Learn about Alaskan Air Conditioning & Heating — serving Tucson and Phoenix since 1972. ' +
    'NATE-certified, Trane Comfort Specialist, Google Guaranteed.',
  alternates: { canonical: 'https://www.alaskanac.com/about/' },
};

export default function AboutPage() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <BreadcrumbNav crumbs={[{ name: 'Home', href: '/' }, { name: 'About' }]} />
          <h1 className={styles.h1}>About Alaskan Air Conditioning &amp; Heating</h1>
          <p className={styles.sub}>
            Serving Tucson and Phoenix since {BUSINESS.foundingYear} — the Alaskan way, not the cheap way.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2>Our Story</h2>
          {/* ⚠️ CLIENT INPUT: Founding story, history, brand origin */}
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-gray-600)' }}>
            ⚠️ CLIENT INPUT NEEDED: Founding story — how and why Alaskan AC was started,
            the origin of the "Alaskan" name, key milestones since {BUSINESS.foundingYear}.
          </p>
        </div>
      </section>

      <section className="section--gray" style={{ padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2>Our Team</h2>
          {/* ⚠️ CLIENT INPUT: Team photos + names + roles */}
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-gray-600)' }}>
            ⚠️ CLIENT INPUT NEEDED: Team photos, names, and roles.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2>Our Certifications</h2>
          <ul style={{ marginTop: 'var(--space-6)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', listStyle: 'none' }}>
            {BUSINESS.certifications.map((cert) => (
              <li
                key={cert}
                style={{
                  padding: '10px 20px',
                  background: 'var(--color-blue-light)',
                  border: '1px solid var(--color-gray-200)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                ✓ {cert}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-gray-600)' }}>
            License: {BUSINESS.license}
          </p>
        </div>
      </section>

      <section className="section--gray" style={{ padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2>What Is &quot;Alaskafying&quot; Your System?</h2>
          <p style={{ marginTop: 'var(--space-4)' }}>
            The Alaskafication is our signature maintenance service — our version of
            an AC tune-up, done the right way. It goes further than a basic 20-minute checkup.
            When we Alaskafy a system, it&apos;s ready for an Arizona summer.
          </p>
          {/* ⚠️ CLIENT INPUT: Expand with history of how the Alaskafication was developed */}
        </div>
      </section>

      <CTABanner
        headline={`${BUSINESS.ratings.displayCount} 5-star reviews. See for yourself.`}
        subtext="Schedule service and experience the Alaskan difference."
        buttonLabel="Schedule Service"
        buttonHref="/contact/"
        variant="blue"
      />
    </>
  );
}
