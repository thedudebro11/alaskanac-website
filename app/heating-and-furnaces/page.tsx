import type { Metadata } from 'next';
import { SERVICES } from '@/content/services';
import { FAQS } from '@/content/faqs';
import { ServicePageLayout } from '@/components/shared/ServicePageLayout';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { generateServiceSchema } from '@/lib/schema';

const service = SERVICES.find((s) => s.slug === 'heating-and-furnaces')!;
const relatedFaqs = FAQS.filter((f) => f.relatedServiceSlug === 'heating-and-furnaces');

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: `https://www.alaskanac.com/${service.slug}/` },
};

export default function HeatingPage() {
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
        ctaHeadline="Schedule heating or furnace service today"
      >
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>Heating &amp; Furnace Services</h2>
          <p style={{ marginTop: 'var(--space-4)' }}>
            Tucson winters may seem mild from the outside, but temperatures routinely drop
            below 40°F at night from November through February. A furnace that hasn&apos;t
            been maintained is a furnace that fails when you need it most.
          </p>
          <p>
            Alaskan Air Conditioning provides furnace repair, maintenance, and installation
            for Tucson and Phoenix homeowners. Our NATE-certified technicians service all
            major brands and can diagnose problems quickly.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>Signs Your Furnace Needs Service</h2>
          <ul style={{ marginTop: 'var(--space-4)', paddingLeft: 'var(--space-6)', listStyle: 'disc' }}>
            <li>Furnace won&apos;t turn on or runs briefly then shuts off</li>
            <li>Unusual smells (burning dust, gas odor)</li>
            <li>Uneven heating between rooms</li>
            <li>Energy bills higher than normal</li>
            <li>System is 15+ years old</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>Frequently Asked Questions</h2>
          <div style={{ marginTop: 'var(--space-6)' }}>
            <FAQAccordion faqs={relatedFaqs} />
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
