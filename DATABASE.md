# DATABASE.md
## Alaskan Air Conditioning & Heating — New Site Build
**Version:** 1.0 | **Date:** 2026-05-05
**Source:** TECHNICAL_SPEC.md §2–3, CONTENT_SPEC.md §3, SITE_ARCHITECTURE.md §1

> This document answers the question: what data needs to be stored, where does it live,
> and how does it get there? It covers the initial static approach, the form submission
> pipeline, and the exact migration path for when a database or CMS becomes necessary.
>
> Cross-references:
> - Data file locations → TECHNICAL_SPEC.md §2 (file structure)
> - TypeScript interfaces → TECHNICAL_SPEC.md §9 (data model)
> - Form API route → TECHNICAL_SPEC.md §5 (implementation)
> - Content values → CONTENT_SPEC.md §3 (what goes in each field)

---

## 1. ASSESSMENT — IS A DATABASE NEEDED?

**Verdict for v1: No database required.**

Here is every type of data on this site and where it lives:

| Data type | Source | Storage needed? |
|---|---|---|
| Service page content | `content/services.ts` (static) | ❌ No |
| FAQ questions + answers | `content/faqs.ts` (static) | ❌ No |
| Business NAP, hours, phones | `content/business.ts` (static) | ❌ No |
| Location data (Tucson, Phoenix) | `content/locations.ts` (static) | ❌ No |
| Testimonial quotes | `content/testimonials.ts` (static) | ❌ No |
| Certification badge assets | `/public/images/certifications/` | ❌ No |
| Contact form submissions | Resend → email → client inbox | ⚠️ Email only (see §3) |
| Reviews (Google, NearbyNow) | Third-party widget (NearbyNow, Google) | ❌ No — widget handles it |
| Booking / scheduling | Third-party booking widget | ❌ No — widget handles it |
| Analytics / traffic | GA4 | ❌ No — GA4 handles it |

**Why static data is the right call for v1:**

1. **Content change frequency is very low.** Services, FAQs, and NAP data change
   maybe twice a year. A TypeScript file edit + redeploy takes 2 minutes.
2. **No dynamic user-generated content.** No logins, no user profiles, no comments.
3. **Reviews come from third parties.** NearbyNow and Google own the review data.
   The site embeds their widgets — no storage needed.
4. **Booking is delegated.** The booking widget is a third-party service with its
   own database. The site only triggers the widget — it does not store appointments.
5. **Performance.** Static files served from Vercel's CDN are faster than any
   database query. Adding a database to a static site for content that never changes
   is pure overhead.

**When a database DOES become necessary (future triggers):**
- Client wants to write and publish blog posts without a code deploy (→ add CMS, see §4)
- Client wants to see all form submissions in a dashboard, not just their inbox (→ add Supabase, see §3.3)
- Site needs seasonal promotions that change weekly (→ add CMS, see §4)
- Multiple staff members need to update content independently (→ add CMS, see §4)

None of these apply to v1.

---

## 2. STATIC DATA STRATEGY — COMPLETE CONTENT FILES

These are the production-ready TypeScript files for `content/`. Fill in all
`⚠️ CLIENT INPUT` values before launch. All other values are confirmed from
the audit data (report.json, blueprint.md).

### 2.1 `content/business.ts`

See TECHNICAL_SPEC.md §3.2 for the complete file. Reproduced here for completeness
with the remaining client input items flagged:

