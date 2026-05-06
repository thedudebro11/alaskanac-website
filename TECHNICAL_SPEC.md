# TECHNICAL_SPEC.md
## Alaskan Air Conditioning & Heating — New Site Build
**Version:** 1.0 | **Date:** 2026-05-05
**Source:** blueprint.md, report.json (Lighthouse, design analysis), screenshots

> This document is the single source of truth for all technical implementation decisions.
> A developer reading only this file should be able to scaffold the project, configure
> the pipeline, and make every architectural decision without asking questions.
>
> Cross-references:
> - Component names → DESIGN_SYSTEM.md §5
> - Schema output → SEO_SPEC.md §1
> - Content data shapes → CONTENT_SPEC.md §3
> - Page routes → SITE_ARCHITECTURE.md §1

---

## 1. RECOMMENDED STACK

**Decision: Next.js 14+ (App Router, Static Site Generation) + Vercel**

### Why Next.js over WordPress (current stack)

The current WordPress site scores 91/100 Lighthouse — exceptional for WordPress, likely
achieved with a custom/lightweight theme and disciplined plugin management. Maintaining that
score through a rebuild on WordPress requires constant vigilance against plugin bloat.

Next.js with SSG outputs static HTML at build time — there is no PHP runtime, no database
query per request, no WordPress plugin overhead. Lighthouse 95+ is achievable by default
with the patterns in this spec.

| Factor | WordPress (current) | Next.js SSG |
|---|---|---|
| Lighthouse ceiling | 91 (requires discipline) | 95–100 (baseline) |
| LCP fix | Manual image optimization | `next/image` handles it automatically |
| Schema management | Plugin or manual | TypeScript functions, co-located with data |
| Hosting cost | $10–30/month typical | $0/month (Vercel free tier) |
| Developer tooling | PHP + WP ecosystem | TypeScript + React ecosystem |
| Client content updates | WordPress admin (easy) | Requires code change (mitigated — see §7) |
| AI code generator support | Good | Excellent — best Claude/Cursor output quality |

### Why Next.js over Astro

Astro would produce a marginally faster site (zero JavaScript by default vs. Next.js
hydration overhead). For this site the difference is negligible — both hit the LCP target.
Next.js wins here because:
- Wider developer familiarity
- Better AI code generator output (relevant if building from these specs in Cursor/Claude)
- API routes handle form submission without a separate service
- Larger ecosystem for future features (reviews feed, booking status, etc.)

### Stack Components

| Layer | Choice | Version | Purpose |
|---|---|---|---|
| Framework | Next.js | 14+ (App Router) | Pages, routing, SSG, image optimization |
| Language | TypeScript | 5+ | Type safety for data models |
| Styling | CSS Modules + global CSS | — | Component-scoped styles + design tokens |
| Font | next/font (Google) | built-in | Zero-CLS font loading |
| Images | next/image | built-in | Automatic WebP/AVIF, responsive sizes, lazy load |
| Forms | Next.js API Route | built-in | Server-side form handler |
| Email | Resend | latest | Form submission delivery ($0 for first 3k/month) |
| Deployment | Vercel | — | Edge CDN, preview deployments, free tier |
| DNS / CDN | Cloudflare | free | DNS, DDoS protection, additional caching |
| Analytics | GA4 | — | Traffic and conversion tracking |

---

## 2. FILE AND FOLDER STRUCTURE

