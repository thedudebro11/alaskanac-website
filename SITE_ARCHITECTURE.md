# SITE_ARCHITECTURE.md
## Alaskan Air Conditioning & Heating — New Site Build
**Version:** 1.0 | **Date:** 2026-05-05 | **Source:** audit report.json + blueprint.md + screenshots

> This document is the single source of truth for every URL, navigation element,
> internal link, and redirect decision. Cross-referenced with CONTENT_SPEC.md
> (per-page copy requirements), SEO_SPEC.md (schema + meta per page), and
> TECHNICAL_SPEC.md (routing implementation).

---

## 1. FULL PAGE INVENTORY

### 1.1 Core Pages (P0–P1 — Build First)

| Route | `<title>` (≤60 chars) | Primary Keyword | Page Type | Build Action |
|---|---|---|---|---|
| `/` | HVAC Tucson AZ \| Alaskan Air Conditioning | hvac tucson az | Home | Rebuild |
| `/services/` | HVAC Services Tucson AZ \| Alaskan AC | hvac services tucson | Services Hub | **New** |
| `/contact/` | Contact Alaskan Air Conditioning — Tucson | hvac company tucson az | Contact | **New** |
| `/about/` | About Alaskan Air Conditioning — Tucson HVAC | hvac contractor tucson | About | **New** |
| `/alaskafy-your-system/` | Alaskafy Your System \| AC Tune-Up Tucson AZ | ac tune up tucson | Service (Signature) | Rebuild/Expand |
| `/ac-installation/` | AC Installation Tucson AZ \| Alaskan HVAC | ac installation tucson az | Service | Content Refresh |
| `/tucson-az/` | Alaskan Air Conditioning \| Tucson, AZ | air conditioning tucson az | Location Hub | Content Refresh |
| `/phoenix-az/` | Alaskan Air Conditioning \| Phoenix, AZ | air conditioning phoenix az | Location Hub | Content Refresh |

### 1.2 Priority 2 Pages (Build After Core)

| Route | `<title>` (≤60 chars) | Primary Keyword | Page Type | Build Action |
|---|---|---|---|---|
| `/heating-and-furnaces/` | Heating & Furnace Service Tucson AZ | heating repair tucson | Service | Rebuild (replaces /heating-service/) |
| `/indoor-air-quality/` | Indoor Air Quality Tucson AZ \| Alaskan AC | indoor air quality tucson | Service | Content Refresh |
| `/faq/` | HVAC FAQ \| Alaskan Air Conditioning Tucson | hvac faq tucson az | FAQ | **New** |

### 1.3 Utility Pages (Required)

| Route | `<title>` | Notes |
|---|---|---|
| `/404` | Page Not Found \| Alaskan Air Conditioning | Custom branded 404 with nav + phone CTA |
| `/privacy-policy/` | Privacy Policy \| Alaskan Air Conditioning | Required if using contact form + GA4 |
| `/sitemap.xml` | — | Machine-readable XML sitemap |
| `/robots.txt` | — | Already present on current site — carry forward |

### 1.4 Current Pages NOT Carried Forward

These existing URLs have no strategic value in the new architecture and will be redirected:

| Existing URL | Status | Redirect Decision |
|---|---|---|
| `/ac-maintenance/` | Exists, 647 words | `301 → /alaskafy-your-system/` |
| `/new-air-conditioning-system/` | Already 301-redirects to `/ac-installation/` | Keep existing redirect chain |
| `/air-conditioning-service/` | 386 words, generic, "other" type | `301 → /services/` |
| `/heating-service/` | 400 words, generic, "other" type | `301 → /heating-and-furnaces/` |

---

## 2. NAVIGATION STRUCTURE

### 2.1 Primary Navigation (Desktop — Sticky Header)

```
[LOGO: Alaskan Air Conditioning]    [Services ▼]  [About]  [FAQ]  [Contact]    [Location: Tucson ▼]    [(844) 364-5800]    [BOOK NOW ▶]
```

