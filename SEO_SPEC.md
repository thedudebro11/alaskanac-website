# SEO_SPEC.md
## Alaskan Air Conditioning & Heating — New Site Build
**Version:** 1.0 | **Date:** 2026-05-05
**Source:** blueprint.md, report.json (GBP data, Lighthouse scores, schema audit)

> This document is the single source of truth for all on-page SEO implementation.
> Every schema block, meta tag, and technical SEO requirement is specified here
> with exact values — not templates requiring research. Copy these blocks directly.
>
> Cross-references:
> - Page routes and canonical URLs → SITE_ARCHITECTURE.md §1, §4
> - Copy used in meta descriptions → CONTENT_SPEC.md §3
> - Performance implementation → TECHNICAL_SPEC.md §4

---

## CRITICAL: TWO-NUMBER RULE (applies to ALL schema on this site)

The business runs two phone numbers with separate purposes. Getting this wrong
causes GBP mismatch warnings in Search Console.

| Number | Format | Use in schema |
|---|---|---|
| `(520) 815-5555` | GBP-matched local | `"telephone"` in ALL Tucson HVACBusiness schema |
| `(602) [GBP phone]` | GBP-matched local | `"telephone"` in ALL Phoenix HVACBusiness schema |
| `844-364-5800` | Tracking/display | **NEVER use in schema** — display only |

> ⚠️ **CLIENT INPUT NEEDED:** Phoenix GBP canonical phone number. Crawl found
> `(602) 783-8111` and `(602) 529-5555` on the Phoenix page. Confirm which matches
> the Phoenix Google Business Profile listing exactly. Use only that number in Phoenix schema.

---

## 1. JSON-LD SCHEMA BLOCKS

### 1.1 Homepage (`/`) — HVACBusiness + WebSite

Add both blocks to `<head>` as separate `<script type="application/ld+json">` tags.

**Block A — HVACBusiness (Primary Entity)**
```json
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": "https://www.alaskanac.com/#business",
  "name": "Alaskan Air Conditioning & Heating Tucson",
  "alternateName": "Alaskan AC",
  "url": "https://www.alaskanac.com/",
  "telephone": "(520) 815-5555",
  "foundingDate": "1972",
  "description": "Expert HVAC and air conditioning services in Tucson and Phoenix, AZ. Serving Arizona since 1972. NATE-certified technicians, Trane Comfort Specialist, Google Guaranteed.",
  "hasCredential": [
    "NATE Certified",
    "Trane Comfort Specialist",
    "Google Guaranteed",
    "ACCA Member",
    "NARI Member",
    "Energy Star Partner"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2305 N 7th Ave",
    "addressLocality": "Tucson",
    "addressRegion": "AZ",
    "postalCode": "85705",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "⚠️ DEVELOPER: look up via Google Maps for 2305 N 7th Ave Tucson AZ 85705",
    "longitude": "⚠️ DEVELOPER: look up via Google Maps for 2305 N 7th Ave Tucson AZ 85705"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "3639",
    "bestRating": "5",
    "worstRating": "1"
  },
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Check",
  "areaServed": [
    {
      "@type": "City",
      "name": "Tucson",
      "sameAs": "https://en.wikipedia.org/wiki/Tucson,_Arizona"
    },
    {
      "@type": "City",
      "name": "Phoenix",
      "sameAs": "https://en.wikipedia.org/wiki/Phoenix,_Arizona"
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["⚠️ CLIENT INPUT: fill days and times from GBP"],
      "opens": "⚠️ CLIENT INPUT",
      "closes": "⚠️ CLIENT INPUT"
    }
  ],
  "sameAs": [
    "https://www.google.com/maps/place/?q=place_id:ChIJQWnLxGtx1oYR-AKYEEAAdY0"
  ]
}
```

