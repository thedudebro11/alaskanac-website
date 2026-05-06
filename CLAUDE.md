# CLAUDE.md
## Project: Alaskan Air Conditioning & Heating — Website Rebuild Spec
**Directory:** `/mnt/c/Users/oscar/alaskanac website/`
**Site:** www.alaskanac.com | **Type:** Two-location HVAC company | **Market:** Tucson + Phoenix, AZ

---

## WHAT THIS DIRECTORY IS

This is a complete website rebuild specification package for Alaskan Air Conditioning &
Heating. It was produced by analyzing the live site with the Local SEO Engine scanner,
then enriched by Claude into production-ready developer specifications.

The 6 SPEC files are the source of truth for rebuilding the site from scratch.
The source audit files (blueprint.md, report.json) are reference material.
Do not override decisions made in the SPEC files without good reason.

---

## FILE INDEX

| File | What it is | Use it when |
|---|---|---|
| `SITE_ARCHITECTURE.md` | Page inventory, routes, nav structure, redirect table, multi-location routing | Planning pages, URLs, navigation, redirects |
| `DESIGN_SYSTEM.md` | Color tokens, typography scale, all 19 UI components with CSS specs | Building any component or UI element |
| `CONTENT_SPEC.md` | Every page's H1, meta tags, section order, word count, CTA copy, brand voice | Writing or editing any copy on any page |
| `SEO_SPEC.md` | Complete JSON-LD schema blocks, meta templates, robots.txt, sitemap, Core Web Vitals | Any SEO implementation task |
| `TECHNICAL_SPEC.md` | Next.js 14 stack, file structure, form handling, booking widget fix, deploy pipeline | Any code architecture or build decision |
| `DATABASE.md` | Static data strategy, all typed content files, Sanity CMS migration path | Data layer, content files, form submissions |
| `ENGINE_GAPS.md` | 10 scanner failure patterns found in this scan (for Local SEO Engine improvement) | Improving the scanning software |
| `REVIEW_PROMPT.md` | Reusable Claude prompt for enriching any Local SEO Engine scan output | Running a deep cross-reference on any scan |
| `blueprint.md` | Original AI-generated brief from the Local SEO Engine scan | Background reading — spec files supersede this |
| `report.json` | Raw crawl data: Lighthouse scores, GBP API, page data, visual checks | Verifying raw facts; spec files interpret this |

---

## CRITICAL BUSINESS DATA — KNOW THESE BY DEFAULT

### Business Identity
```
Business name:   Alaskan Air Conditioning & Heating Tucson
Short name:      Alaskan Air Conditioning
Website:         https://www.alaskanac.com
Founded:         1972  →  "Keeping you chill since 1972"
License:         ROC# 240693
Locations:       Tucson, AZ (primary) · Phoenix, AZ (second market)
Tucson address:  2305 N 7th Ave, Tucson, AZ 85705, USA
GBP Place ID:    ChIJQWnLxGtx1oYR-AKYEEAAdY0
```

### Phone Numbers — TWO-NUMBER RULE (critical — never mix these up)
```
(844) 364-5800   →  Display everywhere in UI (header, hero, CTAs, footer, body copy)
                    tel: href format: tel:8443645800
                    NEVER put this in JSON-LD schema

(520) 815-5555   →  Tucson HVACBusiness schema/NAP ONLY — matches Tucson GBP listing
                    NEVER display this in the UI

Phoenix GBP phone → ⚠️ CLIENT INPUT NEEDED — Phoenix schema/NAP only when received
```

### Review Counts — TWO-VALUE RULE (critical — never mix these up)
```
3,639   →  JSON-LD aggregateRating.reviewCount (GBP API — authoritative for schema)
4,400+  →  Marketing copy and UI display (what the site currently shows users)

Also: 5,400+ NearbyNow reviews · 100+ BBB reviews (mention in copy, not schema)
```

### Certifications (all must appear in trust bar and schema)
```
NATE Certified · Trane Comfort Specialist · Google Guaranteed ·
ACCA Member · NARI Member · Energy Star Partner
```

### Star Rating
```
4.7★  (GBP API confirmed)
```

---

## THE ALASKAFY RULES — NEVER VIOLATE THESE

This business has a proprietary branded service. These terms are NOT generic HVAC language.
They are proper nouns. Always capitalize them.

| Form | Correct use | Wrong — never write this |
|---|---|---|
| **Alaskafy** (verb) | "We'll Alaskafy your system" | "We'll tune up your system" |
| **Alaskafication** (noun) | "Schedule your Alaskafication" | "Schedule your tune-up" |
| **Alaskafications** (plural) | "Alaskafications lower your energy bills" | "Regular maintenance lowers your bills" |
| **Alaskafied** (past tense) | "Your A/C isn't ready until it's Alaskafied" | "Your A/C isn't ready until it's serviced" |