**Logo:** Links to `/`
**Services dropdown** — megamenu or simple dropdown, triggered on hover + focus:
```
Alaskafy Your System       /alaskafy-your-system/
AC Installation            /ac-installation/
Heating & Furnaces         /heating-and-furnaces/
Indoor Air Quality         /indoor-air-quality/
──────────────────────
All Services →             /services/
```

**About** — direct link to `/about/` (no dropdown; the current site has an "About" dropdown which
  is unnecessary complexity — simplify to a direct link in the rebuild)

**FAQ** — direct link to `/faq/`

**Contact** — direct link to `/contact/`

**Location selector** — dropdown, not a form; selecting a location navigates to that location hub:
```
Tucson, AZ →  /tucson-az/
Phoenix, AZ →  /phoenix-az/
```
> Implementation note: The location selector shown in the service screenshot uses the pattern
> "Location: Tucson AZ ▼". Preserve this exact label format. Current default should be
> Tucson (primary market). Selecting Phoenix navigates to `/phoenix-az/`. This is URL-based
> routing, not client-side state — do NOT implement as a JS-only state switch.

**Phone number** — `<a href="tel:8443645800">` — visible on all breakpoints ≥ 768px. On mobile
  it collapses into the hamburger menu, but a clickable phone icon persists in the header.

**BOOK NOW** — primary CTA button in `#E8670A` (orange). Triggers booking widget (see
  TECHNICAL_SPEC.md §6 for scroll-bug isolation strategy). On Tucson pages, opens Tucson
  booking. On Phoenix pages, opens Phoenix booking. On location-agnostic pages (/services/,
  /about/, etc.), opens a modal with two choices: Schedule Tucson / Schedule Phoenix.

### 2.2 Mobile Navigation (< 768px)

- Hamburger icon (top-right) opens a full-screen slide-in panel from the right
- Panel contains: logo, location selector, all nav links (same structure as desktop), phone
  number as large tap target, BOOK NOW button
- Services accordion (collapsed by default, tap to expand)
- "24/7 Emergency: (844) 364-5800" pinned at bottom of panel
- Close button top-right of panel

### 2.3 Footer Navigation

```
Column 1: Company           Column 2: Services              Column 3: Locations        Column 4: Contact
About                       Alaskafy Your System            Tucson, AZ                 (844) 364-5800
FAQ                         AC Installation                 Phoenix, AZ                [Leave a Google Review]
Privacy Policy              Heating & Furnaces              Service Areas              [Contact Form →]
Sitemap                     Indoor Air Quality
                            All Services
```

**Footer also contains:**
- Tucson NAP block (see §5 below)
- Phoenix NAP block (see §5 below)
- Social proof line: "4.7★ Rated · 4,400+ Google Reviews · Serving AZ Since 1972"
- Copyright: "© [YEAR] Alaskan Air Conditioning & Heating. ROC# 240693. All rights reserved."

---

## 3. INTERNAL LINKING MAP

Rules applied:
1. Every service page links to `/contact/` and `/services/`
2. Every page links to at least one other service page contextually
3. The `/about/` page links to all service pages
4. The `/faq/` page links to the relevant service page for each answer
5. Location pages (/tucson-az/, /phoenix-az/) link to all service pages with
   location-qualified anchor text
6. The homepage links to every P0/P1 page at least once

### Per-Page Outbound Links

**`/` (Homepage)**
- `/services/` — "See all HVAC services"
- `/alaskafy-your-system/` — from services grid + "Alaskafy" brand section
- `/ac-installation/` — from services grid
- `/heating-and-furnaces/` — from services grid
- `/indoor-air-quality/` — from services grid
- `/about/` — from "Why Choose Us" section
- `/contact/` — from hero CTA + footer
- `/faq/` — from footer + optionally a "Have questions?" section
- `/tucson-az/` — from location selector / service area section
- `/phoenix-az/` — from location selector / service area section
- Google Review link — from testimonials section

