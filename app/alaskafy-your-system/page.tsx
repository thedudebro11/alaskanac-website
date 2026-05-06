import type { Metadata } from 'next';
import { SERVICES } from '@/content/services';
import { FAQS } from '@/content/faqs';
import { ServicePageLayout } from '@/components/shared/ServicePageLayout';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { generateServiceSchema } from '@/lib/schema';

const service = SERVICES.find((s) => s.slug === 'alaskafy-your-system')!;
const relatedFaqs = FAQS.filter((f) => f.relatedServiceSlug === 'alaskafy-your-system').slice(0, 3);

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: `https://www.alaskanac.com/${service.slug}/` },
};

export default function AlaskafyPage() {
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
        ctaHeadline="Ready to Alaskafy your system?"
      >
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>What Is an Alaskafication?</h2>
          <p style={{ marginTop: 'var(--space-4)' }}>
            An Alaskafication is Alaskan Air Conditioning&apos;s proprietary maintenance service —
            our version of an AC tune-up, done the right way instead of the cheap way.
            Unlike a standard 20-minute checkup, an Alaskafication is a thorough inspection,
            cleaning, and optimization of your entire system.
          </p>
          <p>
            When we&apos;re done, your AC is ready for a Tucson summer — not just running, but
            running efficiently. Most customers report lower energy bills and fewer breakdowns
            after their first Alaskafication.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>What&apos;s Included</h2>
          {/* ⚠️ CLIENT INPUT: Replace with actual Alaskafication checklist */}
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-gray-600)' }}>
            ⚠️ CLIENT INPUT NEEDED: Full Alaskafication checklist (what the technician
            inspects, tests, cleans, and optimizes during service).
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2>Signs Your System Needs an Alaskafication</h2>
          <ul style={{ marginTop: 'var(--space-4)', paddingLeft: 'var(--space-6)', listStyle: 'disc' }}>
            <li>Higher-than-usual energy bills</li>
            <li>System running longer to reach set temperature</li>
            <li>Unusual noises or odors</li>
            <li>Uneven cooling between rooms</li>
            <li>It&apos;s been more than 12 months since last service</li>
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