The brand phrase **"We do it the Alaskan way, not the cheap way"** must never be
genericized. Use it on the Alaskafy service page and About page.

---

## KEY ARCHITECTURAL DECISIONS (already made — don't re-open without reason)

| Decision | What was decided | Where documented |
|---|---|---|
| Stack | Next.js 14 (App Router, SSG) + Vercel | TECHNICAL_SPEC.md §1 |
| Styling | CSS Modules + global CSS custom properties (no Tailwind) | TECHNICAL_SPEC.md §3.3 |
| Fonts | Lato 400/700/900 only via next/font — no second font family | DESIGN_SYSTEM.md §2 |
| Database | None for v1 — static TypeScript content files | DATABASE.md §1 |
| CMS | None for v1 — Sanity migration path documented for later | DATABASE.md §4 |
| Form submissions | Resend API → client email inbox | TECHNICAL_SPEC.md §5 |
| Multi-location routing | Separate URL-based location pages (/tucson-az/, /phoenix-az/) | SITE_ARCHITECTURE.md §5 |
| Schema strategy | Two separate HVACBusiness entities connected via branchOf | SEO_SPEC.md §2 |
| Booking widget fix | `<dialog>` modal + window.scrollTo no-op patch | TECHNICAL_SPEC.md §6 |
| Hosting cost | $0/month (Vercel free + Cloudflare DNS + Resend free) | TECHNICAL_SPEC.md §8 |

---

## PERFORMANCE CONTRACT — MUST NOT REGRESS

The current live site scores 91/100 Lighthouse. Any rebuild must match or beat this.

| Metric | Current | Required target |
|---|---|---|
| Lighthouse Performance | 91 | ≥ 91 |
| Lighthouse SEO | 92 | ≥ 92 |
| LCP | 2,761ms | < 2,500ms |
| CLS | 0.0103 | < 0.1 |
| TBT | 0ms | < 100ms |

The LCP fix is documented in SEO_SPEC.md §7.2 and TECHNICAL_SPEC.md §4.
The primary cause: hero image not optimized. Fix: `next/image` with `priority` prop.

---

## H1 RULES — NEVER VIOLATE THESE

