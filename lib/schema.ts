import { BUSINESS } from '@/content/business';
import { LOCATIONS } from '@/content/locations';
import { FAQS } from '@/content/faqs';
import type { ServicePage } from '@/lib/types';

const BASE_URL = 'https://www.alaskanac.com';

export function generateHVACBusinessSchema(variant: 'homepage' | 'tucson' | 'phoenix') {
  if (variant === 'homepage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'HVACBusiness',
      '@id': `${BASE_URL}/#business`,
      name: BUSINESS.name,
      alternateName: 'Alaskan AC',
      url: `${BASE_URL}/`,
      telephone: BUSINESS.phone.tucsonGbp,
      foundingDate: String(BUSINESS.foundingYear),
      description:
        'Expert HVAC and air conditioning services in Tucson and Phoenix, AZ. ' +
        'Serving Arizona since 1972. NATE-certified technicians, Trane Comfort Specialist, Google Guaranteed.',
      hasCredential: [...BUSINESS.certifications],
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.tucson.address.street,
        addressLocality: BUSINESS.tucson.address.city,
        addressRegion: BUSINESS.tucson.address.state,
        postalCode: BUSINESS.tucson.address.zip,
        addressCountry: BUSINESS.tucson.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.tucson.coordinates.lat,
        longitude: BUSINESS.tucson.coordinates.lng,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(BUSINESS.ratings.schemaValue),
        reviewCount: String(BUSINESS.ratings.schemaCount),
        bestRating: '5',
        worstRating: '1',
      },
      priceRange: '$$',
      currenciesAccepted: 'USD',
      paymentAccepted: 'Cash, Credit Card, Check',
      areaServed: [
        { '@type': 'City', name: 'Tucson', sameAs: 'https://en.wikipedia.org/wiki/Tucson,_Arizona' },
        { '@type': 'City', name: 'Phoenix', sameAs: 'https://en.wikipedia.org/wiki/Phoenix,_Arizona' },
      ],
      sameAs: [
        `https://www.google.com/maps/place/?q=place_id:${BUSINESS.tucson.placeId}`,
      ],
    };
  }

  const location = LOCATIONS[variant];
  const phone = variant === 'tucson' ? BUSINESS.phone.tucsonGbp : BUSINESS.phone.phoenixGbp;

  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${BASE_URL}/${variant}-az/#location`,
    name: location.name,
    url: `${BASE_URL}/${variant}-az/`,
    telephone: phone,
    branchOf: { '@id': `${BASE_URL}/#business` },
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(BUSINESS.ratings.schemaValue),
      reviewCount: String(BUSINESS.ratings.schemaCount),
      bestRating: '5',
      worstRating: '1',
    },
    hasMap: location.mapsEmbedSrc,
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: `${BASE_URL}/`,
    name: 'Alaskan Air Conditioning & Heating',
    description: 'HVAC and air conditioning services in Tucson and Phoenix, AZ since 1972.',
    publisher: { '@id': `${BASE_URL}/#business` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateServiceSchema(service: ServicePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/${service.slug}/#service`,
    name: service.name,
    description: service.metaDescription,
    url: `${BASE_URL}/${service.slug}/`,
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: [
      { '@type': 'City', name: 'Tucson', sameAs: 'https://en.wikipedia.org/wiki/Tucson,_Arizona' },
      { '@type': 'City', name: 'Phoenix', sameAs: 'https://en.wikipedia.org/wiki/Phoenix,_Arizona' },
    ],
  };
}

export function generateFAQPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