```
alaskanac-website/
│
├── app/                              # Next.js App Router — one folder per route
│   ├── layout.tsx                    # Root layout: <html>, <head>, StickyHeader, Footer
│   ├── page.tsx                      # / — Homepage
│   ├── not-found.tsx                 # /404
│   ├── sitemap.ts                    # Auto-generates /sitemap.xml
│   ├── robots.ts                     # Auto-generates /robots.txt
│   │
│   ├── services/page.tsx             # /services/
│   ├── alaskafy-your-system/page.tsx # /alaskafy-your-system/
│   ├── ac-installation/page.tsx      # /ac-installation/
│   ├── heating-and-furnaces/page.tsx # /heating-and-furnaces/
│   ├── indoor-air-quality/page.tsx   # /indoor-air-quality/
│   ├── contact/page.tsx              # /contact/
│   ├── about/page.tsx                # /about/
│   ├── faq/page.tsx                  # /faq/
│   ├── tucson-az/page.tsx            # /tucson-az/
│   ├── phoenix-az/page.tsx           # /phoenix-az/
│   └── api/
│       └── contact/route.ts          # POST /api/contact — form handler
│
├── components/
│   ├── layout/
│   │   ├── StickyHeader.tsx          # Logo, nav, phone, location selector, BOOK NOW
│   │   ├── MobileNav.tsx             # Slide-in panel, < 1024px
│   │   └── Footer.tsx                # NAP blocks, links, copyright
│   │
│   ├── home/
│   │   ├── Hero.tsx                  # H1, sub-headline, CTAs, star rating, van photo
│   │   ├── TrustBar.tsx              # Certification logos strip
│   │   ├── ServicesGrid.tsx          # 4-card service grid
│   │   ├── WhyChooseUs.tsx           # 6 differentiator items
│   │   └── TestimonialBlock.tsx      # Review cards on navy background
│   │
│   └── shared/
│       ├── BookingModal.tsx          # ★ Booking widget wrapper — fixes scroll bug
│       ├── ContactForm.tsx           # Contact form with client-side validation
│       ├── ServiceCard.tsx           # Icon + title + description + link
│       ├── TestimonialCard.tsx       # Star rating + quote + reviewer
│       ├── CTABanner.tsx             # Full-width CTA strip
│       ├── MapEmbed.tsx              # Google Maps iframe wrapper
│       ├── FAQAccordion.tsx          # <details>/<summary> accordion
│       ├── BreadcrumbNav.tsx         # Breadcrumb trail + BreadcrumbList schema
│       ├── ServicePageLayout.tsx     # Shared layout wrapper for all service pages
│       ├── NAP.tsx                   # <address> NAP block component
│       ├── ReviewBadge.tsx           # Inline "4.7★ · 4,400+ reviews" pill
│       ├── PhoneLink.tsx             # <a href="tel:..."> atom with correct format
│       ├── EmergencyBadge.tsx        # "24/7 Emergency Service" pill
│       └── SchemaScript.tsx          # Renders <script type="application/ld+json">
│
├── content/                          # All site data as typed TypeScript objects
│   ├── business.ts                   # Core business data (name, address, phone, etc.)
│   ├── services.ts                   # Service page data (title, meta, sections)
│   ├── locations.ts                  # Location data (NAP, hours, Place IDs, coordinates)
│   ├── faqs.ts                       # FAQ Q&A pairs (used by FAQAccordion + FAQPage schema)
│   └── testimonials.ts               # Review quotes (used by TestimonialBlock)
│
├── lib/
│   ├── schema.ts                     # Functions that generate JSON-LD objects
│   ├── email.ts                      # Resend email helper function
│   ├── metadata.ts                   # generateMetadata helper for all pages
│   └── utils.ts                      # Shared utility functions
│
├── styles/
│   └── globals.css                   # CSS custom properties (all tokens from DESIGN_SYSTEM.md)
│                                     # Base resets, typography, and utility classes
│
├── public/
│   ├── images/
│   │   ├── hero-van-team.webp        # LCP element — must be optimized (< 120KB)
│   │   ├── hero-van-team-800.webp    # Responsive variant
│   │   ├── og-default.jpg            # 1200×630 OG image
│   │   └── certifications/           # Trane, NATE, Google Guaranteed, etc. (SVG preferred)
│   ├── favicon.ico
│   ├── favicon-32x32.png
│   ├── favicon-16x16.png
│   └── apple-touch-icon.png
│
├── next.config.ts                    # Redirects, image domains, headers
├── tsconfig.json
├── package.json
└── .env.local                        # Environment variables (never commit to git)
```

### Why `content/` as a data layer matters