1. **One H1 per page — never zero, never two**
2. **H1 must be visible above the fold** (the current site's H1 is below the fold — this is a known bug to fix)
3. **H1 must be keyword-first, not brand-first**
   - ✅ `"HVAC Tucson AZ — Alaskan Air Conditioning"`
   - ❌ `"Alaskan Air Conditioning & Heating — HVAC Services"`
4. **The visual hero headline IS the H1 tag** — do not create a separate styled div
   alongside a hidden H1 (this is the current site's bug)

---

## COLORS — THREE TOKENS, NEVER DEVIATE

```
--color-blue:    #1B6CA8   Primary brand (AC/cooling, backgrounds, links)
--color-orange:  #E8670A   All CTA buttons, emergency badge, stars
--color-navy:    #0C1A2E   Header (scrolled), footer, dark sections
```

The current site has teal/green on the hero "Schedule Now" buttons. This is a bug.
All CTAs in the rebuild use `--color-orange` (#E8670A) — no exceptions.

---

## PAGES IN THE NEW SITE (11 total)

```
/                         Homepage
/services/                Services hub (NEW)
/alaskafy-your-system/    Signature service — hero treatment
/ac-installation/         AC Installation (was /new-air-conditioning-system/ — redirect exists)
/heating-and-furnaces/    Heating (replaces /heating-service/)
/indoor-air-quality/      Indoor Air Quality
/contact/                 Contact + form + map (NEW)
/about/                   About page (NEW)
/faq/                     FAQ with FAQPage schema (NEW)
/tucson-az/               Tucson location hub (exists — refresh)
/phoenix-az/              Phoenix location hub (exists — refresh)
```

### Redirects to implement
```
/ac-maintenance/             → /alaskafy-your-system/    (301)
/new-air-conditioning-system/ → /ac-installation/         (301 — already exists, keep)
/air-conditioning-service/   → /services/                (301)
/heating-service/            → /heating-and-furnaces/    (301)
```

---

## OUTSTANDING CLIENT INPUT — BLOCKING ITEMS

These cannot be built or launched without client-provided data.

### Blocks build from starting:
- [ ] **Phoenix street address** — needed for Phoenix NAP, schema, footer
- [ ] **Phoenix GBP phone number** — needed for Phoenix schema (must match GBP exactly)
- [ ] **Business hours — Tucson** — needed for schema, contact page, footer
- [ ] **Business hours — Phoenix** — needed for schema, contact page (Phoenix hours detected on site but not extracted in usable format)
- [ ] **Alaskafication service checklist** — the complete list of what's done during service (the entire Alaskafy page is built around this)

### Blocks launch:
- [ ] **SVG logo file** — current site uses image that may not scale; need clean vector
- [ ] **Hero photo (uncompressed)** — van + team original file (minimum 1600px wide)
- [ ] **Team photos** — owner + lead techs (real, not stock)
- [ ] **6–9 real review quotes** — curated from Google/NearbyNow with first name + city
- [ ] **Google Maps API key** — for maps embed on homepage and /contact/
- [ ] **GA4 Measurement ID** — for analytics (format: G-XXXXXXXXXX)
- [ ] **Email address for form submissions** — where contact form leads go

### Nice to have (can launch without):
- [ ] Founding story details (who founded it, why "Alaskan," origin of polar bear)
- [ ] IAQ product/service specifics (brands, model names offered)
- [ ] Tucson + Phoenix service area neighborhood lists
- [ ] AC installation price range or preferred quote-only language

---

## KNOWN BUGS ON CURRENT SITE (to fix in rebuild)

| Bug | Root cause | Fix |
|---|---|---|
| Page scrolls to top when "Schedule Now" is clicked (desktop) | Booking widget calls `window.scrollTo(0,0)` on init | `<dialog>` modal + temporary `window.scrollTo` no-op — see TECHNICAL_SPEC.md §6 |
| H1 is below the fold | Hero headline is a styled div; actual H1 is a separate element further down | Make hero headline the H1 tag — same element |
| No HVACBusiness schema on homepage | Homepage only has Organization + WebSite schema | Add HVACBusiness block to homepage `<head>` — copy from /tucson-az/ and adapt |
| 32% of images missing alt text | No alt attributes on 72 of 227 images | All images get alt text at build time per patterns in SEO_SPEC.md §4 |
| Hero CTA buttons are teal/green | Inconsistent with blue/orange palette | Replace with `--color-orange` ButtonPrimary |
| No contact form anywhere | Site relies solely on booking widget | Add ContactForm component to /contact/ and homepage |
| No address in site footer | NAP block not present in footer HTML | Add both NAP blocks (Tucson + Phoenix) to every page footer as static HTML |

---

## CONTENT DATA FILES — WHERE EVERYTHING LIVES

When this project is built, all business content lives in `content/` TypeScript files.
These are defined in full in DATABASE.md §2.

```
content/business.ts       Core identity data (name, phone numbers, certifications, ratings)
content/locations.ts      Tucson + Phoenix NAP, hours, coordinates, Place IDs
content/services.ts       All 4 service page data objects
content/faqs.ts           All 8 FAQ Q&A pairs (also used verbatim in FAQPage schema)
content/testimonials.ts   Review quote objects (⚠️ all CLIENT INPUT NEEDED)
```

**The golden rule:** If a phone number, address, review count, or service name appears
in more than one place, it comes from `content/business.ts` or `content/locations.ts`.
Never hardcode these values in components or page files.

---

## HOW TO USE THESE SPEC FILES

**Building a new page?**
1. Check SITE_ARCHITECTURE.md §1 for the route and page type
2. Get H1, meta, sections from CONTENT_SPEC.md §3
3. Get schema blocks from SEO_SPEC.md §1
4. Get component specs from DESIGN_SYSTEM.md §5
5. Get data shapes from DATABASE.md §2

**Writing copy?**
1. Read CONTENT_SPEC.md §2 (Alaskafy brand voice) first — every time
2. Check the exact H1, sub-headline, and CTA copy for that page in §3
3. Never substitute generic HVAC language for Alaskafy terminology

**Adding schema?**
1. Copy the relevant block from SEO_SPEC.md §1 — they are complete and copy-paste ready
2. Check the TWO-NUMBER RULE above — schema uses (520) 815-5555, never 844-364-5800
3. Check the TWO-VALUE RULE above — schema uses reviewCount: 3639, never 4400

**Encountering an ENGINE_GAPS or REVIEW_PROMPT question?**
These files are in `/mnt/c/Users/oscar/Local Seo Engine/` — they are about improving
the scanning software, not about this specific site build.

---

## SCAN METADATA (for reference)

```
Scanned:          2026-05-05
Pages crawled:    10
Lighthouse run:   Homepage only
Score confidence: High
Overall score:    80/100 (Local SEO dragging it down — all other categories strong)
Primary gap:      No HVACBusiness schema on homepage + no contact form + no map embed
```
