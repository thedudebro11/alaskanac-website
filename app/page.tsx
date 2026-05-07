import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TestimonialBlock } from '@/components/home/TestimonialBlock';
import { IceDivider } from '@/components/shared/IceDivider';
import { MapEmbed } from '@/components/shared/MapEmbed';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { generateHVACBusinessSchema, generateWebSiteSchema } from '@/lib/schema';
import { BUSINESS } from '@/content/business';

export const metadata: Metadata = {
  title: 'HVAC Tucson AZ | Alaskan Air Conditioning & Heating',
  description:
    'Expert HVAC and air conditioning in Tucson, AZ. Alaskafications, AC installation, ' +
    'heating & furnaces. NATE-certified. Trusted since 1972. Call (844) 364-5800.',
  alternates: {
    canonical: 'https://www.alaskanac.com/',
  },
};

export default function HomePage() {
  const apiKey = process.env.MAPS_API_KEY ?? '';
  const mapSrc = apiKey
    ? BUSINESS.tucson.mapsEmbedSrc.replace('MAPS_API_KEY', apiKey)
    : null;

  return (
    <>
      <SchemaScript schema={generateHVACBusinessSchema('homepage')} />
      <SchemaScript schema={generateWebSiteSchema()} />

      <Hero />
      {/* Hero (navy) → TrustBar (blue) */}
      <IceDivider fill="#1B6CA8" variant={1} />
      <TrustBar />
      {/* TrustBar (blue) → ServicesGrid (white) */}
      <IceDivider fill="#FFFFFF" variant={2} />
      <ServicesGrid />
      {/* ServicesGrid (white) → WhyChooseUs (navy) */}
      <IceDivider fill="#0C1A2E" variant={3} />
      <WhyChooseUs />
      {/* WhyChooseUs (navy) → TestimonialBlock (gray) */}
      <IceDivider fill="#F5F7FA" variant={1} />
      <TestimonialBlock />

      {mapSrc && (
        <>
          {/* TestimonialBlock (gray) → Map section (navy) */}
          <IceDivider fill="#0C1A2E" variant={2} />
          <section className="section--navy">
            <div className="container">
              <h2 style={{
                textAlign: 'center',
                marginBottom: 'var(--space-8)',
                fontSize: 'var(--text-h2-size)',
                fontWeight: 700,
                color: 'var(--color-white)',
              }}>
                Find Us in Tucson, AZ
              </h2>
              <MapEmbed
                src={mapSrc}
                title="Alaskan Air Conditioning — 2305 N 7th Ave, Tucson, AZ 85705"
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}