Every piece of dynamic data (FAQs, service descriptions, NAP) lives in typed TypeScript
objects in `content/`. This means:
- The JSON-LD schema (SEO_SPEC.md) and the visible page copy (CONTENT_SPEC.md) are
  generated from the SAME source object — impossible to have schema/content drift
- Updating a phone number means changing one line in `content/business.ts`, not hunting
  through 11 page files
- The content layer becomes a CMS migration target if the client wants one later

---

## 3. KEY CONFIGURATION FILES

### 3.1 `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for maximum performance (no Node.js server needed)
  // Remove this line if you need API routes on Vercel (keep for static export to other hosts)
  // output: 'export',

  images: {
    formats: ['image/avif', 'image/webp'],  // Auto-convert uploaded images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async redirects() {
    return [
      // Existing redirects — preserve all of these (see SITE_ARCHITECTURE.md §4.2)
      {
        source: '/ac-maintenance',
        destination: '/alaskafy-your-system',
        permanent: true,
      },
      {
        source: '/ac-maintenance/',
        destination: '/alaskafy-your-system/',
        permanent: true,
      },
      {
        source: '/new-air-conditioning-system',
        destination: '/ac-installation',
        permanent: true,
      },
      {
        source: '/new-air-conditioning-system/',
        destination: '/ac-installation/',
        permanent: true,
      },
      {
        source: '/air-conditioning-service',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/air-conditioning-service/',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/heating-service',
        destination: '/heating-and-furnaces',
        permanent: true,
      },
      {
        source: '/heating-service/',
        destination: '/heating-and-furnaces/',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Cache static assets aggressively
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // HTML pages — short cache, always revalidate
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### 3.2 `content/business.ts` — Central Business Data Object

```typescript
// Single source of truth for all business data.
// Imported by schema.ts, NAP.tsx, StickyHeader.tsx, Footer.tsx, and all page metadata.

export const BUSINESS = {
  name: 'Alaskan Air Conditioning & Heating Tucson',
  shortName: 'Alaskan Air Conditioning',
  url: 'https://www.alaskanac.com',
  phone: {
    display: '(844) 364-5800',        // Shown in all UI
    href: 'tel:8443645800',           // Used in all tel: links
    tucsonGbp: '(520) 815-5555',      // Tucson schema NAP only — matches GBP
    phoenixGbp: '⚠️ CLIENT INPUT',   // Phoenix schema NAP only — matches Phoenix GBP
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
    mapsEmbedSrc: 'https://www.google.com/maps/embed/v1/place?key=MAPS_API_KEY&q=place_id:ChIJQWnLxGtx1oYR-AKYEEAAdY0',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJQWnLxGtx1oYR-AKYEEAAdY0',
    hours: '⚠️ CLIENT INPUT: { mon: "8:00 AM – 6:00 PM", ... }',
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
    placeId: '⚠️ DEVELOPER: get Phoenix Place ID from GBP',
    mapsEmbedSrc: '⚠️ DEVELOPER: build once Phoenix placeId is known',
    reviewUrl: '⚠️ DEVELOPER: build once Phoenix placeId is known',
    hours: '⚠️ CLIENT INPUT',
  },
  foundingYear: 1972,
  license: 'ROC# 240693',
  certifications: [
    'NATE Certified',
    'Trane Comfort Specialist',
    'Google Guaranteed',
    'ACCA Member',
    'NARI Member',
    'Energy Star Partner',
  ],
  ratings: {
    google: { value: 4.7, count: 3639 },        // GBP API — use in schema
    displayCount: '4,400+',                       // Use in marketing copy
    nearbyNow: '5,400+',
    bbb: '100+',
  },
} as const;
```

### 3.3 `styles/globals.css` — Design Token Layer

```css
/* All tokens from DESIGN_SYSTEM.md §1–3 go here verbatim. */
/* This file is imported once in app/layout.tsx */

:root {
  /* Colors */
  --color-blue:        #1B6CA8;
  --color-blue-dark:   #14558A;
  --color-blue-light:  #EBF4FB;
  --color-orange:      #E8670A;
  --color-orange-dark: #C4540A;
  --color-orange-light:#FEF0E6;
  --color-navy:        #0C1A2E;
  --color-navy-mid:    #162540;
  --color-white:       #FFFFFF;
  --color-gray-100:    #F5F7FA;
  --color-gray-200:    #E8ECF0;
  --color-gray-400:    #9CA3AF;
  --color-gray-600:    #6B7280;
  --color-text:        #1A2233;
  --color-success:     #1A7A3C;
  --color-error:       #C0392B;
  --color-focus:       #1B6CA8;

  /* Spacing */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 20px;  --space-6: 24px;  --space-8: 32px;  --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px; --space-24: 96px;

  /* Border radius */
  --radius-sm: 4px;  --radius-md: 8px;  --radius-lg: 12px;
  --radius-xl: 16px; --radius-full: 9999px;

  /* Typography */
  --font-base: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --text-body-size: 16px;
  --text-body-lh: 1.7;
}

/* Base resets */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body { font-family: var(--font-base); color: var(--color-text); line-height: var(--text-body-lh); }
img, video { max-width: 100%; display: block; }
a { color: var(--color-blue); }
p { font-size: var(--text-body-size); line-height: var(--text-body-lh); }
p + p { margin-top: var(--space-4); }

/* Focus states */
:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 3px; }
:focus:not(:focus-visible) { outline: none; }
```

---

## 4. PERFORMANCE BUDGET

Hard limits. No page may ship that violates these budgets.
Measure with `next build` output + Lighthouse CI.

| Asset | Budget | Measurement |
|---|---|---|
| HTML per page (gzipped) | < 30KB | `next build` output |
| Critical CSS (inlined) | < 14KB | Extracted by `next build` |
| Total CSS (gzipped) | < 40KB | Network tab |
| JavaScript — initial load (gzipped) | < 60KB | `next build` JS chunk report |
| Hero image (WebP at 800px) | < 120KB | File size |
| Hero image (AVIF at 800px) | < 80KB | File size |
| OG image | < 150KB | File size |
| Certification logos (SVG each) | < 8KB | File size |
| Total above-fold resources | < 300KB | Lighthouse |
| Third-party scripts at initial paint | 0 | Lighthouse blocking resources |
| Lighthouse Performance | ≥ 91 | Lighthouse CI |
| LCP | < 2,500ms | Lighthouse / CrUX |
| CLS | < 0.1 | Lighthouse / CrUX |
| TBT | < 100ms | Lighthouse |

### Font Loading Strategy

Use `next/font/google` — it downloads fonts at build time, self-hosts them on Vercel's
CDN, and generates `font-display: swap` automatically. No Google Fonts network request
at runtime. Zero CLS from font swap (Lato is close to system sans-serif).

```typescript
// app/layout.tsx
import { Lato } from 'next/font/google';

const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',        // Text visible immediately in fallback font
  variable: '--font-lato', // Exposes as CSS custom property
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.variable}>
      <body>{children}</body>
    </html>
  );
}
```

Then in `globals.css`:
```css
:root {
  --font-base: var(--font-lato), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Hero Image Strategy (LCP Fix)

The hero image is the LCP element. Use `next/image` with `priority` prop:

```tsx
// components/home/Hero.tsx
import Image from 'next/image';
import heroImage from '@/public/images/hero-van-team.webp';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>HVAC Tucson AZ — Alaskan Air Conditioning</h1>
        {/* ... */}
      </div>
      <div className={styles.heroImage}>
        <Image
          src={heroImage}
          alt="Alaskan Air Conditioning technicians and service van in Tucson, AZ"
          priority          // ← Generates <link rel="preload"> in <head> automatically
          quality={85}
          sizes="(max-width: 767px) 100vw, 50vw"
          placeholder="blur" // ← Shows blurred preview while loading (prevents CLS)
        />
      </div>
    </section>
  );
}
```

`priority` on `next/image` does three things automatically:
1. Adds `<link rel="preload">` to `<head>`
2. Sets `fetchpriority="high"` on the `<img>` element
3. Disables lazy loading

Do NOT also add a manual `<link rel="preload">` for the same image — it will duplicate.

---

## 5. FORM HANDLING

### 5.1 Architecture

**Contact form → Next.js API route → Resend → client's email inbox**

No third-party form service. No Netlify Forms (locked to Netlify hosting). No Formspree
subscription. The API route lives in the same repository and costs nothing to run on Vercel.

### 5.2 API Route — `app/api/contact/route.ts`

```typescript
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  phone: string;
  service: string;
  location: string;
  message?: string;
  _honeypot?: string; // Anti-spam hidden field — must be empty
}