**Block B — WebSite (enables sitelinks search box)**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.alaskanac.com/#website",
  "url": "https://www.alaskanac.com/",
  "name": "Alaskan Air Conditioning & Heating",
  "description": "HVAC and air conditioning services in Tucson and Phoenix, AZ since 1972.",
  "publisher": {
    "@id": "https://www.alaskanac.com/#business"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.alaskanac.com/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

> Note on `reviewCount`: Use `3639` (GBP API — authoritative for schema).
> Use `4,400+` in all marketing copy (CONTENT_SPEC.md §3). See ENGINE_GAPS.md §GAP 3.

---

### 1.2 Tucson Location Page (`/tucson-az/`) — HVACBusiness (Tucson Entity)

This is the location-specific entity. It is NOT the same as the homepage entity.
Use `branchOf` to connect it to the parent business.

```json
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": "https://www.alaskanac.com/tucson-az/#location",
  "name": "Alaskan Air Conditioning & Heating Tucson",
  "url": "https://www.alaskanac.com/tucson-az/",
  "telephone": "(520) 815-5555",
  "branchOf": {
    "@id": "https://www.alaskanac.com/#business"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2305 N 7th Ave",
    "addressLocality": "Tucson",
    "addressRegion": "AZ",
    "postalCode": "85705",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "⚠️ DEVELOPER: get from Google Maps",
    "longitude": "⚠️ DEVELOPER: get from Google Maps"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "3639",
    "bestRating": "5",
    "worstRating": "1"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["⚠️ CLIENT INPUT"],
      "opens": "⚠️ CLIENT INPUT",
      "closes": "⚠️ CLIENT INPUT"
    }
  ],
  "hasMap": "https://www.google.com/maps/place/?q=place_id:ChIJQWnLxGtx1oYR-AKYEEAAdY0",
  "sameAs": [
    "https://www.google.com/maps/place/?q=place_id:ChIJQWnLxGtx1oYR-AKYEEAAdY0"
  ]
}
```

---

### 1.3 Phoenix Location Page (`/phoenix-az/`) — HVACBusiness (Phoenix Entity)

```json
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": "https://www.alaskanac.com/phoenix-az/#location",
  "name": "Alaskan Air Conditioning & Heating Phoenix",
  "url": "https://www.alaskanac.com/phoenix-az/",
  "telephone": "⚠️ CLIENT INPUT: Phoenix GBP phone number",
  "branchOf": {
    "@id": "https://www.alaskanac.com/#business"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "⚠️ CLIENT INPUT: Phoenix street address",
    "addressLocality": "Phoenix",
    "addressRegion": "AZ",
    "postalCode": "⚠️ CLIENT INPUT",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "⚠️ DEVELOPER: get from Phoenix GBP listing",
    "longitude": "⚠️ DEVELOPER: get from Phoenix GBP listing"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["⚠️ CLIENT INPUT: Phoenix hours"],
      "opens": "⚠️ CLIENT INPUT",
      "closes": "⚠️ CLIENT INPUT"
    }
  ],
  "sameAs": [
    "⚠️ DEVELOPER: add Phoenix GBP Maps URL once Place ID is confirmed"
  ]
}
```

---

### 1.4 Service Pages — Service Schema Template

Use this template for all four service pages. Replace bracketed values per page.
Add to `<head>` alongside the sitewide HVACBusiness block.

**Alaskafy Your System (`/alaskafy-your-system/`)**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.alaskanac.com/alaskafy-your-system/#service",
  "name": "Alaskafication — HVAC Maintenance & Tune-Up",
  "alternateName": "Alaskafy Your System",
  "serviceType": "HVAC Maintenance",
  "description": "Alaskan Air Conditioning's proprietary HVAC maintenance service. More thorough than a standard tune-up — your system isn't ready until it's Alaskafied.",
  "provider": {
    "@type": "HVACBusiness",
    "@id": "https://www.alaskanac.com/#business"
  },
  "areaServed": [
    {"@type": "City", "name": "Tucson"},
    {"@type": "City", "name": "Phoenix"}
  ],
  "url": "https://www.alaskanac.com/alaskafy-your-system/"
}
```

**AC Installation (`/ac-installation/`)**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.alaskanac.com/ac-installation/#service",
  "name": "AC Installation & Replacement",
  "serviceType": "Air Conditioning Installation",
  "description": "New AC unit installation and replacement in Tucson and Phoenix, AZ. Free quotes. Trane systems. NATE-certified installation from Alaskan Air Conditioning.",
  "provider": {
    "@type": "HVACBusiness",
    "@id": "https://www.alaskanac.com/#business"
  },
  "areaServed": [
    {"@type": "City", "name": "Tucson"},
    {"@type": "City", "name": "Phoenix"}
  ],
  "offers": {
    "@type": "Offer",
    "description": "Free in-home quote. No-obligation estimate.",
    "priceCurrency": "USD"
  },
  "url": "https://www.alaskanac.com/ac-installation/"
}
```

