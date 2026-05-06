import type { Location } from '@/lib/types';

export const LOCATIONS: Record<'tucson' | 'phoenix', Location> = {
  tucson: {
    id: 'tucson',
    name: 'Alaskan Air Conditioning & Heating Tucson',
    address: {
      street: '2305 N 7th Ave',
      city: 'Tucson',
      state: 'AZ',
      zip: '85705',
      full: '2305 N 7th Ave, Tucson, AZ 85705',
    },
    phone: {
      display: '(520) 815-5555',  // GBP phone — NAP/schema use only
      href: 'tel:5208155555',
    },
    placeId: 'ChIJQWnLxGtx1oYR-AKYEEAAdY0',
    coordinates: {
      lat: '⚠️ DEVELOPER: get from Google Geocoding API',
      lng: '⚠️ DEVELOPER: get from Google Geocoding API',
    },
    mapsEmbedSrc:
      'https://www.google.com/maps/embed/v1/place?key=MAPS_API_KEY' +
      '&q=place_id:ChIJQWnLxGtx1oYR-AKYEEAAdY0',
    reviewUrl:
      'https://search.google.com/local/writereview?placeid=ChIJQWnLxGtx1oYR-AKYEEAAdY0',
    hours: [
      // ⚠️ CLIENT INPUT: Replace with actual hours from GBP
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '⚠️ CLIENT INPUT',
        closes: '⚠️ CLIENT INPUT',
      },
      {
        days: ['Saturday'],
        opens: '⚠️ CLIENT INPUT',
        closes: '⚠️ CLIENT INPUT',
      },
    ],
    serviceAreas: [
      // ⚠️ CLIENT INPUT: Tucson neighborhoods and zip codes served
    ],
  },

  phoenix: {
    id: 'phoenix',
    name: 'Alaskan Air Conditioning & Heating Phoenix',
    address: {
      street: '⚠️ CLIENT INPUT: Phoenix street address',
      city: 'Phoenix',
      state: 'AZ',
      zip: '⚠️ CLIENT INPUT',
      full: '⚠️ CLIENT INPUT: full Phoenix address',
    },
    phone: {
      display: '⚠️ CLIENT INPUT: Phoenix GBP phone',
      href: '⚠️ CLIENT INPUT: tel:XXXXXXXXXX',
    },
    placeId: '⚠️ DEVELOPER: get Phoenix Place ID from GBP listing',
    coordinates: {
      lat: '⚠️ DEVELOPER: get from Google Geocoding API',
      lng: '⚠️ DEVELOPER: get from Google Geocoding API',
    },
    mapsEmbedSrc: '⚠️ DEVELOPER: build once Phoenix placeId is confirmed',
    reviewUrl: '⚠️ DEVELOPER: build once Phoenix placeId is confirmed',
    hours: [
      // ⚠️ CLIENT INPUT: Phoenix hours (may differ from Tucson)
    ],
    serviceAreas: [
      // ⚠️ CLIENT INPUT: Phoenix neighborhoods and zip codes served
    ],
  },
};
