export interface Location {
  id: 'tucson' | 'phoenix';
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  phone: {
    display: string;
    href: string;
  };
  placeId: string;
  coordinates: { lat: string; lng: string };
  mapsEmbedSrc: string;
  reviewUrl: string;
  hours: DayHours[];
  serviceAreas: string[];
}

export interface DayHours {
  days: string[];
  opens: string;
  closes: string;
}

export interface ServicePage {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subHeadline: string;
  keywords: string[];
  iconName: string;
  isSignature?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
  relatedServiceSlug?: string;
}

export interface Testimonial {
  quote: string;
  reviewerName: string;
  location: 'Tucson' | 'Phoenix';
  stars: 1 | 2 | 3 | 4 | 5;
  source: 'Google' | 'NearbyNow' | 'BBB';
}
