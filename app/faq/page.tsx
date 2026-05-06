import type { Metadata } from 'next';
import { FAQS } from '@/content/faqs';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { BreadcrumbNav } from '@/components/shared/BreadcrumbNav';
import { CTABanner } from '@/components/shared/CTABanner';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { generateFAQPageSchema } from '@/lib/schema';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'HVAC & AC FAQ Tucson AZ | Alaskan Air Conditioning',
  description:
    'Answers to the most common HVAC and air conditioning questions for Tucson & Phoenix homeowners. ' +
    'From Alaskafications to AC installation costs.',
  alternates: {
    canonical: 'https://www.alaskanac.com/faq/',
  },
};

export default function FAQPage() {
  return (
    <>
      <SchemaScript schema={generateFAQPageSchema()} />

      <div className={styles.hero}>
        <div className="container">
          <BreadcrumbNav
            crumbs={[
              { name: 'Home', href: '/' },
              { name: 'FAQ' },
            ]}
          />
          <h1 className={styles.h1}>
            HVAC &amp; Air Conditioning FAQ — Tucson &amp; Phoenix, AZ
          </h1>
          <p className={styles.sub}>
            Answers to the most common questions from Arizona homeowners about their AC,
            heating, and indoor air quality systems.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      <CTABanner
        headline="Still have questions?"
        subtext="Call us or use the contact form — we're happy to help."
        buttonLabel="Contact Alaskan AC"
        buttonHref="/contact/"
        variant="blue"
      />
    </>
  );
}