**`/services/` (Services Hub)**
- `/alaskafy-your-system/` — featured card
- `/ac-installation/` — service card
- `/heating-and-furnaces/` — service card
- `/indoor-air-quality/` — service card
- `/contact/` — "Get a Free Quote" CTA
- `/about/` — "About our NATE-certified team"

**`/alaskafy-your-system/`**
- `/contact/` — 2× (hero CTA + bottom CTA)
- `/services/` — breadcrumb + "Explore all services"
- `/faq/` — "Read our FAQ" (anchor to Alaskafication FAQ item)
- `/ac-installation/` — "Need a new system instead?" contextual link

**`/ac-installation/`**
- `/contact/` — 2× (hero CTA + bottom CTA)
- `/services/` — breadcrumb
- `/alaskafy-your-system/` — "Keep your new system Alaskafied" upsell link
- `/faq/` — "How much does AC installation cost in Tucson?" anchor link

**`/heating-and-furnaces/`**
- `/contact/` — 2× (hero CTA + bottom CTA)
- `/services/` — breadcrumb
- `/indoor-air-quality/` — contextual ("Pair with an air quality solution")
- `/faq/` — "How long does an HVAC system last?" anchor link

**`/indoor-air-quality/`**
- `/contact/` — 2× (hero CTA + bottom CTA)
- `/services/` — breadcrumb
- `/alaskafy-your-system/` — contextual ("Alaskafication includes IAQ inspection")

**`/contact/`**
- `/services/` — "Not sure what you need? See our services"
- `/tucson-az/` — contextual (Tucson map section)
- `/phoenix-az/` — contextual (Phoenix map section)

**`/about/`**
- `/alaskafy-your-system/` — "Learn about our Alaskafication process"
- `/services/` — "Explore our services"
- `/contact/` — CTA
- Google Review link — from "4,400+ Reviews" mention

**`/faq/`**
- Each answer links to the most relevant service page (1 link per Q&A item)
- `/contact/` — "Still have questions? Contact us"
- `/alaskafy-your-system/` — Q: "What is an Alaskafication?"
- `/ac-installation/` — Q: "How much does AC installation cost?"
- `/heating-and-furnaces/` — Q: "How long does an HVAC system last?"

**`/tucson-az/`**
- All service pages with "in Tucson, AZ" anchor text
- `/contact/` — "Contact our Tucson team"
- `/about/` — "About our Tucson HVAC company"
- Service sub-area pages (if created later)

**`/phoenix-az/`**
- All service pages with "in Phoenix, AZ" anchor text
- `/contact/` — "Contact our Phoenix team"
- `/about/` — "About Alaskan Air Conditioning Phoenix"

---

## 4. URL STRUCTURE DECISIONS & REDIRECT STRATEGY

### 4.1 URL Conventions

- All lowercase, hyphen-separated: `/alaskafy-your-system/` not `/AlaskaFy-Your-System/`
- Trailing slash on all page URLs: `/contact/` not `/contact`
- No query strings in canonical URLs (UTM params from GBP URL are fine as they are not
  the canonical)
- No date-based URLs for service pages
- Location in URL only for dedicated location hub pages (`/tucson-az/`, `/phoenix-az/`)
  — service pages (`/ac-installation/`) are NOT location-prefixed; location is handled
  via schema, NAP, and content, not URL nesting

### 4.2 Complete Redirect Table

Implement all of these as server-side 301 redirects in `_redirects` (Netlify) or
`next.config.js` (Next.js) or `.htaccess` (Apache/WordPress). Do NOT use meta refresh.

| Source URL | Target URL | Redirect Type | Reason |
|---|---|---|---|
| `/ac-maintenance/` | `/alaskafy-your-system/` | 301 | Page merged into signature service |
| `/new-air-conditioning-system/` | `/ac-installation/` | 301 | Already exists; document it explicitly |
| `/air-conditioning-service/` | `/services/` | 301 | Generic page → hub |
| `/heating-service/` | `/heating-and-furnaces/` | 301 | Renamed to match keyword target |
| `http://alaskanac.com/*` | `https://www.alaskanac.com/*` | 301 | HTTPS + www canonicalization |
| `http://www.alaskanac.com/*` | `https://www.alaskanac.com/*` | 301 | Force HTTPS |
| `https://alaskanac.com/*` | `https://www.alaskanac.com/*` | 301 | Force www (matches GBP URL) |