export async function POST(req: NextRequest) {
  const body: ContactFormData = await req.json();

  // Anti-spam: reject if honeypot field is filled (bots fill all fields)
  if (body._honeypot) {
    return NextResponse.json({ success: true }); // Fake success — don't tell bot it failed
  }

  // Server-side validation (do not trust client-side validation alone)
  if (!body.name?.trim() || !body.phone?.trim() || !body.service) {
    return NextResponse.json(
      { error: 'Name, phone, and service are required.' },
      { status: 400 }
    );
  }

  // Basic phone format validation (must contain 10+ digits)
  const digitsOnly = body.phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return NextResponse.json(
      { error: 'Please enter a valid phone number.' },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: 'website@alaskanac.com',           // Must be a verified Resend domain
      to: process.env.CONTACT_EMAIL!,          // Set in Vercel env vars
      replyTo: `${body.name} <${body.phone}>`, // Makes reply-to the lead's info
      subject: `New Lead — ${body.service} — ${body.location} — ${body.name}`,
      html: `
        <h2 style="color:#1B6CA8">New Contact Form Submission</h2>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${body.name}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${body.phone}</td></tr>
          <tr><td><strong>Service</strong></td><td>${body.service}</td></tr>
          <tr><td><strong>Location</strong></td><td>${body.location}</td></tr>
          <tr><td><strong>Message</strong></td><td>${body.message || 'None provided'}</td></tr>
        </table>
        <p style="color:#6B7280;font-size:12px;margin-top:16px">
          Submitted from alaskanac.com contact form
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form email failed:', err);
    return NextResponse.json(
      { error: 'Message could not be sent. Please call (844) 364-5800.' },
      { status: 500 }
    );
  }
}
```

### 5.3 Environment Variables

```bash
# .env.local (never commit — add to Vercel dashboard)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=office@alaskanac.com     # ⚠️ CLIENT INPUT: where form leads go
MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXX # Google Maps Embed API key
```

⚠️ **CLIENT INPUT NEEDED:**
- Email address where contact form submissions should be sent
- Google Maps Embed API key (free tier, restricted to this domain)

### 5.4 ContactForm Component — Client-Side

```tsx
// components/shared/ContactForm.tsx
'use client';
import { useState } from 'react';
import styles from './ContactForm.module.css';

const SERVICE_OPTIONS = [
  'AC Maintenance / Alaskafication',
  'AC Installation or Replacement',
  'AC Repair',
  'Heating & Furnace Service',
  'Indoor Air Quality',
  'Emergency Service',
  'Other',
];

export function ContactForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    if (!data.get('name')) errs.name = 'Name is required';
    if (!data.get('phone')) errs.phone = 'Phone number is required';
    if (!data.get('service')) errs.service = 'Please select a service';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('sending');
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json();
        setStatus('error');
        setErrors({ form: data.error || 'Something went wrong.' });
      }
    } catch {
      setStatus('error');
      setErrors({ form: 'Could not reach the server. Please call (844) 364-5800.' });
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success} role="alert">
        <h3>Message received — thank you!</h3>
        <p>
          We'll call you back within 1 business hour during business hours.
          For emergencies, call <a href="tel:8443645800">(844) 364-5800</a> — we answer 24/7.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Honeypot field — hidden from humans, attracts bots */}
      <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} />

      <div className={styles.field}>
        <label htmlFor="name">Your Name *</label>
        <input id="name" name="name" type="text" autoComplete="name"
               aria-describedby={errors.name ? 'name-error' : undefined} />
        {errors.name && <span id="name-error" className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">Phone Number *</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel"
               placeholder="(555) 555-5555" />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="service">Service Needed *</label>
        <select id="service" name="service">
          <option value="">Select a service…</option>
          {SERVICE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.service && <span className={styles.error}>{errors.service}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="location">Your Location</label>
        <select id="location" name="location">
          <option value="Tucson">Tucson, AZ</option>
          <option value="Phoenix">Phoenix, AZ</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message <span>(optional)</span></label>
        <textarea id="message" name="message" rows={4}
          placeholder="Tell us what's going on — the more detail, the better" />
      </div>

      {errors.form && <p className={styles.error} role="alert">{errors.form}</p>}

      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message — We\'ll Call You Back'}
      </button>
    </form>
  );
}
```

---

## 6. BOOKING WIDGET INTEGRATION — SCROLL-TO-TOP BUG FIX

### 6.1 Root Cause

The "Schedule Now (Tucson/Phoenix)" CTAs trigger a third-party booking widget. On desktop,
clicking these buttons causes the page to scroll to the top — a known UX-breaking behavior
that loses the user's context.

**Root cause:** The booking widget script calls `window.scrollTo(0, 0)` during
initialization to bring its injected element into the viewport. This happens regardless
of where on the page the button is clicked.

### 6.2 The Fix — `BookingModal.tsx`

The solution has two parts:
1. Render the widget inside a `<dialog>` (native HTML modal) which is `position: fixed`
   and creates its own stacking context
2. Temporarily override `window.scrollTo` during widget initialization so the script's
   scroll call is a no-op

```tsx
// components/shared/BookingModal.tsx
'use client';
import { useRef, useCallback } from 'react';
import styles from './BookingModal.module.css';

interface Props {
  location: 'Tucson' | 'Phoenix';
  label?: string;
  className?: string;
}

export function BookingModal({ location, label, className }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const widgetLoadedRef = useRef(false);

  const suppressScrollDuringInit = useCallback((fn: () => void) => {
    // Temporarily replace window.scrollTo with a no-op
    // This prevents the booking widget from scrolling the page on init
    const originalScrollTo = window.scrollTo.bind(window);
    (window as unknown as { scrollTo: unknown }).scrollTo = () => {};

    fn();

    // Restore after 2 seconds (enough time for widget to finish initializing)
    setTimeout(() => {
      (window as unknown as { scrollTo: unknown }).scrollTo = originalScrollTo;
    }, 2000);
  }, []);

  const openModal = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Prevent background scroll while modal is open
    document.body.style.overflow = 'hidden';

    suppressScrollDuringInit(() => {
      dialog.showModal();

      if (!widgetLoadedRef.current) {
        // ⚠️ CLIENT INPUT NEEDED: Replace with actual booking widget init call
        // Example for ServiceTitan:
        //   window.serviceTitanBooking?.init({ location });
        // Example for Housecall Pro:
        //   window.hcpBooking?.open({ market: location.toLowerCase() });
        // Example for a script tag approach:
        //   const s = document.createElement('script');
        //   s.src = 'https://booking.widget.url/init.js';
        //   s.dataset.location = location;
        //   dialog.querySelector('.widget-container')?.appendChild(s);
        widgetLoadedRef.current = true;
      }
    });
  }, [location, suppressScrollDuringInit]);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
    document.body.style.overflow = '';
  }, []);

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    // Close if user clicks the backdrop (outside the dialog content)
    if (e.target === dialogRef.current) closeModal();
  }, [closeModal]);

  return (
    <>
      <button
        onClick={openModal}
        className={className ?? 'btn-primary btn-primary--large'}
        type="button"
      >
        {label ?? `Schedule Now — ${location}`}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClick={handleBackdropClick}
        aria-label={`Schedule HVAC service in ${location}`}
      >
        <div className={styles.inner}>
          <button
            className={styles.closeBtn}
            onClick={closeModal}
            aria-label="Close booking form"
            type="button"
          >
            ✕
          </button>

          <h2 className={styles.title}>
            Schedule Service — {location}, AZ
          </h2>

          {/* Booking widget renders here */}
          <div className={`widget-container ${styles.widgetContainer}`} />
        </div>
      </dialog>
    </>
  );
}
```

```css
/* components/shared/BookingModal.module.css */
.dialog {
  position: fixed;
  inset: 0;
  width: min(600px, 95vw);
  max-height: 90vh;
  margin: auto;
  padding: 0;
  border: none;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.4);
}

.dialog::backdrop {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
}

.inner {
  overflow-y: auto;
  max-height: 90vh;
  padding: var(--space-8);
}

.closeBtn {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--color-gray-600);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
}

.closeBtn:hover { background: var(--color-gray-200); }

.title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-6);
  padding-right: var(--space-8);
}

.widgetContainer {
  min-height: 400px;  /* Prevents CLS while widget loads */
}
```

⚠️ **CLIENT INPUT NEEDED:** The exact booking widget vendor and initialization API.
The `openModal` function has a placeholder comment showing examples for ServiceTitan,
Housecall Pro, and script-tag approaches. Replace with the actual integration code once
the vendor is confirmed.

### 6.3 Homepage Dual-Location BOOK NOW Pattern

The homepage hero has two booking CTAs (Tucson + Phoenix). Use two `BookingModal` instances:

```tsx
// In Hero.tsx
import { BookingModal } from '@/components/shared/BookingModal';

<div className={styles.ctaRow}>
  <BookingModal location="Tucson" label="Schedule Now — Tucson" />
  <BookingModal location="Phoenix" label="Schedule Now — Phoenix" />
</div>
```

For location-agnostic pages (Services, About, FAQ), the single BOOK NOW button in the
header should open a modal that presents a location choice first:

```tsx
// In StickyHeader.tsx — a simpler modal that just asks Tucson or Phoenix
<button onClick={() => setLocationPickerOpen(true)} className="btn-primary">
  BOOK NOW
</button>
{locationPickerOpen && (
  <div className={styles.locationPicker}>
    <BookingModal location="Tucson" label="Tucson, AZ" />
    <BookingModal location="Phoenix" label="Phoenix, AZ" />
  </div>
)}
```

---

## 7. BUILD AND DEPLOY PIPELINE

### 7.1 Repository Setup

```bash
# Initial setup
git init
git remote add origin https://github.com/[org]/alaskanac-website
git branch -M main
```

Branch strategy:
- `main` — production (auto-deploys to alaskanac.com)
- `staging` — pre-launch review (deploys to staging.alaskanac.com or Vercel preview URL)
- `feature/*` — individual feature branches → PR → staging → main

### 7.2 Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Link project (first time)
vercel link

# Deploy to production
vercel --prod
```

All subsequent pushes to `main` trigger automatic production deployments.
All pull requests get automatic preview URLs (share with client for review).

### 7.3 Environment Variables in Vercel

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

```
RESEND_API_KEY        = re_...          (Production + Preview)
CONTACT_EMAIL         = ⚠️ CLIENT INPUT (Production only)
MAPS_API_KEY          = AIzaSy...       (Production + Preview)
NEXT_PUBLIC_GA4_ID    = G-XXXXXXXX     (Production only)
```

`NEXT_PUBLIC_` prefix makes the variable available client-side.
Variables without that prefix are server-only (safe for API keys).

### 7.4 Pre-launch Checklist (Run Before DNS Cutover)

```
□ All 11 pages load without errors (check browser console)
□ All 301 redirects work (test with curl -I [old-url])
□ Contact form submits and email arrives at CONTACT_EMAIL
□ Booking modal opens and widget loads without scrolling page
□ Google Maps embed loads on homepage and /contact/
□ Lighthouse score ≥ 91 on homepage (run in incognito, throttled)
□ LCP < 2,500ms (Lighthouse)
□ No console errors on any page
□ All images have alt text (run aXe or Lighthouse accessibility audit)
□ Schema validates on all pages (https://search.google.com/test/rich-results)
□ robots.txt accessible at /robots.txt
□ sitemap.xml accessible at /sitemap.xml and contains all 11 pages
□ Canonical tags present on all pages
□ HTTPS enforced (no HTTP version accessible)
□ www redirect working (http://alaskanac.com → https://www.alaskanac.com)
□ GA4 fires on pageview (check Realtime in GA4 dashboard)
□ OG image appears correctly when URL is shared (test: https://opengraph.xyz)
□ 404 page loads for a bad URL (test: /this-does-not-exist)
□ Mobile viewport renders correctly at 375px and 390px widths
□ No horizontal scroll on any page at mobile width
□ Phone number is clickable on mobile (tap → phone dialer opens)
□ Google Search Console: sitemap submitted, no coverage errors
```

---

## 8. HOSTING RECOMMENDATION AND COST

### 8.1 Recommended: Vercel + Cloudflare DNS

| Service | Purpose | Cost |
|---|---|---|
| **Vercel** (Hobby/free tier) | Hosting, CDN, deployments | $0/month |
| **Cloudflare** (free tier) | DNS, DDoS protection, edge caching | $0/month |
| **Resend** (free tier) | Form submission email delivery | $0/month (first 3,000 emails) |
| **Google Maps Embed API** | Maps on homepage + contact | $0/month (free tier sufficient) |
| **Google Analytics 4** | Traffic analytics | $0 |
| **Domain renewal** | alaskanac.com (client already owns) | ~$15/year |
| **Total** | | **~$0/month** |

### 8.2 When to Upgrade

Upgrade to **Vercel Pro ($20/month)** only if:
- Traffic exceeds 100GB bandwidth/month (unlikely for a local HVAC site)
- Client needs a custom staging password for review before launch
- Team needs advanced analytics within Vercel

Upgrade to **Resend paid ($20/month)** only if:
- Contact form submissions exceed 3,000/month (a very successful outcome)

### 8.3 Alternative: Netlify (Equivalent)

If the developer prefers Netlify over Vercel:
- Same free tier, same edge deployment model
- Use `netlify.toml` for redirects instead of `next.config.ts`
- Netlify Forms as alternative to API route + Resend (simpler, but 100 submissions/month free)
- Deploy command: `npm run build`, publish directory: `.next`

---

## 9. TYPESCRIPT DATA MODEL REFERENCE

These interfaces define the shape of data in `content/`. All components must use these types.

```typescript
// lib/types.ts

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
    display: string;   // GBP phone — schema/NAP use only
    href: string;      // tel: link format
  };
  placeId: string;
  coordinates: { lat: string; lng: string };
  mapsEmbedSrc: string;
  reviewUrl: string;
  hours: DayHours[];
}

export interface DayHours {
  days: string[];   // ["Monday", "Tuesday", ...]
  opens: string;    // "08:00"
  closes: string;   // "18:00"
}

export interface ServicePage {
  slug: string;             // e.g. "alaskafy-your-system"
  name: string;             // e.g. "Alaskafy Your System"
  tagline: string;          // Short CTA-ready description
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subHeadline: string;
  keywords: string[];
  iconName: string;         // Heroicon name
  isSignature?: boolean;    // True for Alaskafy — triggers featured badge
}

export interface FAQ {
  question: string;
  answer: string;           // Plain text — used in both visible accordion and JSON-LD
  relatedServiceSlug?: string; // Links to this service page from the FAQ answer
}

export interface Testimonial {
  quote: string;
  reviewerName: string;
  location: 'Tucson' | 'Phoenix';
  stars: 1 | 2 | 3 | 4 | 5;
  source: 'Google' | 'NearbyNow' | 'BBB';
}
```