**Heating & Furnaces (`/heating-and-furnaces/`)**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.alaskanac.com/heating-and-furnaces/#service",
  "name": "Heating & Furnace Service",
  "serviceType": "Heating and Furnace Repair",
  "description": "Furnace repair, heating maintenance, and installation in Tucson and Phoenix, AZ. NATE-certified technicians. Serving Arizona since 1972.",
  "provider": {
    "@type": "HVACBusiness",
    "@id": "https://www.alaskanac.com/#business"
  },
  "areaServed": [
    {"@type": "City", "name": "Tucson"},
    {"@type": "City", "name": "Phoenix"}
  ],
  "url": "https://www.alaskanac.com/heating-and-furnaces/"
}
```

**Indoor Air Quality (`/indoor-air-quality/`)**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.alaskanac.com/indoor-air-quality/#service",
  "name": "Indoor Air Quality Services",
  "serviceType": "Indoor Air Quality",
  "description": "Indoor air quality testing, filtration, and purification in Tucson and Phoenix, AZ. Breathe easier with Alaskan Air Conditioning.",
  "provider": {
    "@type": "HVACBusiness",
    "@id": "https://www.alaskanac.com/#business"
  },
  "areaServed": [
    {"@type": "City", "name": "Tucson"},
    {"@type": "City", "name": "Phoenix"}
  ],
  "url": "https://www.alaskanac.com/indoor-air-quality/"
}
```

---

### 1.5 FAQ Page (`/faq/`) — FAQPage Schema

This block earns featured snippets. Every Q&A must be present. Answers must exactly
match the visible on-page text (Google cross-checks; mismatches cause rich result removal).

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.alaskanac.com/faq/#faqpage",
  "name": "HVAC & Air Conditioning FAQ — Alaskan Air Conditioning Tucson, AZ",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How often should I service my AC in Tucson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once a year, ideally in spring before temperatures climb above 100°F. Tucson's extreme summer heat puts more stress on AC systems than almost anywhere in the country — a system that hasn't been serviced can fail precisely when you need it most. If your system runs year-round, a fall check before the heating season is smart too. An annual Alaskafication covers both modes."
      }
    },
    {
      "@type": "Question",
      "name": "What is an Alaskafication and what does it include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An Alaskafication is Alaskan Air Conditioning's proprietary maintenance service — our version of an AC tune-up, done the right way instead of the cheap way. Unlike a standard 20-minute checkup, an Alaskafication is a thorough inspection, cleaning, and optimization of your entire system. When we're done, your AC is ready for a Tucson summer — not just running, but running efficiently. Call (844) 364-5800 for details on everything included."
      }
    },
    {
      "@type": "Question",
      "name": "What size AC unit do I need for my home in Tucson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AC sizing is calculated based on your home's square footage, ceiling height, insulation quality, window area, and sun exposure. In Tucson's climate, an oversized unit short-cycles, never removes humidity properly, and breaks down sooner. Alaskan performs a proper load calculation (Manual J) before recommending a system size. Call (844) 364-5800 for a free quote."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my air conditioner blowing warm air?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most common causes are low refrigerant (possibly a leak), a dirty air filter blocking airflow, a failing compressor, or a thermostat set incorrectly (check it's set to 'cool,' not 'fan only'). If your filter is clean and thermostat is correct, call (844) 364-5800 — warm air usually means a refrigerant or mechanical issue that needs a technician."
      }
    },
    {
      "@type": "Question",
      "name": "How long does an HVAC system last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A well-maintained central air conditioner in Tucson typically lasts 12–15 years. Heat pumps are similar. Furnaces last 15–20 years. Systems in Tucson work harder than in most climates due to extreme summer heat. Regular Alaskafications extend system life measurably — most of our longest-running customers' systems outlast the average by 3–5 years."
      }
    },
    {
      "@type": "Question",
      "name": "Should I repair or replace my AC unit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The general rule: if the repair cost exceeds 50% of what a new system would cost, or your system is over 12 years old, replacement is usually the smarter investment. A new Trane system also saves money on energy bills — today's units are significantly more efficient than systems from 10+ years ago. Call (844) 364-5800 and we'll tell you honestly which makes more sense for your situation."
      }
    },
    {
      "@type": "Question",
      "name": "What's the best thermostat setting for summer in Tucson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Department of Energy recommends 78°F when you're home and 85°F when you're away. Every degree you raise the setpoint reduces cooling costs by about 3%. For Tucson summers, a programmable or smart thermostat pays for itself in one season. We install and configure smart thermostats as part of new system installations and Alaskafications."
      }
    },
    {
      "@type": "Question",
      "name": "How much does AC installation cost in Tucson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "⚠️ CLIENT INPUT: Replace this with actual price range or: 'The cost depends on system size, efficiency rating, equipment brand, and installation complexity. Alaskan provides free, no-obligation quotes with a full written breakdown before any work begins. Call (844) 364-5800 to schedule your free quote.'"
      }
    }
  ]
}
```

> **Critical implementation note:** The text in `"text"` fields must be verbatim identical
> to the visible on-page answer text. If you edit the on-page copy after launch, update the
> schema JSON at the same time. Drift between schema and visible text causes Google to
> remove the rich result without warning.

---

### 1.6 BreadcrumbList — Templates Per Page Type

Add to `<head>` on every page except the homepage.

**Service page (example: /alaskafy-your-system/)**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.alaskanac.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://www.alaskanac.com/services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Alaskafy Your System",
      "item": "https://www.alaskanac.com/alaskafy-your-system/"
    }
  ]
}
```