```typescript
// This file is the single source of truth for all business identity data.
// It is imported by: lib/schema.ts, components/layout/Footer.tsx,
// components/layout/StickyHeader.tsx, components/shared/NAP.tsx,
// and every page's generateMetadata() function.

export const BUSINESS = {
  name: 'Alaskan Air Conditioning & Heating Tucson',
  shortName: 'Alaskan Air Conditioning',
  url: 'https://www.alaskanac.com',
  foundingYear: 1972,
  license: 'ROC# 240693',

  phone: {
    display: '(844) 364-5800',
    href: 'tel:8443645800',
    tucsonSchema: '(520) 815-5555',       // GBP-matched — schema/NAP only
    phoenixSchema: '⚠️ CLIENT INPUT',     // Phoenix GBP phone — schema/NAP only
  },

  certifications: [
    'NATE Certified',
    'Trane Comfort Specialist',
    'Google Guaranteed',
    'ACCA Member',
    'NARI Member',
    'Energy Star Partner',
  ],

  ratings: {
    schemaValue: 4.7,
    schemaCount: 3639,        // GBP API — authoritative for JSON-LD
    displayCount: '4,400+',   // For marketing copy
    nearbyNow: '5,400+',
    bbb: '100+',
  },
} as const;
```

### 2.2 `content/locations.ts`

```typescript
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
      display: '(520) 815-5555',
      href: 'tel:5208155555',
    },
    placeId: 'ChIJQWnLxGtx1oYR-AKYEEAAdY0',
    coordinates: {
      // Get exact values from: https://maps.googleapis.com/maps/api/geocode/json
      // ?address=2305+N+7th+Ave+Tucson+AZ+85705&key=YOUR_KEY
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
      // Format: { days: ['Monday','Tuesday',...], opens: '08:00', closes: '18:00' }
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
      // If Sunday closed, omit it. If open: add a third entry.
    ],
    serviceAreas: [
      // ⚠️ CLIENT INPUT: Tucson neighborhoods and zip codes served
      // Example: 'Midtown', 'Foothills', 'Marana', 'Sahuarita', ...
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
```

### 2.3 `content/services.ts`

```typescript
import type { ServicePage } from '@/lib/types';

// Services in display order (Alaskafy first — it's the signature service)
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
```

### 2.4 `content/faqs.ts`

