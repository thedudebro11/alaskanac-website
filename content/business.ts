// Single source of truth for all business identity data.
// Imported by: lib/schema.ts, components/layout/Footer.tsx,
// components/layout/StickyHeader.tsx, components/shared/NAP.tsx,
// and every page's generateMetadata() function.

export const BUSINESS = {
  name: 'Alaskan Air Conditioning & Heating Tucson',
  shortName: 'Alaskan Air Conditioning',
  url: 'https://www.alaskanac.com',
  foundingYear: 1972,
  license: 'ROC# 240693',

  // TWO-NUMBER RULE:
  // display / href  → shown in all UI elements (nav, hero, footer, CTAs)
  // tucsonGbp       → used ONLY in Tucson HVACBusiness schema (matches GBP)
  // phoenixGbp      → used ONLY in Phoenix HVACBusiness schema (matches Phoenix GBP)
  // NEVER use tucsonGbp or phoenixGbp in visible UI.
  phone: {
    display: '(844) 364-5800',
    href: 'tel:8443645800',
    tucsonGbp: '(520) 815-5555',
    phoenixGbp: '⚠️ CLIENT INPUT', // Confirm vs (602) 783-8111 or (602) 529-5555 in GBP
  },

  tucson: {
    name: 'Alaskan Air Conditioning & Heating Tucson',
    address: {
      street: '2305 N 7th Ave',
      city: 'Tucson',
      state: 'AZ',
      zip: '85705',
      country: 'US',
      full: '2305 N 7th Ave, Tucson, AZ 85705',
    },
    coordinates: {
      lat: '⚠️ DEVELOPER: get from Google Maps API for 2305 N 7th Ave Tucson AZ',
      lng: '⚠️ DEVELOPER: get from Google Maps API for 2305 N 7th Ave Tucson AZ',
    },
    placeId: 'ChIJQWnLxGtx1oYR-AKYEEAAdY0',
    mapsEmbedSrc:
      'https://www.google.com/maps/embed/v1/place?key=MAPS_API_KEY&q=place_id:ChIJQWnLxGtx1oYR-AKYEEAAdY0',
    reviewUrl:
      'https://search.google.com/local/writereview?placeid=ChIJQWnLxGtx1oYR-AKYEEAAdY0',
    hours: '⚠️ CLIENT INPUT', // { mon: "8:00 AM – 6:00 PM", ... }
  },

  phoenix: {
    name: 'Alaskan Air Conditioning & Heating Phoenix',
    address: {
      street: '⚠️ CLIENT INPUT',
      city: 'Phoenix',
      state: 'AZ',
      zip: '⚠️ CLIENT INPUT',
      country: 'US',
    },
    coordinates: {
      lat: '⚠️ DEVELOPER: get from Phoenix GBP',
      lng: '⚠️ DEVELOPER: get from Phoenix GBP',
    },
    placeId: '⚠️ DEVELOPER: get Phoenix Place ID from GBP listing',
    mapsEmbedSrc: '⚠️ DEVELOPER: build once Phoenix placeId is confirmed',
    reviewUrl: '⚠️ DEVELOPER: build once Phoenix placeId is confirmed',
    hours: '⚠️ CLIENT INPUT',
  },

  ratings: {
    schemaValue: 4.7,
    schemaCount: 3639,        // GBP API — authoritative for JSON-LD schema
    displayCount: '4,400+',   // Use in all marketing copy
    nearbyNow: '5,400+',
    bbb: '100+',
  },

  certifications: [
    'NATE Certified',
    'Trane Comfort Specialist',
    'Google Guaranteed',
    'ACCA Member',
    'NARI Member',
    'Energy Star Partner',
  ],
} as const;