> ⚠️ **CLIENT INPUT NEEDED:** Confirm whether `/heating-and-furnaces/` replaces `/heating-service/`
> completely or if `/heating-service/` has significant backlinks worth preserving under its
> current URL. Run ahrefs/Ahrefs backlink check before confirming this redirect.

### 4.3 Canonical Tag Strategy

- Every page carries `<link rel="canonical" href="https://www.alaskanac.com[page-path]/">`
- No self-referencing canonicals are omitted — include them explicitly
- The GBP website URL includes UTM params:
  `https://www.alaskanac.com/?utm_source=google-gbp&utm_medium=organic&utm_campaign=...`
  The canonical on `/` must be `https://www.alaskanac.com/` (no UTM) so Google
  understands the clean URL is authoritative

---

## 5. MULTI-LOCATION HANDLING

### 5.1 Architecture Decision: Separate Location Hub Pages (Recommended)

The current site already uses `/tucson-az/` and `/phoenix-az/` as location hubs and these
pages already have `HVACBusiness` schema with location-specific data. **Preserve this pattern.**

Do NOT change to:
- Subdomain routing (`tucson.alaskanac.com`) — too complex, breaks current link equity
- URL query params (`/?loc=tucson`) — not SEO-friendly
- JavaScript-only location switching — fails crawlers and schema

### 5.2 Location Page Role

| | `/tucson-az/` | `/phoenix-az/` |
|---|---|---|
| Schema | HVACBusiness (Tucson entity) | HVACBusiness (Phoenix entity) |
| NAP | Tucson address + (520) 815-5555 | Phoenix address + Phoenix GBP phone |
| Target keyword | "air conditioning tucson az" | "air conditioning phoenix az" |
| Map embed | Google Maps embed for Tucson | Google Maps embed for Phoenix |
| Content | Tucson service areas, local testimonials | Phoenix service areas, local testimonials |
| CTAs | "Schedule Now — Tucson" | "Schedule Now — Phoenix" |
| Booking widget | Tucson booking flow | Phoenix booking flow |

### 5.3 Location-Agnostic Service Pages

Service pages (`/ac-installation/`, `/alaskafy-your-system/`, etc.) serve BOTH markets.
They should:
- Mention "Tucson and Phoenix, AZ" in content (not URL)
- Link to both `/tucson-az/` and `/phoenix-az/` at the bottom
  ("We serve Tucson and Phoenix — see your local team")
- Use the 844-364-5800 tracking number (not location-specific phones)
- Footer NAP: Tucson NAP block (primary) + Phoenix NAP block (secondary) on all pages

### 5.4 NAP Blocks

These blocks must appear in the footer on EVERY page, exactly as written, to maintain
NAP consistency with GBP listings.

**Tucson NAP (primary):**
```html
<address class="nap nap--tucson">
  <strong>Alaskan Air Conditioning &amp; Heating Tucson</strong><br>
  2305 N 7th Ave, Tucson, AZ 85705, USA<br>
  <a href="tel:8443645800">(844) 364-5800</a>
</address>
```

**Phoenix NAP (secondary):**
```html
<address class="nap nap--phoenix">
  <strong>Alaskan Air Conditioning &amp; Heating Phoenix</strong><br>
  ⚠️ CLIENT INPUT NEEDED: Phoenix street address<br>
  Phoenix, AZ<br>
  <a href="tel:8443645800">(844) 364-5800</a>
</address>
```

> ⚠️ **CLIENT INPUT NEEDED:** Phoenix street address. GBP API only returned "Phoenix, AZ" for
> the Phoenix listing — no street address was found in any crawled data. This must match the
> exact address on the Phoenix Google Business Profile. Request from client before launch.

