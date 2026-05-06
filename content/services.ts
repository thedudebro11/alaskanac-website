import type { ServicePage } from '@/lib/types';

// Services in display order — Alaskafy first (signature service)
export const SERVICES: ServicePage[] = [
  {
    slug: 'alaskafy-your-system',
    name: 'Alaskafy Your System',
    tagline: 'Our proprietary AC maintenance — more thorough than a basic tune-up.',
    metaTitle: 'Alaskafy Your System | AC Tune-Up Tucson AZ | Alaskan',
    metaDescription:
      "Alaskafications are Alaskan's signature AC maintenance service — more thorough " +
      'than a basic tune-up. Serving Tucson & Phoenix. Call (844) 364-5800.',
    h1: 'Alaskafy Your System — AC Maintenance in Tucson & Phoenix, AZ',
    subHeadline:
      "Your A/C isn't ready for a Tucson summer until it's Alaskafied. " +
      'More thorough than a basic tune-up. Guaranteed.',
    keywords: ['ac tune up tucson', 'hvac maintenance tucson', 'alaskafication hvac tucson'],
    iconName: 'Snowflake',
    isSignature: true,
  },
  {
    slug: 'ac-installation',
    name: 'AC Installation',
    tagline: 'Free quotes on Trane systems, sized right for your home.',
    metaTitle: 'AC Installation Tucson AZ | Free Quotes | Alaskan',
    metaDescription:
      'New AC unit installation & replacement in Tucson & Phoenix. Free quotes, ' +
      'Trane systems, NATE-certified install. Call (844) 364-5800.',
    h1: 'AC Installation & Replacement in Tucson & Phoenix, AZ',
    subHeadline:
      'Free quotes on new Trane systems. Sized right for your home — not oversized. ' +
      'NATE-certified installation from Alaskan Air Conditioning.',
    keywords: ['ac installation tucson az', 'new ac unit tucson', 'air conditioner replacement tucson'],
    iconName: 'Wind',
    isSignature: false,
  },
  {
    slug: 'heating-and-furnaces',
    name: 'Heating & Furnaces',
    tagline: 'Furnace repair, maintenance, and installation in Tucson & Phoenix.',
    metaTitle: 'Heating & Furnace Service Tucson AZ | Alaskan AC',
    metaDescription:
      'Furnace repair, heating maintenance & installation in Tucson & Phoenix. ' +
      'NATE-certified. Serving Arizona since 1972. Call (844) 364-5800.',
    h1: 'Heating & Furnace Service in Tucson & Phoenix, AZ',
    subHeadline:
      'Tucson winters get cold fast. Keep your furnace ready with expert heating ' +
      'service from Alaskan Air Conditioning — trusted since 1972.',
    keywords: ['heating repair tucson az', 'furnace repair tucson', 'hvac heating tucson'],
    iconName: 'Flame',
    isSignature: false,
  },
  {
    slug: 'indoor-air-quality',
    name: 'Indoor Air Quality',
    tagline: 'Test, filter, and improve the air inside your home.',
    metaTitle: 'Indoor Air Quality Services Tucson AZ | Alaskan AC',
    metaDescription:
      'Indoor air quality testing, filtration & purification in Tucson & Phoenix. ' +
      'Breathe easier with Alaskan Air Conditioning. Call (844) 364-5800.',
    h1: 'Indoor Air Quality Services in Tucson & Phoenix, AZ',
    subHeadline:
      "What's in the air you're breathing at home? Alaskan tests, filters, " +
      'and improves indoor air quality for Tucson and Phoenix homeowners.',
    keywords: ['indoor air quality tucson az', 'air purifier tucson', 'hvac air filtration tucson'],
    iconName: 'Leaf',
    isSignature: false,
  },
];
