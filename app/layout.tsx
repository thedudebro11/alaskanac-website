import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import '@/styles/globals.css';
import { StickyHeader } from '@/components/layout/StickyHeader';
import { Footer } from '@/components/layout/Footer';
import { SnowPhysics } from '@/components/shared/SnowPhysics';

const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Alaskan Air Conditioning & Heating',
    default: 'HVAC Tucson AZ | Alaskan Air Conditioning & Heating',
  },
  description:
    'Expert HVAC and air conditioning services in Tucson and Phoenix, AZ. ' +
    'NATE-certified technicians, Trane Comfort Specialist. Call (844) 364-5800.',
  metadataBase: new URL('https://www.alaskanac.com'),
  openGraph: {
    siteName: 'Alaskan Air Conditioning & Heating',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.variable}>
      <body className={lato.className}>
        <noscript>
          <style>{`
            .reveal, .reveal--left, .reveal--right, .reveal--scale {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
        <SnowPhysics />
        <StickyHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