> ⚠️ **CLIENT INPUT NEEDED:** Business hours for both Tucson and Phoenix locations. The Tucson
> location page does NOT have hours (`hasHours: false` in crawl data). The Phoenix page
> has hours but they were not extracted in a structured format. Required for schema + contact
> page. Format needed: Mon–Fri HH:MM–HH:MM, Sat HH:MM–HH:MM, Sun HH:MM–HH:MM or "Closed".
> Also clarify: does "24/7 Emergency Service" mean the phone is answered 24/7, or only that
> emergency calls are accepted outside normal hours? This distinction matters for the
> `openingHoursSpecification` schema.

### 5.5 Phone Number Strategy

This is a two-number system — do NOT mix them up:

| Number | Format | Use Where |
|---|---|---|
| 844-364-5800 | `<a href="tel:8443645800">` | All UI display (header, hero, CTAs, footer, body copy) |
| (520) 815-5555 | Schema/NAP text only | `HVACBusiness` JSON-LD `telephone` for Tucson entity |
| Phoenix GBP phone | Schema/NAP text only | `HVACBusiness` JSON-LD `telephone` for Phoenix entity |

> ⚠️ **CLIENT INPUT NEEDED:** Phoenix GBP phone number. The crawl found (602) 783-8111 and
> (602) 529-5555 on the Phoenix page. Confirm which is the canonical GBP-listed number for
> the Phoenix location. Use ONLY that number in the Phoenix HVACBusiness schema.

---

## 6. CRAWLED PAGES NOT IN NEW ARCHITECTURE

The following pages were found in the 10-page crawl but have no role in the new site:

| URL | Current Title | Action |
|---|---|---|
| `/air-conditioning-service/` | "Air Conditioning Service \| Phoenix, Tempe, Tucson..." | 301 → `/services/` |
| `/heating-service/` | "Heating Services \| Alaskan Air Conditioning and Heating" | 301 → `/heating-and-furnaces/` |

Both pages have outdated content (< 400 words), no schema beyond BreadcrumbList, and
serve no unique keyword intent not already covered by the new architecture.

---

## 7. BLUEPRINT DISCREPANCIES NOTED

The following are corrections to blueprint.md based on raw report.json data and screenshots:

1. **"No LocalBusiness structured data found"** (blueprint finding): Partially incorrect.
   `/tucson-az/` and `/phoenix-az/` both have `HVACBusiness` schema with `PostalAddress` and
   `ContactPoint`. The **homepage** (`/`) is the actual gap — it only has `Organization` and
   `WebSite` schema. The fix is homepage-specific, not site-wide.

2. **Google review count**: Blueprint states "4,400+ Google Reviews" but GBP API returned
   **3,639 reviews**. The 4,400+ figure displayed on the live site likely aggregates Nearby Now
   reviews (5,400+) or uses a cached/outdated count. Use 3,639 in `aggregateRating.reviewCount`
   in schema; use "4,400+" in marketing copy (consistent with current site).

3. **`/new-air-conditioning-system/` canonical**: Blueprint lists this as the page URL, but
   the crawl shows a 301 redirect to `/ac-installation/` already in place. The canonical in
   the `<head>` is `https://www.alaskanac.com/ac-installation/`. Use `/ac-installation/` as
   the authoritative URL throughout.

4. **Hero H1**: The prominent "Alaskafy and Save!" text visible in the hero screenshot is NOT
   the H1 — it is a styled div or H2. The actual H1 `"Air Conditioning Services in Arizona"`
   is below the fold (confirmed by Lighthouse visual check). This means the page's SEO H1 and
   the visual headline are completely different elements — a common WordPress theme pattern that
   must be corrected in the rebuild.

5. **Hero CTA button colors**: Screenshots show the "Schedule Now (Tucson)" and "Schedule Now
   (Phoenix)" buttons in dark green/teal, not orange. Blueprint specifies only blue + orange
   in the palette. The new design should standardize to orange for primary CTAs and remove
   the green variant.
