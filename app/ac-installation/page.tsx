import type { Metadata } from 'next';
import { SERVICES } from '@/content/services';
import { FAQS } from '@/content/faqs';
import { ServicePageLayout } from '@/components/shared/ServicePageLayout';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { generateServiceSchema } from '@/lib/schema';

const service = SERVICES.find((s) => s.slug === 'ac-installation')!;
const relatedFaqs = FAQS.filter((f) => f.relatedServiceSlug === 'ac-installation').slice(0, 3);

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: `https://www.alaskanac.com/${service.slug}/` },
};

export default function ACInstallationPage() {
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
        ctaHeadline="Get a free AC installation quote"
      >
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>New AC Installation in Tucson &amp; Phoenix</h2>
          <p style={{ marginTop: 'var(--space-4)' }}>
            Whether your old system has finally given out or you&apos;re upgrading to a more
            efficient unit, Alaskan Air Conditioning makes the installation process easy.
            We provide free, no-obligation quotes with a full written breakdown before
            any work begins.
          </p>
          <p>
            As a Trane Comfort Specialist, we install Trane systems — widely regarded as
            the most reliable AC equipment available. We size every installation with a
            proper Manual J load calculation, not guesswork. An oversized system costs
            more to run and fails sooner.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>Signs It&apos;s Time to Replace Your AC</h2>
          <ul style={{ marginTop: 'var(--space-4)', paddingLeft: 'var(--space-6)', listStyle: 'disc' }}>
            <li>System is 12+ years old</li>
            <li>Repair costs exceed 50% of replacement cost</li>
            <li>Energy bills keep rising despite maintenance</li>
            <li>Repeated breakdowns in recent years</li>
            <li>Refrigerant leaks requiring R-22 (phased out)</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>Our Installation Process</h2>
          <p style={{ marginTop: 'var(--space-4)' }}>
            Free in-home assessment → load calculation → written quote →
            scheduled installation → system commissioning → thermostat setup → walkthrough.
          </p>
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
