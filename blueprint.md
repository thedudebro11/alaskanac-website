# Site Blueprint — Alaskan Air Conditioning & Heating Tucson

**Domain:** www.alaskanac.com | **Type:** HVAC & Air Conditioning | **Scanned:** May 5, 2026
**Current Score:** 80/100 — Solid

> This blueprint captures every weakness, gap, and opportunity found in the current site.
> Use it as a complete brief for rebuilding — paste the AI Build Prompt at the bottom into
> Claude, Cursor, or ChatGPT to generate the new site from scratch.

---

## Why This Site Isn't Ranking
Estimated **3–10 leads lost per month** due to the issues below.

**Key asset:** This business has a **4.7★ Google rating from 4,400+ Google reviews** (plus 5,400+ Nearby Now reviews and 100+ BBB reviews) — exceptional multi-platform social proof. The new site must consolidate and lead with this prominently in the hero.

**1 critical** and **9 medium** issues found across 10 pages.

**Local SEO:** No LocalBusiness structured data found · No physical address detected on homepage · No map embed or directions link found · No Google Maps embed found
**Technical:** Largest Contentful Paint needs improvement (2.8s)
**Conversion:** No contact form found on the site · Hero section does not clearly communicate what the business offers
**Trust:** No About or Team page found · No gallery or portfolio page found
> ⚠️ Note: Trust signals (Trane, Google Guaranteed, NATE, ACCA, NARI, Energy Star badges + "Keeping you chill since 1972") ARE present above the fold on the live site — the engine missed these because they render client-side. The Trust score finding "no visible trust signals" is inaccurate; the real gap is the missing About and gallery pages.

---

## Business Profile
| Field | Value |
|---|---|
| Business Name | Alaskan Air Conditioning & Heating Tucson |
| Industry | HVAC & Air Conditioning |
| Schema Type | HVACBusiness |
| Website | www.alaskanac.com |
| Phone (site/tracking) | **844-364-5800** ← use this everywhere on the new site |
| Phone (GBP/local) | (520) 815-5555 ← GBP listing number, use in schema NAP only |
| Locations | **Tucson, AZ** (primary) · **Phoenix, AZ** (second market) |
| Tucson Address | 2305 N 7th Ave, Tucson, AZ 85705, USA |
| License | ROC# 240693 |
| Founded | **1972** — "Keeping you chill since 1972" (use in trust bar + About page) |
| Certifications | Trane · Google Guaranteed · NATE · ACCA · NARI · Energy Star |
| Brand Concept | **"Alaskafy / Alaskafications"** — their signature branded maintenance service (preserve this language throughout) |
| Google Business Profile | ✓ Verified — Alaskan Air Conditioning & Heating Tucson |
| GBP Rating | **4.7★ (3,639 reviews via GBP API · 4,400+ displayed on site)** |
| Additional Reviews | 5,400+ Nearby Now · 100+ BBB |
| GBP Status | OPERATIONAL |
| Service Pages Found | ac-maintenance, new-air-conditioning-system, alaskafy-your-system, heating-and-furnaces, indoor-air-quality |

---

## Score Breakdown — What's Dragging You Down
| Category | Weight | Score | Label | Top Issues |
|---|---|---|---|---|
| Local SEO | 30% | 50 | Leaking Opportunity | No LocalBusiness structured data found, No physical address detected on homepage |
| Technical | 25% | 96 | Strong | Largest Contentful Paint needs improvement (2.8s) |
| Conversion | 25% | 90 | Strong | No contact form found on the site, Hero section does not clearly communicate what the business offers |
| Content | 10% | 100 | Strong | None |
| Trust | 10% | 80 | Solid | No About or Team page found, No gallery or portfolio page found |

**Overall: 80/100 — Solid**
*Confidence: High — 10 pages crawled, homepage found, key pages found (service, location), Lighthouse completed, and visual analysis completed.*

---