```typescript
import type { FAQ } from '@/lib/types';

// These Q&A pairs are used in two places:
// 1. The FAQAccordion component on /faq/ and service page FAQ sections
// 2. The FAQPage JSON-LD schema block (SEO_SPEC.md §1.5)
//
// CRITICAL: The `answer` text must be verbatim identical to what renders on-page.
// Any drift between schema answer and visible answer causes Google to remove the rich result.

export const FAQS: FAQ[] = [
  {
    question: 'How often should I service my AC in Tucson?',
    answer:
      "Once a year, ideally in spring before temperatures climb above 100°F. Tucson's " +
      'extreme summer heat puts more stress on AC systems than almost anywhere in the ' +
      'country — a system that hasn\'t been serviced can fail precisely when you need it ' +
      'most. If your system runs year-round, a fall check before the heating season is ' +
      'smart too. An annual Alaskafication covers both modes.',
    relatedServiceSlug: 'alaskafy-your-system',
  },
  {
    question: 'What is an Alaskafication and what does it include?',
    answer:
      "An Alaskafication is Alaskan Air Conditioning's proprietary maintenance service — " +
      'our version of an AC tune-up, done the right way instead of the cheap way. ' +
      'Unlike a standard 20-minute checkup, an Alaskafication is a thorough inspection, ' +
      'cleaning, and optimization of your entire system. When we\'re done, your AC is ' +
      'ready for a Tucson summer — not just running, but running efficiently. ' +
      'Call (844) 364-5800 for details on everything included.',
    relatedServiceSlug: 'alaskafy-your-system',
  },
  {
    question: 'What size AC unit do I need for my home in Tucson?',
    answer:
      "AC sizing is calculated based on your home's square footage, ceiling height, " +
      'insulation quality, window area, and sun exposure. In Tucson\'s climate, an ' +
      'oversized unit short-cycles, never removes humidity properly, and breaks down ' +
      'sooner. Alaskan performs a proper load calculation (Manual J) before recommending ' +
      'a system size. Call (844) 364-5800 for a free quote.',
    relatedServiceSlug: 'ac-installation',
  },
  {
    question: 'Why is my air conditioner blowing warm air?',
    answer:
      'The most common causes are low refrigerant (possibly a leak), a dirty air filter ' +
      "blocking airflow, a failing compressor, or a thermostat set incorrectly (check " +
      "it's set to 'cool,' not 'fan only'). If your filter is clean and thermostat is " +
      'correct, call (844) 364-5800 — warm air usually means a refrigerant or mechanical ' +
      'issue that needs a technician.',
    relatedServiceSlug: 'alaskafy-your-system',
  },
  {
    question: 'How long does an HVAC system last?',
    answer:
      'A well-maintained central air conditioner in Tucson typically lasts 12–15 years. ' +
      'Heat pumps are similar. Furnaces last 15–20 years. Systems in Tucson work harder ' +
      'than in most climates due to extreme summer heat. Regular Alaskafications extend ' +
      'system life measurably — most of our longest-running customers\' systems outlast ' +
      'the average by 3–5 years.',
    relatedServiceSlug: 'heating-and-furnaces',
  },
  {
    question: 'Should I repair or replace my AC unit?',
    answer:
      'The general rule: if the repair cost exceeds 50% of what a new system would cost, ' +
      'or your system is over 12 years old, replacement is usually the smarter investment. ' +
      'A new Trane system also saves money on energy bills — today\'s units are ' +
      'significantly more efficient than systems from 10+ years ago. Call (844) 364-5800 ' +
      "and we'll tell you honestly which makes more sense for your situation.",
    relatedServiceSlug: 'ac-installation',
  },
  {
    question: "What's the best thermostat setting for summer in Tucson?",
    answer:
      'The Department of Energy recommends 78°F when you\'re home and 85°F when you\'re ' +
      'away. Every degree you raise the setpoint reduces cooling costs by about 3%. For ' +
      'Tucson summers, a programmable or smart thermostat pays for itself in one season. ' +
      'We install and configure smart thermostats as part of new system installations and ' +
      'Alaskafications.',
    relatedServiceSlug: 'alaskafy-your-system',
  },
  {
    question: 'How much does AC installation cost in Tucson?',
    // ⚠️ CLIENT INPUT: Replace the answer text below with actual price range OR keep
    // the call-to-action version. Update the JSON-LD schema in SEO_SPEC.md §1.5 to match.
    answer:
      'The cost depends on system size, efficiency rating, equipment brand, and ' +
      'installation complexity. Alaskan provides free, no-obligation quotes with a full ' +
      'written breakdown before any work begins. Call (844) 364-5800 to schedule your ' +
      'free quote.',
    relatedServiceSlug: 'ac-installation',
  },
];
```

### 2.5 `content/testimonials.ts`

```typescript
import type { Testimonial } from '@/lib/types';

// ⚠️ CLIENT INPUT NEEDED: Replace ALL placeholder entries with real review quotes.
// Pull from Google Reviews (place ID: ChIJQWnLxGtx1oYR-AKYEEAAdY0) or NearbyNow.
// The current site has 29 testimonials — curate the 6 best for the homepage block.
// Prioritize quotes that mention: Alaskafication, tech by name, emergency service,
// years as a customer, or specific comparison to competitor companies.

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: '⚠️ CLIENT INPUT: Real quote here (2–4 sentences)',
    reviewerName: '⚠️ First name only',
    location: 'Tucson',
    stars: 5,
    source: 'Google',
  },
  {
    quote: '⚠️ CLIENT INPUT',
    reviewerName: '⚠️ First name only',
    location: 'Tucson',
    stars: 5,
    source: 'Google',
  },
  {
    quote: '⚠️ CLIENT INPUT',
    reviewerName: '⚠️ First name only',
    location: 'Phoenix',
    stars: 5,
    source: 'Google',
  },
  {
    quote: '⚠️ CLIENT INPUT',
    reviewerName: '⚠️ First name only',
    location: 'Tucson',
    stars: 5,
    source: 'NearbyNow',
  },
  {
    quote: '⚠️ CLIENT INPUT',
    reviewerName: '⚠️ First name only',
    location: 'Tucson',
    stars: 5,
    source: 'Google',
  },
  {
    quote: '⚠️ CLIENT INPUT',
    reviewerName: '⚠️ First name only',
    location: 'Phoenix',
    stars: 5,
    source: 'Google',
  },
];
```