**Location page (example: /tucson-az/)**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.alaskanac.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tucson, AZ",
      "item": "https://www.alaskanac.com/tucson-az/"
    }
  ]
}
```

**FAQ / About / Contact (example: /faq/)**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.alaskanac.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "FAQ",
      "item": "https://www.alaskanac.com/faq/"
    }
  ]
}
```

---

### 1.7 Contact Page (`/contact/`) — HVACBusiness with openingHours

The contact page gets a focused HVACBusiness block emphasizing hours and location.

```json
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "@id": "https://www.alaskanac.com/contact/#business-contact",
  "name": "Alaskan Air Conditioning & Heating Tucson",
  "telephone": "(520) 815-5555",
  "url": "https://www.alaskanac.com/contact/",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2305 N 7th Ave",
    "addressLocality": "Tucson",
    "addressRegion": "AZ",
    "postalCode": "85705",
    "addressCountry": "US"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["⚠️ CLIENT INPUT: Mon–Fri days"],
      "opens": "⚠️ CLIENT INPUT: e.g. 08:00",
      "closes": "⚠️ CLIENT INPUT: e.g. 18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["⚠️ CLIENT INPUT: Saturday"],
      "opens": "⚠️ CLIENT INPUT",
      "closes": "⚠️ CLIENT INPUT"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "(844) 364-5800",
    "contactType": "customer service",
    "availableLanguage": "English",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59",
      "description": "24/7 emergency line"
    }
  }
}
```

---

## 2. MULTI-LOCATION SCHEMA STRATEGY

**Decision: Separate HVACBusiness entities connected via `branchOf`**

Rationale:
1. The Tucson and Phoenix locations are separate Google Business Profile listings with
   separate addresses, phone numbers, and review counts. Schema must mirror GBP structure.
2. `branchOf` is the correct schema.org property for this relationship — it tells Google
   these are separate physical locations of the same brand.
3. The current site already uses separate HVACBusiness entities on `/tucson-az/` and
   `/phoenix-az/` — this is working correctly and should be preserved.
4. Do NOT use a single entity with two addresses — that is invalid schema.org syntax.
5. Do NOT use `@type: ["HVACBusiness", "LocalBusiness"]` array types — unnecessary and
   potentially confusing to validators.

**Entity relationship map:**
```
https://www.alaskanac.com/#business
  └── name: "Alaskan Air Conditioning & Heating Tucson"
  └── address: 2305 N 7th Ave, Tucson AZ 85705
  └── telephone: (520) 815-5555
  └── Is referenced by:
        ├── /tucson-az/#location (branchOf)
        ├── /phoenix-az/#location (branchOf — different entity, same brand)
        └── all Service @id blocks (provider)
```

