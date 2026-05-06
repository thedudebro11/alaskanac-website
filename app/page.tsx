import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TestimonialBlock } from '@/components/home/TestimonialBlock';
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
  const mapSrc = BUSINESS.tucson.mapsEmbedSrc.replace(
    'MAPS_API_KEY',
    process.env.MAPS_API_KEY ?? ''
  );

  return (
    <>
      <SchemaScript schema={generateHVACBusinessSchema('homepage')} />
      <SchemaScript schema={generateWebSiteSchema()} />

      <Hero />
      <TrustBar />
      <ServicesGrid />
      <WhyChooseUs />
      <TestimonialBlock />

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
  );
}
