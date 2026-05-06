import type { Metadata } from 'next';
import { SERVICES } from '@/content/services';
import { ServicePageLayout } from '@/components/shared/ServicePageLayout';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { generateServiceSchema } from '@/lib/schema';

const service = SERVICES.find((s) => s.slug === 'indoor-air-quality')!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: `https://www.alaskanac.com/${service.slug}/` },
};

export default function IndoorAirQualityPage() {
  return (
    <>
      <SchemaScript schema={generateServiceSchema(service)} />

      <ServicePageLayout
        h1={service.h1}
        subHeadline={service.subHeadline}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services/' },
          { name: service.name },
        ]}
        ctaHeadline="Schedule an indoor air quality assessment"
      >
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>Indoor Air Quality in Tucson &amp; Phoenix</h2>
          <p style={{ marginTop: 'var(--space-4)' }}>
            Arizona homes face unique air quality challenges: dust, pollen, wildfire smoke,
            and dry air that stresses respiratory systems. The air inside your home can be
            2–5 times more polluted than outdoor air, according to the EPA.
          </p>
          <p>
            Alaskan Air Conditioning tests, filters, and improves the air in your home
            with solutions including high-efficiency filtration, UV air purifiers, and
            whole-home humidifiers.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>Our Indoor Air Quality Services</h2>
          <ul style={{ marginTop: 'var(--space-4)', paddingLeft: 'var(--space-6)', listStyle: 'disc' }}>
            <li>Air quality testing and assessment</li>
            <li>High-efficiency filter upgrades (MERV 11–13)</li>
            <li>UV germicidal air purifiers</li>
            <li>Whole-home humidifiers and dehumidifiers</li>
            <li>Duct cleaning and sealing</li>
            <li>Ventilation system improvements</li>
          </ul>
        </section>
      </ServicePageLayout>
    </>
  );
}