**Entity on homepage vs. location pages:**
- Homepage schema: primary Tucson entity (the GBP-verified location)
- `/tucson-az/` schema: Tucson entity (same data, different `@id` URL fragment for clarity)
- `/phoenix-az/` schema: Phoenix entity (completely different address, phone, Place ID)
- Service pages: reference `"https://www.alaskanac.com/#business"` as provider

---

## 3. META TAG TEMPLATES

### 3.1 Full `<head>` Template (apply to every page)

```html
<!-- Primary Meta -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[PAGE_TITLE]</title>
<meta name="description" content="[PAGE_DESCRIPTION]">
<link rel="canonical" href="https://www.alaskanac.com[PAGE_PATH]/">

<!-- Robots -->
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.alaskanac.com[PAGE_PATH]/">
<meta property="og:title" content="[PAGE_TITLE]">
<meta property="og:description" content="[PAGE_DESCRIPTION]">
<meta property="og:image" content="https://www.alaskanac.com/images/og-default.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Alaskan Air Conditioning & Heating — HVAC Services in Tucson & Phoenix, AZ">
<meta property="og:site_name" content="Alaskan Air Conditioning & Heating">
<meta property="og:locale" content="en_US">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[PAGE_TITLE]">
<meta name="twitter:description" content="[PAGE_DESCRIPTION]">
<meta name="twitter:image" content="https://www.alaskanac.com/images/og-default.jpg">

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<!-- Font Preloads (see TECHNICAL_SPEC.md §4) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- LCP Image Preload (homepage hero only — on other pages, replace with that page's hero image) -->
<link rel="preload" as="image" href="/images/hero-van-team.webp" fetchpriority="high">

<!-- JSON-LD (page-specific — see §1 above) -->
<script type="application/ld+json">{ ... }</script>
```

### 3.2 Per-Page Meta Values

| Page | `<title>` | `<meta name="description">` |
|---|---|---|
| `/` | `HVAC Tucson AZ \| Alaskan Air Conditioning` | `Expert HVAC & air conditioning in Tucson, AZ. 4.7★ rated with 4,400+ reviews. Serving Tucson since 1972. Call (844) 364-5800.` |
| `/services/` | `HVAC & Air Conditioning Services Tucson AZ \| Alaskan` | `Full-service HVAC in Tucson & Phoenix — AC maintenance, installation, heating, and indoor air quality. NATE-certified. Call (844) 364-5800.` |
| `/alaskafy-your-system/` | `Alaskafy Your System \| AC Tune-Up Tucson AZ \| Alaskan` | `Alaskafications are Alaskan's signature AC maintenance service — more thorough than a basic tune-up. Serving Tucson & Phoenix. Call (844) 364-5800.` |
| `/ac-installation/` | `AC Installation Tucson AZ \| Free Quotes \| Alaskan` | `New AC unit installation & replacement in Tucson & Phoenix. Free quotes, Trane systems, NATE-certified install. Call (844) 364-5800.` |
| `/heating-and-furnaces/` | `Heating & Furnace Service Tucson AZ \| Alaskan AC` | `Furnace repair, heating maintenance & installation in Tucson & Phoenix. NATE-certified. Serving Arizona since 1972. Call (844) 364-5800.` |
| `/indoor-air-quality/` | `Indoor Air Quality Services Tucson AZ \| Alaskan AC` | `Indoor air quality testing, filtration & purification in Tucson & Phoenix. Breathe easier with Alaskan Air Conditioning. Call (844) 364-5800.` |
| `/contact/` | `Contact Alaskan Air Conditioning — Tucson, AZ` | `Contact Alaskan Air Conditioning & Heating in Tucson & Phoenix. Call (844) 364-5800 or send a message. We respond within 1 business hour.` |
| `/about/` | `About Alaskan Air Conditioning \| Tucson HVAC Since 1972` | `Alaskan Air Conditioning & Heating has served Tucson & Phoenix since 1972. Meet our team, learn our story, and see why 4,400+ customers trust us.` |
| `/faq/` | `HVAC & AC FAQ \| Alaskan Air Conditioning \| Tucson, AZ` | `Common HVAC questions answered by Alaskan Air Conditioning — serving Tucson & Phoenix since 1972. AC maintenance, installation, cost & more.` |
| `/tucson-az/` | `Alaskan Air Conditioning & Heating \| Tucson, AZ` | `Trusted HVAC company in Tucson, AZ since 1972. AC repair, maintenance & installation. 4.7★ rated. Call (844) 364-5800.` |
| `/phoenix-az/` | `Alaskan Air Conditioning & Heating \| Phoenix, AZ` | `Trusted HVAC company in Phoenix, AZ. AC repair, maintenance & installation. NATE-certified. Serving Phoenix since 1972. Call (844) 364-5800.` |
| `/404` | `Page Not Found \| Alaskan Air Conditioning` | `This page doesn't exist — but we do. Call (844) 364-5800 for HVAC service in Tucson & Phoenix.` |