## Page Architecture — What to Build
### Priority 1 — Core Pages
- [x] **/** — Hero, services overview, trust bar, map embed, testimonials *(exists — review against requirements)*
- [x] **/services/** — Master services list linking to sub-pages *(target keyword: "hvac services tucson")* *(exists — review against requirements)*
- [ ] **/contact/** — Contact form, NAP, hours, Google Maps embed *(target keyword: "hvac company tucson az")* *(MISSING — build this)*
- [ ] **/about/** — Team, story, certifications, trust signals *(target keyword: "hvac contractor tucson")* *(MISSING — build this)*

### Priority 2 — Service Sub-Pages *(exist — need content review)*
- [x] **/ac-maintenance/** — AC Maintenance  *(target: "ac tune up tucson")*
- [x] **/new-air-conditioning-system/** — AC Installation & Replacement

### Priority 3 — FAQ Page *(high local SEO value — earns featured snippets)*
- [ ] **/faq/** — Answers to the most common customer questions
  Suggested questions to answer:
  - How often should I service my AC in Tucson?
  - What size AC unit do I need for my home?
  - Why is my air conditioner blowing warm air?
  - How long does an HVAC system last?
  - Should I repair or replace my AC unit?

*Crawled 10 pages. [x] = exists but should be reviewed against requirements below.*

---

## Local SEO Implementation
### NAP Block (paste into every page footer — must match GBP exactly)
> This is a two-location business. Use location-specific NAP blocks, not a single combined block.

**Tucson pages:**
```html
<address class="nap">
  <strong>Alaskan Air Conditioning & Heating Tucson</strong><br>
  2305 N 7th Ave, Tucson, AZ 85705, USA<br>
  <a href="tel:8443645800">844-364-5800</a>
</address>
```

**Phoenix pages:**
```html
<address class="nap">
  <strong>Alaskan Air Conditioning & Heating Phoenix</strong><br>
  Phoenix, AZ<br>
  <a href="tel:8443645800">844-364-5800</a>
</address>
```

### LocalBusiness Schema (add to `<head>` on every page)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "Alaskan Air Conditioning & Heating Tucson",
  "telephone": "(520) 815-5555",
  "url": "https://www.alaskanac.com",
  "foundingDate": "1972",
  "hasCredential": ["NATE Certified", "Google Guaranteed", "Trane Comfort Specialist"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2305 N 7th Ave",
    "addressLocality": "Tucson",
    "addressRegion": "AZ",
    "postalCode": "85705",
    "addressCountry": "US"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.7,
    "reviewCount": 4400
  }
}
</script>
```

### Google Maps Embed (add to Home and Contact pages)
```html
<iframe
  src="https://www.google.com/maps/embed/v1/place?key=YOUR_MAPS_API_KEY&q=place_id:ChIJQWnLxGtx1oYR-AKYEEAAdY0"
  width="100%" height="400" style="border:0;" allowfullscreen loading="lazy"
  title="Alaskan Air Conditioning & Heating Tucson location map">
</iframe>
```
> Replace `YOUR_MAPS_API_KEY` with your Google Maps Embed API key (free tier is sufficient).

### Google Review Link
`https://search.google.com/local/writereview?placeid=ChIJQWnLxGtx1oYR-AKYEEAAdY0`
> Add a "Leave us a Google review" button using this URL on the home page, thank-you pages, and post-service emails.

---

## Design Requirements
**Current design:** Modern (2021+) — score 100/100
**Framework:** WordPress
**Assessment:** The technical implementation is solid — focus on layout and conversion improvements rather than a full rebuild.

### Design Strengths (keep these)
- Mobile viewport configured
- Custom font loaded: **Lato 400/700** — carry this forward as the body font
- Icon library in use — visual hierarchy supported
- CSS custom properties in use — modern, maintainable stylesheet
- WordPress — good plugin ecosystem for SEO
- Polar bear mascot branding — distinctive, memorable, fits the "Alaskan" name

### ★ Preserve the "Alaskafy" Brand Voice
The business uses proprietary branded terminology that must be preserved in the rebuild:
- **"Alaskafy"** / **"Alaskafications"** — their branded tune-up/maintenance service concept
- **"Alaskafy Your System"** — exists as a navigation item and should be a dedicated page
- Hero copy on the live site: *"Alaskafy and Save! — Alaskafications Lower Your Energy Bills and Prevents Breakdowns. Guaranteed!"*
- Do NOT replace this with generic HVAC maintenance language — it's a core differentiator
- The About page and Why Choose Us section should reference this concept by name

### ★ Lead With Social Proof
This business has **4.7 stars from 4,400+ Google reviews** plus 5,400+ Nearby Now reviews — one of the strongest social proof profiles in Tucson HVAC. The current site shows the review counts but buries them. The new site must make them impossible to miss.
- Display "4.7★ · 4,400+ Google Reviews" in the hero or immediately below it
- Stack multi-platform counts: Google · Nearby Now · BBB
- Use the count in CTA copy: "Join 4,400+ satisfied customers — Call 844-364-5800"

### ⚡ Performance Preservation Warning
The current site scores **91/100 on Lighthouse performance** — that is exceptionally fast. A naive rebuild (especially in a heavy WordPress theme or page builder) will destroy this. The new site must match or beat it.
- Use a lightweight theme or build custom HTML/CSS
- Avoid page builders (Elementor, Divi, WPBakery) unless performance is rigorously tested
- Defer all non-critical JS; inline critical CSS
- Target: LCP < 2.5s, CLS < 0.1, FID < 100ms

### Color Palette & Style Direction
**Primary color:** #1B6CA8  (cool blue — air conditioning)
**Accent / CTA color:** #E8670A  (warm orange — heating)
**Backgrounds:** Light gray or white sections; dark navy header and footer
**Style notes:** Split visual palette: blue side for AC/cooling services, orange/warm side for heating. "24/7 Emergency Service" badge in header. Seasonal CTAs (summer AC, winter heating).
**Emergency badge:** Add a "24/7 Emergency Service" badge in the header — this industry expects it.

### Page Layout Requirements

**Above the fold (first viewport — most important):**
- H1 that leads with what you do and where — not the business name
- Phone number clickable in the header at all times
- Primary CTA button (contrasting color, high contrast text)
- Star rating display: "4.7★ rated on Google"

**Home page section order:**
1. Sticky navigation — logo left, phone + CTA right
2. Hero — H1, sub-headline, CTA, phone, star rating
3. Trust bar — **Keeping you chill since 1972** · Licensed & Insured (ROC# 240693) · Trane · Google Guaranteed · NATE · ACCA · Energy Star
4. Services grid — cards with icons linking to service sub-pages
5. Why choose us — **use these actual differentiators:** serving Tucson since 1972 · 4,400+ 5-star reviews · NATE-certified technicians · Trane Comfort Specialist · Google Guaranteed · proprietary "Alaskafy" maintenance system
6. Testimonials — real quotes with star ratings and reviewer name
7. Google Maps embed
8. Footer — full NAP, hours, quick links, copyright, review link

**Typography:**
- 2 fonts maximum: bold display font for headings, clean sans-serif for body
- Body text minimum 16px — never smaller
- Headings: clear hierarchy H1 > H2 > H3, never skip levels

**Avoid:**
- Stock photo overuse (use real photos of the business/team/work whenever possible)
- More than 3 colors in the palette
- Full-width text blocks with no visual breaks
- Any font below 14px anywhere

---

## Content Requirements Per Page
### Home Page (`/`)
- **Primary keyword:** "hvac tucson az"
- **H1 (keyword-first):** "HVAC Tucson Az — Alaskan Air Conditioning"
- **Sub-headline:** "Alaskafications lower your energy bills and prevent breakdowns — 4.7★ rated · Serving Tucson since 1972 · Call 844-364-5800"
- **Meta title (≤60 chars):** "HVAC Tucson AZ | Alaskan Air Conditioning"
- **Meta description:** "Expert HVAC & air conditioning in Tucson. 4.7★ rated (4,400+ reviews). Serving Tucson since 1972. Call 844-364-5800."
- **Target word count:** 800–1,200 words
- **Schema:** LocalBusiness + HVACBusiness
- **Must include:** Hero, services grid, star rating display, testimonials, map, NAP

### Contact Page (`/contact/`)
- **Primary keyword:** "hvac company tucson az"
- **H1:** "Contact Alaskan Air Conditioning — Tucson, AZ"
- **Meta title:** "Contact Us | Alaskan Air Conditioning — Tucson, AZ"
- **Must include:** Contact form (name, phone, service needed, message), NAP, hours, Google Map embed
- **Schema:** LocalBusiness with openingHours

### About Page (`/about/`)
- **H1:** "About Alaskan Air Conditioning — HVAC & Air Conditioning in Tucson, AZ"
- **Meta title:** "About Us | Alaskan Air Conditioning | Tucson HVAC & Air Conditioning"
- **Must include:** Founding story (in business since **1972** — over 50 years), team photos, licenses (ROC# 240693), certifications (NATE, Trane Comfort Specialist, Google Guaranteed, ACCA, NARI, Energy Star), the origin of the "Alaskafy" concept, why you do what you do
- **Target word count:** 400–700 words

### Service Sub-Pages (`/[service-name]/`)
- **H1 pattern (keyword-first):** "[Service Name] in Tucson, AZ | Alaskan Air Conditioning"
  - Example: "AC Repair in Tucson, AZ | Alaskan Air Conditioning"
  - NOT: "Alaskan Air Conditioning & Heating Tucson — AC Repair Services" (brand-first is wasted H1 real estate)
- **Meta title (≤60 chars):** "[Service] Tucson AZ | Alaskan Air Conditioning"
- **Target word count:** 500–900 words per page
- **Structure per page:**
  1. What is this service and who needs it?
  2. Signs you need this service
  3. Our process / what to expect
  4. Why choose Alaskan Air Conditioning
  5. FAQ (3–5 questions)
  6. CTA — phone + contact form link
- **Schema:** Service schema with "provider" linking to HVACBusiness
- **Internal links:** Every service page links to /contact/ and /services/

### FAQ Page (`/faq/`)
- **H1:** "Frequently Asked Questions — Alaskan Air Conditioning Tucson, AZ"
- **Meta title:** "HVAC & Air Conditioning FAQ | Alaskan Air Conditioning | Tucson"
- **Schema:** FAQPage (each Q&A gets Question + Answer schema — earns featured snippets)
- **Suggested questions:
  - How often should I service my AC in Tucson?
  - What size AC unit do I need for my home?
  - Why is my air conditioner blowing warm air?
  - How long does an HVAC system last?
  - Should I repair or replace my AC unit?
  - What's the best thermostat setting for summer in Tucson?
  - How much does AC installation cost in Tucson?


---

## Technical Checklist
### Must Have
- [x] Responsive design (mobile-first)
- [x] SSL certificate (HTTPS)
- [x] robots.txt
- [x] XML sitemap
- [ ] Google Analytics 4
- [ ] Google Search Console verified
- [ ] Core Web Vitals passing (check: pagespeed.web.dev)

### ⚡ Performance Baseline to Match
The current site scores **91/100 Lighthouse performance**. The new build must match or beat this.
| Metric | Current | Target |
|---|---|---|
| Performance | **91** | ≥ 91 |
| SEO | **92** | ≥ 92 |
| Accessibility | **90** | ≥ 85 |
| LCP | 2.8s | < 2.5s |

### Technical Issues to Fix in Rebuild
- [ ] **Largest Contentful Paint needs improvement (2.8s)** — Compress the hero image, use next-gen formats (WebP/AVIF), and preload the LCP image element.
- [ ] **32% of images are missing alt text** — Add descriptive alt text to all images. For local businesses: include the service and location in alt text for hero images (e.g., "roof replacement Austin TX").

### Per-Page Requirements
- [ ] Exactly one H1 per page — never skip, never duplicate
- [ ] Unique meta title (50–60 chars) and meta description (150–160 chars) on every page
- [ ] Alt text on every image — include service + city where relevant
- [ ] No broken internal links
- [ ] width and height attributes on all images (prevents CLS)
- [ ] Lazy load all below-fold images
- [ ] Canonical tag on any paginated or duplicate content
- [ ] Open Graph tags for social sharing
- [ ] Favicon (all sizes: 16, 32, 180px)

---

## Quick Win Checklist
*Do these on the EXISTING site immediately — don't wait for the rebuild.*

### 1. Make it immediately clear who you are and why visitors should stay
**Impact:** Medium | **Effort:** Medium | **Category:** Conversion
Update your homepage hero section to include: a clear headline stating what you do and where, a short sub-heading with your key selling point, a visible phone number or CTA button, and a recognizable photo (your team, your work, or your location).

### 2. Tell Google exactly what kind of business you are and where you operate
**Impact:** High | **Effort:** Medium | **Category:** Local SEO
Add "LocalBusiness" structured data to your homepage. This is a small piece of code (or a plugin setting in WordPress) that gives Google your business name, type, address, phone, and opening hours in a format it can reliably read.

### 3. Add your address, hours, and a map to make your location easy to find
**Impact:** Medium | **Effort:** Low | **Category:** Local SEO
Add your full address and business hours to your homepage and contact page. Embed a Google Map so visitors can get directions with one click. If you serve multiple areas, create a dedicated page for each location.

### 4. Add a contact form so people can reach you any time of day
**Impact:** Medium | **Effort:** Medium | **Category:** Conversion
Add a simple contact form to your contact page and ideally your homepage too. Ask only for the essentials: name, phone or email, and a brief message. Make sure form submissions arrive in an inbox you check regularly.

### 5. Build visible credibility so visitors trust you before they call
**Impact:** Medium | **Effort:** Medium | **Category:** Trust
Add real customer reviews or testimonials to your homepage. Create an About page that introduces your team and story. Add photos of your work, vehicle, or premises. If your site is not yet on HTTPS (the padlock), ask your hosting provider to enable SSL — it is usually free.

### 6. Speed up your website so visitors don't leave before it loads
**Impact:** Medium | **Effort:** High | **Category:** Technical
Work with your web developer or hosting provider to compress images, reduce unnecessary scripts, and enable caching. If you use WordPress or a similar platform, a performance plugin can often fix this quickly.

### 7. Add descriptions to your images so Google and screen readers can understand them
**Impact:** Low | **Effort:** Low | **Category:** Technical
For each image on your site, add a short description (alt text) explaining what the image shows. For example: "Roofing crew replacing shingles on a home in Dallas." Your CMS likely has an alt text field when you upload or edit images.


---

## AI Build Prompt

> **Copy from the line below and paste directly into Claude, Cursor, or ChatGPT.**

---

You are a professional web developer and local SEO specialist. Build a complete,
production-ready local business website. Prioritize local SEO, conversion rate,
page speed, and a modern design that builds trust immediately above the fold.
═══════════════════════════════════════════════
BUSINESS INFORMATION
═══════════════════════════════════════════════
Business Name: Alaskan Air Conditioning & Heating Tucson
Short name to use in headings/CTAs: Alaskan Air Conditioning
Industry: HVAC & Air Conditioning
Schema type: HVACBusiness
Website: www.alaskanac.com
Phone (use on site): 844-364-5800
Phone (GBP/schema NAP only): (520) 815-5555
Locations: Tucson, AZ (primary) · Phoenix, AZ (second market)
Tucson Address: 2305 N 7th Ave, Tucson, AZ 85705, USA
License: ROC# 240693
Founded: 1972 — "Keeping you chill since 1972" (use in hero trust bar and About page)
Certifications: Trane Comfort Specialist · Google Guaranteed · NATE Certified · ACCA · NARI · Energy Star
Brand concept: "Alaskafy / Alaskafications" — proprietary branded maintenance service. Preserve this language throughout. Do NOT replace with generic "tune-up" or "maintenance" copy.
Google Rating: 4.7★ (4,400+ Google reviews · 5,400+ Nearby Now · 100+ BBB) — display prominently in hero
Google Place ID: ChIJQWnLxGtx1oYR-AKYEEAAdY0
⚡ PERFORMANCE WARNING: Current site scores 91/100 Lighthouse. New build must match or beat this. Use lightweight code — no heavy page builders.
═══════════════════════════════════════════════
PAGES TO BUILD
═══════════════════════════════════════════════
1. Home (/)
   H1: "HVAC Tucson AZ — Alaskan Air Conditioning"
   Target keyword: "hvac tucson az"
   Sections: sticky nav, hero with H1+CTA+phone+star rating, trust bar, services grid, why-choose-us, testimonials, map embed, footer NAP
   Hero sub-headline: "Alaskafications lower your energy bills and prevent breakdowns — 4.7★ rated · Serving Tucson since 1972"
2. Services (/services/)
   H1: "HVAC & Air Conditioning Services in Tucson, AZ | Alaskan Air Conditioning"
   Target keyword: "hvac services tucson"
3. Alaskafy Your System (/alaskafy-your-system/)
   H1: "Alaskafy Your HVAC System in Tucson, AZ | Alaskan Air Conditioning"
   Target keyword: "ac tune up tucson" / "hvac maintenance tucson"
   Note: This is their SIGNATURE branded service — treat it as a hero page, not a generic maintenance page
4. Contact (/contact/)
   H1: "Contact Alaskan Air Conditioning — Tucson, AZ"
   Target keyword: "hvac company tucson az"
   Must include: contact form (name, phone, service, message), NAP, hours [INSERT ACTUAL HOURS FROM GBP], Google Maps embed
5. About (/about/)
   H1: "About Alaskan Air Conditioning | HVAC & Air Conditioning in Tucson, AZ"
   Must include: founding story (in business since 1972 — over 50 years serving Tucson), team photos, license ROC# 240693, certifications (NATE, Trane Comfort Specialist, Google Guaranteed, ACCA, NARI, Energy Star), the "Alaskafy" concept origin
6. FAQ (/faq/)
   H1: "Frequently Asked Questions — Alaskan Air Conditioning Tucson, AZ"
   Schema: FAQPage
   Questions to answer:
   - How often should I service my AC in Tucson?
   - What is an Alaskafication and what does it include?
   - What size AC unit do I need for my home?
   - Why is my air conditioner blowing warm air?
   - How long does an HVAC system last?
   - Should I repair or replace my AC unit?
   - What's the best thermostat setting for summer in Tucson?
   - How much does AC installation cost in Tucson?
Existing service pages to recreate with improved content:
  - AC Maintenance (https://alaskanac.com/ac-maintenance/) → redirect or merge into /alaskafy-your-system/ — target keyword: "ac tune up tucson"
  - AC Installation & Replacement (https://alaskanac.com/new-air-conditioning-system/)
  - Heating & Furnaces (https://alaskanac.com/heating-and-furnaces/) — existing page, needs content review
  - Indoor Air Quality (https://alaskanac.com/indoor-air-quality/) — existing page, needs content review
═══════════════════════════════════════════════
LOCAL SEO REQUIREMENTS (NON-NEGOTIABLE)
═══════════════════════════════════════════════
- NAP in footer of EVERY page — location-specific (Tucson vs Phoenix), must match GBP
  Tucson NAP: Alaskan Air Conditioning & Heating Tucson · 2305 N 7th Ave, Tucson, AZ 85705 · 844-364-5800
- HVACBusiness JSON-LD schema in <head> of every page (use (520) 815-5555 in schema to match GBP)
- Single H1 per page — never skip or duplicate
- Unique meta title (≤60 chars, keyword-first) on every page
- Unique meta description (≤160 chars) on every page
- Google Maps embed on home and contact pages
- Review link: https://search.google.com/local/writereview?placeid=ChIJQWnLxGtx1oYR-AKYEEAAdY0
- Business hours on contact page and home footer — [INSERT ACTUAL HOURS FROM GBP]
- All phone numbers as <a href="tel:8443645800">844-364-5800</a>
- Descriptive alt text on every image (include city + service where relevant)
- robots.txt and sitemap.xml
═══════════════════════════════════════════════
DESIGN REQUIREMENTS
═══════════════════════════════════════════════
Current design: Modern (2021+) (score 100/100)
Color palette:
  Primary: #1B6CA8  (cool blue — air conditioning)
  Accent/CTA: #E8670A  (warm orange — heating)
  Backgrounds: Light gray or white sections; dark navy header and footer
Style: Split visual palette: blue side for AC/cooling services, orange/warm side for heating. "24/7 Emergency Service" badge in header. Seasonal CTAs (summer AC, winter heating).
Include "24/7 Emergency Service" badge in the header.
Social proof directive: Display "4.7★ · 4,400+ Google Reviews" in the hero. Stack multi-platform: Google · Nearby Now · BBB. Use in CTA copy: "Join 4,400+ satisfied customers — Call 844-364-5800".
Layout rules:
- Mobile-first, fully responsive
- Sticky header: logo left, phone number + CTA button right
- Hero: H1, sub-headline with key differentiator, CTA button, phone
- Trust bar directly below hero: "Keeping you chill since 1972" · Licensed & Insured ROC# 240693 · NATE Certified · Trane Comfort Specialist · Google Guaranteed · Tucson & Phoenix
- Services grid: icon cards linking to service sub-pages
- Footer: full NAP, hours, quick links, review link
- 2 fonts max (bold display + clean sans-serif body)
- Body text minimum 16px
- AVOID: page builders with heavy JS, table layouts, inline styles, stock photo overuse
═══════════════════════════════════════════════
SEO ISSUES TO FIX (from audit — 80/100 current score)
═══════════════════════════════════════════════
  - [Local SEO] No LocalBusiness structured data found: Add a LocalBusiness JSON-LD block to the homepage. Include: name, address, phone, url, openingHours, and geo coordinates. Use schema.org/LocalBusiness as the base type and a more specific subtype if applicable.
  - [Local SEO] No physical address detected on homepage: Display your full business address in the site footer and on the homepage. Mark it up with LocalBusiness schema for extra credit.
  - [Local SEO] No map embed or directions link found: Embed a Google Maps iframe on the contact page. Also add a "Get Directions" button linked to your Google Maps listing.
  - [Conversion] No contact form found on the site: Add a contact/inquiry form to the contact page and ideally the homepage. Keep it short: name, phone, service needed, preferred callback time.
  - [Conversion] Hero section does not clearly communicate what the business offers: Write an H1 that answers three questions: What do you do? Where do you serve? What should the visitor do? Example: "Expert Roof Repairs in Dallas, TX — Call for a Free Estimate."
  - [Technical] Largest Contentful Paint needs improvement (2.8s): Compress the hero image, use next-gen formats (WebP/AVIF), and preload the LCP image element.
  - [Trust] No About or Team page found: Add an About page that tells your story: how long you've been in business, who your team is, what makes you different, and why you care about the work you do. Include real photos of your team.
  - [Trust] No gallery or portfolio page found: Add a gallery, portfolio, or "Our Work" page with photos of real completed jobs. For each image, add a descriptive alt text (e.g., "roof replacement Austin TX") for SEO benefit.
  - [Trust] Trust signals exist but are not being fully leveraged: The site already shows Trane, Google Guaranteed, NATE, ACCA, Energy Star badges and "Keeping you chill since 1972" — but these render client-side and are not reinforced by schema. Add the certifications to the HVACBusiness JSON-LD and ensure the trust bar is above-the-fold on mobile as well as desktop.
  - [Local SEO] No Google Maps embed found: Add a Google Maps embed to the contact page or homepage using the "Embed a map" option inside Google Maps.
═══════════════════════════════════════════════
TECHNICAL REQUIREMENTS
═══════════════════════════════════════════════
- Valid semantic HTML5 — no div soup
- All images: width + height attributes (prevents layout shift), lazy loading below fold
- ⚡ PERFORMANCE WARNING: Current site scores 91/100 Lighthouse. New build must match or beat this. Use lightweight code — no heavy page builders.
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Minified CSS and JS, no render-blocking resources
- Open Graph and Twitter Card meta tags
- Favicon (16, 32, 180px)
- 404 page
═══════════════════════════════════════════════
DELIVERABLE
═══════════════════════════════════════════════
Build each page as complete HTML with embedded or linked CSS.
For each page, include:
1. Full HTML (<!DOCTYPE html> to </html>)
2. JSON-LD schema in <head>
3. A brief checklist confirming which requirements are implemented
Build order: Home → Services → Contact → About → FAQ → service sub-pages
Pause after each page and wait for confirmation before continuing.