---

## 3. FORM SUBMISSION HANDLING

### 3.1 Current Flow (v1 — Email Only)

```
User submits form
    │
    ▼
POST /api/contact (Next.js API route)
    │
    ├── Server-side validation (required fields, phone format)
    ├── Honeypot check (bot detection)
    │
    ▼
Resend API
    │
    ▼
Client's email inbox (CONTACT_EMAIL env var)
    │
    ▼
Client follows up manually by phone
```

**What is NOT stored:** No copy of the submission is saved anywhere. If the email
bounces, goes to spam, or the client deletes it, the lead is gone permanently.

This is acceptable for v1. It matches how most small HVAC businesses operate — they
check their email and call back. The contact form is a supplement to the phone number,
not a primary lead pipeline.

### 3.2 Known Limitation — No Audit Trail

If submissions are important enough that losing one is costly, add a Supabase log table.
This is a 2-hour addition that costs $0/month on Supabase's free tier.

### 3.3 Optional Upgrade: Supabase Lead Log (Add in v1.1)

Only implement this if the client asks for a submission dashboard or audit trail.

**Supabase table schema:**
```sql
CREATE TABLE contact_submissions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  service     TEXT NOT NULL,
  location    TEXT NOT NULL,     -- 'Tucson' or 'Phoenix'
  message     TEXT,
  status      TEXT DEFAULT 'new' -- 'new', 'contacted', 'booked', 'closed'
);

-- Indexes for dashboard queries
CREATE INDEX idx_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_submissions_status ON contact_submissions(status);
CREATE INDEX idx_submissions_location ON contact_submissions(location);
```

**Updated API route addition** (add after Resend.send succeeds):
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Service role key — server only, never expose client-side
);

// In app/api/contact/route.ts, after successful email send:
await supabase.from('contact_submissions').insert({
  name: body.name,
  phone: body.phone,
  service: body.service,
  location: body.location,
  message: body.message ?? null,
});
// Do NOT let a Supabase failure block the email success response
// Wrap in try/catch and log the error but still return { success: true }
```

**Additional env vars needed:**
```bash
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Cost:** $0/month (Supabase free tier: 500MB database, 50,000 monthly active users).
A local HVAC company will never exceed free tier limits.

### 3.4 Optional Upgrade: CRM Integration (v2+)

When the client wants form submissions in their CRM (e.g., HubSpot, ServiceTitan,
Jobber), add a CRM API call alongside the Resend email:

```typescript
// lib/crm.ts — example for HubSpot
export async function createHubSpotContact(data: ContactFormData) {
  await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        firstname: data.name.split(' ')[0],
        lastname: data.name.split(' ').slice(1).join(' '),
        phone: data.phone,
        hs_lead_status: 'NEW',
        // Custom properties matching form fields:
        service_requested: data.service,
        service_location: data.location,
      },
    }),
  });
}
```

⚠️ Implement only when the client has an active CRM subscription and confirms the
API key. Do not pre-build CRM integrations speculatively.

---

## 4. CMS MIGRATION PATH

### 4.1 When to Add a CMS

Add a headless CMS when ONE of these is true:
- The client wants to publish blog posts or seasonal promotions without a developer
- Content updates are happening more than once a month
- Multiple staff members need to update content independently
- The client has an ongoing retainer and expects regular content changes

Do NOT add a CMS to avoid these triggers:
- "We might want a blog someday" — build it when they actually want it
- "It would be nice for the client to edit things" — the content files are easily edited
  by a developer in 5 minutes; over-engineering for hypothetical client self-service
  adds complexity without immediate benefit

### 4.2 Recommended CMS: Sanity

**Why Sanity:**
- Free tier: 2 users, 5GB assets, 10GB bandwidth — enough for any local business site
- `next-sanity` package integrates with Next.js App Router natively
- The TypeScript interfaces in `lib/types.ts` map 1:1 to Sanity schemas (see §4.3)
- Real-time draft preview works with Next.js draft mode
- Content studio hosted by Sanity (no server needed)
- Portable Text for rich content editing