**Character count validation:**
All titles above are ≤ 60 characters. All descriptions are ≤ 160 characters.
Verify with: `title.length` before deploying any page.

### 3.3 Open Graph Image Specification

One default OG image covers all pages unless a page has a custom hero photo.

```
File: /images/og-default.jpg
Dimensions: 1200 × 630px
Content: Alaskan branded van + logo + "HVAC Tucson & Phoenix, AZ Since 1972"
         + star rating "4.7★" on a blue (#1B6CA8) background
Format: JPEG, 80% quality (target < 150KB)
```

⚠️ **CLIENT INPUT NEEDED:** Branded OG image must be created using the Alaskan
logo and van photo. This is used every time someone shares any page on social media.

---

## 4. IMAGE ALT TEXT PATTERNS

### 4.1 Rules

1. Every `<img>` tag must have a non-empty `alt` attribute (currently 32% are missing)
2. Decorative images (dividers, backgrounds used as `<img>`) use `alt=""`
3. All content images must include: what the image shows + city where relevant
4. Never start alt text with "image of" or "photo of" — Google ignores those words
5. Never use the same alt text on two different images
6. Maximum ~125 characters (screen reader practical limit)

### 4.2 Pattern Table

| Image type | Alt text pattern | Example |
|---|---|---|
| Hero — van + team | `[Company] technicians and service van in [City], AZ` | `Alaskan Air Conditioning technicians and service van in Tucson, AZ` |
| Service technician working | `HVAC technician performing [service] in [City], AZ` | `HVAC technician performing AC maintenance in Tucson, AZ` |
| Team photo | `[Name], [Title] at Alaskan Air Conditioning [City]` | `Mike, Lead HVAC Technician at Alaskan Air Conditioning Tucson` |
| Owner portrait | `[Name], Owner of Alaskan Air Conditioning & Heating` | `John Smith, Owner of Alaskan Air Conditioning & Heating` |
| Certification logo — Trane | `Trane Comfort Specialist certification badge` | (exact) |
| Certification logo — NATE | `NATE Certified HVAC technician badge` | (exact) |
| Certification logo — Google Guaranteed | `Google Guaranteed badge — Alaskan Air Conditioning` | (exact) |
| Certification logo — Energy Star | `Energy Star Partner badge` | (exact) |
| Certification logo — ACCA | `ACCA Air Conditioning Contractors of America member badge` | (exact) |
| AC unit (exterior) | `[Brand] air conditioning unit installation in [City], AZ` | `Trane air conditioning unit installation in Tucson, AZ` |
| Furnace interior | `Gas furnace inspection in [City], AZ home` | `Gas furnace inspection in Phoenix, AZ home` |
| Polar bear mascot (logo) | `Alaskan Air Conditioning & Heating logo — polar bear mascot` | (exact) |
| Map embed (Google Maps) | Do NOT use `<img>` for map. Use `<iframe>` with `title=` attribute | `title="Alaskan Air Conditioning & Heating Tucson location map"` |
| Star rating graphic | `4.7 out of 5 star rating` | (exact) |
| Before/after job | `Before and after AC installation at [City] home — Alaskan Air Conditioning` | |

### 4.3 Filename Conventions

SEO benefit is small but consistent. Use descriptive filenames:

