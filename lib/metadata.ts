import type { Metadata } from 'next';

const BASE_URL = 'https://www.alaskanac.com';
const SITE_NAME = 'Alaskan Air Conditioning & Heating';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`;

interface MetadataInput {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

export function generateMetadata({ title, description, path, noIndex }: MetadataInput): Metadata {
  const canonicalUrl = `${BASE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