**Cost:** $0/month on free tier. $15/month (Growth) if > 2 editors needed.

### 4.3 Migration Map — TypeScript Files → Sanity Schemas

The `content/` TypeScript files are already shaped like a CMS. Migration is
replacing the data source, not the data shape. Components don't change.

| `content/` file | Sanity document type | Migration effort |
|---|---|---|
| `business.ts` | `businessSettings` (singleton) | 1 hour |
| `locations.ts` | `location` (2 documents) | 2 hours |
| `services.ts` | `servicePage` (4 documents) | 3 hours |
| `faqs.ts` | `faq` (8 documents) | 1 hour |
| `testimonials.ts` | `testimonial` (6+ documents) | 1 hour |

**Total estimated migration: 8–10 hours of developer time.**

### 4.4 Sanity Schema for `faqs` (Example Migration)

This shows the pattern. All other schemas follow the same approach.

**Current: `content/faqs.ts`**
```typescript
export const FAQS: FAQ[] = [
  {
    question: 'How often should I service my AC in Tucson?',
    answer: '...',
    relatedServiceSlug: 'alaskafy-your-system',
  },
  // ...
];
```

**After migration: `sanity/schemas/faq.ts`**
```typescript
import { defineType, defineField } from 'sanity';

export const faqSchema = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      description: 'Must exactly match what appears on-page (used in JSON-LD schema)',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'relatedService',
      title: 'Related Service Page',
      type: 'reference',
      to: [{ type: 'servicePage' }],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      validation: (R) => R.required().integer().positive(),
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }
  ],
});
```

**After migration: updated `app/faq/page.tsx`**
```typescript
// Before migration (static import):
// import { FAQS } from '@/content/faqs';

// After migration (Sanity query):
import { sanityClient } from '@/lib/sanity';

const FAQS = await sanityClient.fetch(`
  *[_type == "faq"] | order(displayOrder asc) {
    question,
    answer,
    "relatedServiceSlug": relatedService->slug.current
  }
`);

// The FAQAccordion component and FAQPage schema generator
// are completely unchanged — they receive the same data shape.
```

**The key insight:** Because `content/faqs.ts` and the Sanity query return identically
shaped objects (enforced by the `FAQ` TypeScript interface), every component, every
schema generator, and every metadata function that uses FAQ data continues working
without modification after the migration.

### 4.5 Sanity Setup Steps (When Ready)

```bash
# 1. Create Sanity project
npm create sanity@latest -- --project-id YOUR_ID --dataset production

# 2. Install next-sanity in the website project
npm install next-sanity @sanity/image-url

# 3. Configure the client
# lib/sanity.ts
import { createClient } from 'next-sanity';
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // CDN for production reads
});

# 4. Import existing content (one-time migration script)
# Write a script that reads content/*.ts files and creates Sanity documents
# via the Sanity client's mutate() API

# 5. Replace static imports with Sanity queries page by page
# Start with faqs.ts (lowest risk) before migrating services or business data
```

**New env vars for Sanity:**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skXXXX  # Write token for preview — server only
```

---

## 5. DECISIONS SUMMARY

| Question | Answer | When to revisit |
|---|---|---|
| Do we need a database? | No — static TypeScript files | When blog/seasonal content is needed |
| Where does content live? | `content/*.ts` files in the repo | At CMS migration |
| Where do form submissions go? | Resend API → email inbox | When client wants a submission dashboard |
| Should we store form submissions? | No (v1) — optional Supabase log (v1.1) | When client reports missing leads |
| Which CMS when we need one? | Sanity (free tier) | When content change frequency increases |
| How long to migrate to Sanity? | 8–10 developer hours | Schedule after 3–6 months post-launch |
| Does CMS migration require rewriting components? | No — data shape is identical | Never, by design |
| CRM integration? | Not in v1 | When client has active CRM subscription |