```
hero-alaskan-ac-tucson-van-team.webp
ac-installation-trane-tucson-az.webp
hvac-technician-alaskafy-service-tucson.webp
alaskan-ac-logo.svg
nate-certified-badge.svg
trane-comfort-specialist-badge.svg
```

---

## 5. ROBOTS.TXT

Create `/robots.txt` at the site root. The current site already has one (confirmed in audit)
— carry this forward with the additions below.

```
User-agent: *
Allow: /

# Disallow internal/utility paths (adjust based on final stack)
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-login.php
Disallow: /?s=
Disallow: /search
Disallow: /tag/
Disallow: /page/

# Allow all search bots to index everything else
Disallow:

Sitemap: https://www.alaskanac.com/sitemap.xml
```

> If using Next.js or Astro instead of WordPress, remove the `/wp-*` rules and replace
> with any framework-specific paths that should not be indexed (API routes, etc.).

---

## 6. SITEMAP.XML

### 6.1 Structure

All public pages listed. Priority reflects the page's importance to conversions and
search ranking — not a promise to Google about crawl frequency.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Core pages -->
  <url>
    <loc>https://www.alaskanac.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.alaskanac.com/services/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.alaskanac.com/alaskafy-your-system/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.alaskanac.com/ac-installation/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.alaskanac.com/heating-and-furnaces/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.alaskanac.com/indoor-air-quality/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.alaskanac.com/contact/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.alaskanac.com/about/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.alaskanac.com/faq/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Location pages -->
  <url>
    <loc>https://www.alaskanac.com/tucson-az/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.alaskanac.com/phoenix-az/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

</urlset>
```

> Do NOT include `/404`, `/privacy-policy/` in sitemap — these are low-value or utility pages.
> Do NOT include redirect source URLs (e.g., `/ac-maintenance/`) — only canonical destinations.

### 6.2 Sitemap Submission

After launch:
1. Submit `https://www.alaskanac.com/sitemap.xml` in Google Search Console
2. Submit in Bing Webmaster Tools
3. Re-submit after any page is added or removed

---

## 7. CORE WEB VITALS — TARGETS AND IMPLEMENTATION

### 7.1 Current Baseline vs. Targets

| Metric | Current | Target | Status |
|---|---|---|---|
| Lighthouse Performance | 91 | ≥ 91 | ✅ Must match |
| Lighthouse SEO | 92 | ≥ 92 | ✅ Must match |
| Lighthouse Accessibility | 90 | ≥ 85 | ✅ Must match |
| LCP | 2,761ms | < 2,500ms | ⚠️ 261ms gap |
| CLS | 0.0103 | < 0.1 | ✅ Already passing |
| TBT (proxy for FID/INP) | 0ms | < 200ms | ✅ Excellent |
| FCP | 2,358ms | < 2,000ms | ⚠️ Target improvement |
| Speed Index | 4,406ms | < 3,500ms | ⚠️ Target improvement |

### 7.2 LCP Fix — The Highest Priority Performance Task

LCP is 261ms over target. The LCP element is almost certainly the hero image
(the branded van/team photo in the right panel of the hero section).

**Five-step fix in order of impact:**

**Step 1 — Correct image format and compression (biggest gain)**
```html
<!-- Replace current hero img with this pattern -->
<picture>
  <source
    srcset="/images/hero-van-team-1600.avif 1600w,
            /images/hero-van-team-800.avif 800w"
    type="image/avif">
  <source
    srcset="/images/hero-van-team-1600.webp 1600w,
            /images/hero-van-team-800.webp 800w"
    type="image/webp">
  <img
    src="/images/hero-van-team-1600.jpg"
    srcset="/images/hero-van-team-1600.jpg 1600w,
            /images/hero-van-team-800.jpg 800w"
    sizes="(max-width: 767px) 100vw, 50vw"
    width="800"
    height="600"
    loading="eager"
    fetchpriority="high"
    decoding="async"
    alt="Alaskan Air Conditioning technicians and service van in Tucson, AZ">
</picture>
```
Target file size: AVIF < 80KB, WebP < 120KB at 800px wide.
Use Squoosh (squoosh.app) or sharp (Node.js) for conversion.

**Step 2 — Preload the hero image in `<head>`**
```html
<!-- Add to <head> BEFORE any stylesheets -->
<link
  rel="preload"
  as="image"
  href="/images/hero-van-team-1600.webp"
  imagesrcset="/images/hero-van-team-1600.webp 1600w, /images/hero-van-team-800.webp 800w"
  imagesizes="(max-width: 767px) 100vw, 50vw"
  fetchpriority="high">
```

**Step 3 — Inline critical CSS**
The first 14KB of CSS should be inlined in `<style>` in `<head>`. This eliminates
the render-blocking stylesheet request for above-fold content. Use a tool like
`critical` (npm) to extract it automatically.

**Step 4 — Serve from CDN edge**
Deploy to Cloudflare Pages, Vercel, or Netlify — all serve static assets from
edge nodes within ~20ms of the visitor. The current WordPress host's TTFB is unknown
but likely adds 200–400ms. An edge deployment alone often closes the LCP gap.

**Step 5 — Defer non-critical third-party scripts**
Any analytics, chat widgets, or review widgets must load after the hero paint:
```html
<!-- Google Analytics — defer, not in <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```
The booking widget script must also be deferred — load it only when the BOOK NOW
button is clicked (dynamic import), not at page load. See TECHNICAL_SPEC.md §6.

### 7.3 CLS Prevention (Already Passing — Maintain It)

CLS is 0.0103 — well under 0.1. These rules keep it there:

1. **All images must have `width` and `height` attributes** — prevents layout shift as images load
2. **Fonts loaded with `font-display: swap`** — text renders immediately in fallback font,
   shifts to Lato when loaded. The shift is minimal for Lato (close to system sans-serif).
3. **No content injected above existing content** — do not use JavaScript to prepend elements
   above already-painted content (common source of CLS from cookie banners, alert bars)
4. **Fixed dimensions on ad slots, map embeds, and iframes** — the Google Maps embed wrapper
   must have explicit height (400px) set in CSS, not just aspect-ratio padding hack

### 7.4 Technical SEO Checklist — Per-Page

Apply to every page before launch:

```
□ Exactly one <h1> per page — never zero, never two
□ H1 visible above the fold on desktop AND mobile viewports
□ <title> 50–60 characters
□ <meta name="description"> 140–160 characters
□ <link rel="canonical"> present, points to correct URL with trailing slash
□ All images have non-empty alt attribute
□ All images have explicit width and height attributes
□ Hero/LCP image has loading="eager" fetchpriority="high" — all others loading="lazy"
□ No render-blocking <script> tags in <head> (use async or defer)
□ JSON-LD valid — test at: https://search.google.com/test/rich-results
□ Breadcrumb present on all non-homepage pages (HTML + schema)
□ Internal links use descriptive anchor text (not "click here")
□ No broken internal links (test with Screaming Frog or similar after deploy)
□ Open Graph tags present and og:image is a valid URL (1200×630)
□ Page accessible over HTTPS — no mixed content warnings
□ No <meta name="robots" content="noindex"> on public pages
```

---

## 8. GA4 AND SEARCH CONSOLE SETUP

These are post-build requirements, not build requirements, but must be in place before
traffic analysis begins.

### 8.1 Google Analytics 4

```html
<!-- Global site tag (gtag.js) — add to every page, deferred -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

⚠️ **CLIENT INPUT NEEDED:** GA4 Measurement ID (format: G-XXXXXXXXXX).
If the client does not have GA4 set up, create a new property at analytics.google.com.

**Conversion events to configure in GA4:**
- `generate_lead` — contact form submission
- `phone_call` — click on any `<a href="tel:...">` link
- `booking_click` — click on BOOK NOW / Schedule Now button
- `review_click` — click on "Leave Us a Google Review" link

### 8.2 Google Search Console

1. Verify property for `https://www.alaskanac.com/` (DNS TXT or HTML file method)
2. Submit sitemap: `https://www.alaskanac.com/sitemap.xml`
3. Run URL Inspection on homepage, `/tucson-az/`, `/phoenix-az/` after launch
4. Monitor Core Web Vitals report for 28-day rolling data after launch
5. Monitor Rich Results report for FAQPage and HVACBusiness rich results

⚠️ **CLIENT INPUT NEEDED:** Access to Google Search Console for `www.alaskanac.com`
to submit the new sitemap and verify domain ownership after launch.
