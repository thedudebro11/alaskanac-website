# DESIGN_SYSTEM.md
## Alaskan Air Conditioning & Heating — New Site Build
**Version:** 1.0 | **Date:** 2026-05-05
**Source:** blueprint.md, report.json design object, homepage.png + service.png screenshots

> This document specifies every visual token, component, breakpoint, and interaction rule
> needed to implement the new site. A developer reading only this file should be able to build
> any component without asking questions.
>
> Cross-references:
> - Component names → SITE_ARCHITECTURE.md §2–3 (where each component appears)
> - Copy inside components → CONTENT_SPEC.md
> - Schema inside components → SEO_SPEC.md

---

## 1. COLOR PALETTE

All colors defined as CSS custom properties on `:root`. Never use raw hex values in component
code — always reference tokens.

### 1.1 Token Definitions

```css
:root {
  /* ── Brand ───────────────────────────────── */
  --color-blue:        #1B6CA8;   /* Primary brand — AC/cooling */
  --color-blue-dark:   #14558A;   /* Blue on hover, active states */
  --color-blue-light:  #EBF4FB;   /* Blue tint for section backgrounds */
  --color-orange:      #E8670A;   /* Accent/CTA — heating, primary buttons */
  --color-orange-dark: #C4540A;   /* Orange on hover */
  --color-orange-light:#FEF0E6;   /* Orange tint for banners */

  /* ── Neutrals ────────────────────────────── */
  --color-navy:        #0C1A2E;   /* Header, footer, dark sections */
  --color-navy-mid:    #162540;   /* Card backgrounds on dark sections */
  --color-white:       #FFFFFF;
  --color-gray-100:    #F5F7FA;   /* Page background, alternating sections */
  --color-gray-200:    #E8ECF0;   /* Borders, dividers, input outlines */
  --color-gray-400:    #9CA3AF;   /* Placeholder text, disabled states */
  --color-gray-600:    #6B7280;   /* Secondary / caption text */
  --color-text:        #1A2233;   /* Primary body text */

  /* ── Semantic ────────────────────────────── */
  --color-success:     #1A7A3C;   /* Form success state */
  --color-error:       #C0392B;   /* Form error state */
  --color-focus:       #1B6CA8;   /* Focus ring color (accessibility) */
}
```

### 1.2 Usage Rules — When to Use Each Token

| Token | Required uses | Never use for |
|---|---|---|
| `--color-blue` | Primary nav links, icon fills, section headings on white, hero background gradient, service card borders, link color in body text | Body text on white (contrast ratio < 4.5:1 at small sizes) |
| `--color-blue-dark` | Blue button hover state, active nav link underline | Any background fill |
| `--color-blue-light` | Alternate section backgrounds (e.g., "Why Choose Us"), form field focus background | Never for text |
| `--color-orange` | ALL primary CTA buttons (BOOK NOW, Schedule Now, Contact Us, Get a Free Quote), emergency badge background, star icons | Background fills behind body text, nav backgrounds |
| `--color-orange-dark` | All orange button hover/active states | Any standalone fill |
| `--color-navy` | Sticky header background (scrolled state), footer background, dark hero overlays | Any text smaller than H3 on this background (use white text only) |
| `--color-text` | All body copy, H1–H6 on white/light backgrounds | Never on dark/navy backgrounds |
| `--color-gray-600` | Captions, meta text (review dates, word counts), placeholder copy | H1–H3 — headings must use `--color-text` or white |

> **CTA Color Resolution:** Screenshots show hero "Schedule Now" buttons in teal/green.
> This is a design inconsistency on the current site that must be corrected in the rebuild.
> ALL primary CTA buttons use `--color-orange`. The teal/green is eliminated from the palette.
> There is no fourth CTA color.

### 1.3 Color Combinations and Contrast

All text/background pairs must meet WCAG AA (4.5:1 for normal text, 3:1 for large text ≥18px bold):

| Text | Background | Ratio | Used on |
|---|---|---|---|
| `--color-white` | `--color-blue` | 6.1:1 ✓ | Blue CTA buttons, nav active state |
| `--color-white` | `--color-orange` | 3.6:1 ✓ | Orange CTA buttons (large bold text only ≥16px bold) |
| `--color-white` | `--color-navy` | 15.8:1 ✓ | Footer, dark header |
| `--color-text` | `--color-white` | 13.4:1 ✓ | Body copy |
| `--color-text` | `--color-gray-100` | 11.2:1 ✓ | Alternate section backgrounds |
| `--color-blue` | `--color-white` | 6.1:1 ✓ | Links in body text |
| `--color-white` | `--color-orange-dark` | 4.5:1 ✓ | Orange button label in hover state |

---

## 2. TYPOGRAPHY

One font family is used across the entire site: **Lato** (Google Fonts).
Loading Lato already, keeping it is zero additional network cost. Do NOT add a second font
family — it would cost ~80–120KB and 1 extra render-blocking request for no visual gain.

### 2.1 Font Loading

```html
<!-- In <head>, before any CSS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap">
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
  media="print" onload="this.media='all'">
<noscript>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap">
</noscript>
```

> Load weight 900 in addition to 400 and 700 — it is used for the hero H1 and display
> headings for maximum visual impact. All three weights are subset automatically by
> Google Fonts. Total extra byte cost: ~4KB for weight 900.

### 2.2 Type Scale

```css
:root {
  /* ── Font Family ─────────────────────────── */
  --font-base: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* ── Display (Hero H1 only) ──────────────── */
  --text-display-size:   clamp(36px, 5vw, 52px);
  --text-display-weight: 900;
  --text-display-lh:     1.1;
  --text-display-ls:     -0.02em;

  /* ── Headings ────────────────────────────── */
  --text-h1-size:   clamp(28px, 4vw, 40px);
  --text-h1-weight: 700;
  --text-h1-lh:     1.2;

  --text-h2-size:   clamp(22px, 3vw, 30px);
  --text-h2-weight: 700;
  --text-h2-lh:     1.25;

  --text-h3-size:   clamp(18px, 2.5vw, 22px);
  --text-h3-weight: 700;
  --text-h3-lh:     1.3;

  --text-h4-size:   18px;
  --text-h4-weight: 700;
  --text-h4-lh:     1.35;

  --text-h5-size:   16px;
  --text-h5-weight: 700;
  --text-h5-lh:     1.4;

  --text-h6-size:   14px;
  --text-h6-weight: 700;
  --text-h6-lh:     1.4;

  /* ── Body ────────────────────────────────── */
  --text-body-lg-size:   18px;
  --text-body-lg-weight: 400;
  --text-body-lg-lh:     1.7;

  --text-body-size:      16px;   /* Minimum — never go below this */
  --text-body-weight:    400;
  --text-body-lh:        1.7;

  --text-body-sm-size:   14px;   /* Captions, fine print only */
  --text-body-sm-weight: 400;
  --text-body-sm-lh:     1.6;

  /* ── Special Roles ───────────────────────── */
  --text-nav-size:    15px;
  --text-nav-weight:  700;

  --text-cta-size:    16px;
  --text-cta-weight:  700;
  --text-cta-ls:      0.02em;   /* Slight tracking on button labels */

  --text-badge-size:  11px;
  --text-badge-weight: 700;
  --text-badge-ls:    0.08em;
  --text-badge-transform: uppercase;

  --text-footer-size:  14px;
  --text-footer-weight: 400;
  --text-footer-lh:    1.6;

  --text-caption-size:  13px;
  --text-caption-weight: 400;
  --text-caption-color:  var(--color-gray-600);
}
```

### 2.3 Text Role Reference Table

| Role | Size | Weight | Color | Notes |
|---|---|---|---|---|
| Hero H1 (homepage only) | clamp(36–52px) | 900 | White | Only one per site — the homepage hero |
| H1 (interior pages) | clamp(28–40px) | 700 | `--color-text` | Every other page's single H1 |
| H2 (section headings) | clamp(22–30px) | 700 | `--color-text` | White when on navy/blue background |
| H3 (sub-sections, card titles) | clamp(18–22px) | 700 | `--color-text` | |
| H4 (FAQ questions, sub-headings) | 18px | 700 | `--color-text` | |
| H5 | 16px | 700 | `--color-text` | Rarely used — prefer H4 |
| H6 | 14px | 700 | `--color-gray-600` | Label-style headings only |
| Body Large (lead paragraphs) | 18px | 400 | `--color-text` | First paragraph of each service page |
| Body (default) | 16px | 400 | `--color-text` | All regular body copy |
| Body Small (captions) | 14px | 400 | `--color-gray-600` | Never for primary content |
| Nav links | 15px | 700 | `--color-text` on white; white on navy | |
| CTA button labels | 16px | 700 | White | Uppercase tracking (`0.02em`) |
| Badges / labels | 11px | 700 | Varies | UPPERCASE + letter-spacing |
| Footer copy | 14px | 400 | `rgba(255,255,255,0.75)` | On navy footer |
| Star rating display | 22px | 700 | `--color-orange` | "4.7★" in hero trust line |
| Phone number (header) | 17px | 700 | `--color-text` or white | Always a `<a href="tel:...">` |
| Address (NAP block) | 14px | 400 | Inherits footer | `<address>` element |

---

## 3. SPACING SCALE & GRID

### 3.1 Spacing Tokens

4px base unit. Never use arbitrary values outside this scale.

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
}
```

### 3.2 Vertical Rhythm — Section Spacing

| Context | Top padding | Bottom padding |
|---|---|---|
| Hero section | 80px (desktop) / 48px (mobile) | 80px / 48px |
| Interior section (white bg) | 80px / 48px | 80px / 48px |
| Interior section (gray bg) | 64px / 40px | 64px / 40px |
| Trust bar | 24px / 16px | 24px / 16px |
| Footer | 64px / 40px | 32px / 24px |
| Between H1 and first paragraph | 16px | — |
| Between body paragraphs | 16px top-margin on `<p>` | — |

### 3.3 Layout Grid

```css
:root {
  --grid-cols: 12;
  --grid-gutter: 24px;         /* mobile */
  --grid-gutter-md: 32px;      /* tablet+ */
  --container-max: 1200px;
  --container-padding: 20px;   /* side padding on mobile */
  --container-padding-md: 40px; /* tablet+ */
}

.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

@media (min-width: 768px) {
  .container { padding-inline: var(--container-padding-md); }
}
```

### 3.4 Border Radius

```css
:root {
  --radius-sm:  4px;   /* Badges, tags */
  --radius-md:  8px;   /* Cards, inputs, small buttons */
  --radius-lg: 12px;   /* Service cards, testimonial cards */
  --radius-xl: 16px;   /* Hero insets, overlay panels */
  --radius-full: 9999px; /* Pills, rounded badges */
}
```

---

## 4. RESPONSIVE BREAKPOINTS

```css
/* Mobile first — styles outside media queries = mobile (0+) */
/* Tablet */   @media (min-width: 768px)  { ... }
/* Desktop */  @media (min-width: 1024px) { ... }
/* Wide */     @media (min-width: 1280px) { ... }
```

| Breakpoint name | Min-width | Container width | Nav behavior |
|---|---|---|---|
| Mobile (default) | 0px | 100% − 40px | Hamburger menu |
| Tablet | 768px | 100% − 80px | Hamburger menu |
| Desktop | 1024px | Full grid, max 1200px | Full horizontal nav |
| Wide | 1280px | Max 1200px centered | Same as desktop |

> The nav switches from hamburger to full horizontal at 1024px (not 768px). Tablet
> viewports (768–1023px) retain the hamburger to keep the header clean.

---

## 5. COMPONENT INVENTORY

Every component the developer must build, with exact specification.

### 5.1 StickyHeader

**Behavior:** Transparent or white at scroll=0, elevates with `box-shadow` on scroll > 40px.
Stays fixed at top of viewport (`position: sticky; top: 0; z-index: 1000`).

**Desktop layout (1024px+):**
```
[Logo 160px wide] [Services ▾] [About] [FAQ] [Contact]   [24/7 Emergency Badge]  [(844) 364-5800]  [BOOK NOW]
```

**Tablet/Mobile layout (< 1024px):**
```
[Logo 130px wide]   [Phone icon (clickable)]   [☰ Hamburger]
```

**Tokens:**
- Background: `--color-white` (default/transparent), `--color-white` + `box-shadow: 0 2px 12px rgba(0,0,0,0.1)` (scrolled)
- Logo: SVG, max-height 48px (desktop), 40px (mobile)
- Nav link color: `--color-text`, hover: `--color-blue` + underline
- Active page link: `--color-blue` + 2px bottom border
- Phone link: `--text-body-size`, `--text-nav-weight`, `--color-text`, `text-decoration: none`
- BOOK NOW button: `--color-orange`, white text (see ButtonPrimary spec)
- 24/7 badge: see EmergencyBadge spec

**⚠️ CLIENT INPUT NEEDED:** SVG version of the Alaskan Air Conditioning logo.
Current site uses an image that may not scale cleanly. Request a clean SVG from client.
Until received, use the current PNG at 2× resolution with explicit width/height attributes.

### 5.2 MobileNavPanel

**Behavior:** Slides in from right on hamburger tap. Full-screen overlay, z-index 1001.
Background: `--color-navy`. Close button top-right.

**Contents (top to bottom):**
1. Logo (white variant)
2. Location selector: "Tucson, AZ ▾ / Phoenix, AZ" — navigates to `/tucson-az/` or `/phoenix-az/`
3. Services accordion (collapsed by default): tap header to expand list of service links
4. About — direct link
5. FAQ — direct link
6. Contact — direct link
7. Divider
8. "(844) 364-5800" — large tap target, tel: link, orange button style, full width
9. BOOK NOW — full-width orange button
10. "24/7 Emergency Service" — white caption at bottom

**Animation:** `transform: translateX(100%)` → `translateX(0)` in 250ms ease-out.
Backdrop: `rgba(0,0,0,0.5)`, fade in 200ms. Trap focus while open. Close on Esc or backdrop tap.

### 5.3 Footer

**Background:** `--color-navy`
**Text:** `rgba(255,255,255,0.75)` for body, `--color-white` for links and headings
**Layout:** 4-column grid (desktop), 2-column (tablet), 1-column (mobile)

**Column structure:**
```
Col 1: Company logo + tagline + social proof line + review link
Col 2: Services links
Col 3: Locations + service areas
Col 4: Tucson NAP block + Phoenix NAP block
```

**Bottom bar (full width):**
```
© [YEAR] Alaskan Air Conditioning & Heating. ROC# 240693. All rights reserved.
[Privacy Policy] [Sitemap]
```

**NAP blocks:** Use `<address>` HTML element. Font: 14px, line-height 1.6.
Link color: `--color-orange` on hover.

### 5.4 Hero (Homepage)

**Layout:** Split panel. Left: blue background with text content. Right: photo (van + team).
On mobile: stacked, photo below text, photo cropped to 16:9.

**Left panel:**
- Background: linear-gradient from `#1B6CA8` (top-left) to `#1456867` (bottom-right)
  — adds slight depth over a flat color
- H1: `--text-display-size`, weight 900, white, max-width 560px
- Sub-headline: `--text-body-lg-size`, weight 400, `rgba(255,255,255,0.9)`, max-width 520px,
  margin-top: `--space-4`
- Star rating line: "4.7★ · 4,400+ Google Reviews · Serving Tucson since 1972" —
  16px, weight 700, white, margin-top `--space-4`
- CTA row: two buttons — "Schedule Now — Tucson" and "Schedule Now — Phoenix" —
  BOTH in `--color-orange` (fix the current teal/green inconsistency), margin-top `--space-8`,
  gap `--space-4`
- Emergency note below buttons: "24/7 Emergency Line: (844) 364-5800" in 14px, white

**Right panel:**
- Hero image: van photo with team, serve at minimum 1200px wide, WebP format
- `loading="eager"` + `fetchpriority="high"` (this is the LCP element — do NOT lazy-load)
- `width` and `height` attributes required (prevents CLS)
- Alt text: "Alaskan Air Conditioning & Heating technicians with service van in Tucson AZ"

**⚠️ CLIENT INPUT NEEDED:** High-resolution photo of the branded service van and/or
technician team for hero. Current site uses this image — get the original uncompressed file.
Minimum 1600px wide, WebP export for production.

### 5.5 TrustBar

A full-width horizontal band directly below the hero.

**Background:** `--color-white` or `--color-gray-100`
**Border:** 1px `--color-gray-200` top and bottom
**Padding:** `--space-6` vertical

**Items (in order, left to right):**
1. "Keeping you chill since 1972" — text only, Lato 700, `--color-text`
2. Trane Comfort Specialist — logo mark
3. Google Guaranteed — logo mark
4. NATE Certified — logo mark
5. ACCA Member — text or logo
6. Energy Star Partner — logo mark
7. "Licensed & Insured · ROC# 240693" — text, Lato 400, `--color-gray-600`

**Layout:**
- Desktop: single horizontal row, space-between, center-aligned
- Tablet: 2-row wrap
- Mobile: horizontal scroll with scrollbar hidden (overflow-x: auto, -ms-overflow-style: none)
  — do NOT wrap to multiple rows on mobile as it takes too much vertical space

**Separator between items:** 1px `--color-gray-200` vertical rule, 24px tall

**⚠️ CLIENT INPUT NEEDED:** High-resolution PNG or SVG versions of certification logos:
Trane Comfort Specialist, Google Guaranteed, NATE, ACCA, Energy Star. Current site renders
these client-side. Get official brand assets.

### 5.6 ServiceCard

Used in ServicesGrid (homepage) and /services/ hub page.

```
┌────────────────────────┐
│  [Icon — 48px]         │
│                        │
│  Service Name H3       │
│  One sentence desc     │
│                        │
│  Learn More →          │
└────────────────────────┘
```

**Default state:**
- Background: `--color-white`
- Border: 1px `--color-gray-200`
- Border-radius: `--radius-lg`
- Padding: `--space-8`
- Icon color: `--color-blue`
- Title: H3, `--color-text`
- Description: 14px, `--color-gray-600`
- "Learn More →" link: `--color-blue`, 14px, 700 weight

**Hover state:**
- box-shadow: `0 8px 24px rgba(27,108,168,0.15)`
- transform: translateY(-2px)
- border-color: `--color-blue`
- Transition: all 200ms ease

**Grid layout:**
- Desktop: 4 cards across (3-col grid each)
- Tablet: 2 × 2
- Mobile: 1-column stack

**Services to include (cards in this order):**
1. Alaskafy Your System — icon: snowflake or maintenance wrench — `/alaskafy-your-system/`
2. AC Installation — icon: air conditioning unit — `/ac-installation/`
3. Heating & Furnaces — icon: flame — `/heating-and-furnaces/`
4. Indoor Air Quality — icon: leaf/air — `/indoor-air-quality/`

> Note: "Alaskafy Your System" is the FIRST card and given visual emphasis as the signature
> service (slightly larger card or featured styling — see ServicesGrid layout below).

### 5.7 ServicesGrid (Homepage Section)

Full-width section containing the service cards.

- Section background: `--color-gray-100`
- Section heading (H2): "What We Do" or "HVAC Services in Tucson & Phoenix" — centered
- Sub-heading (optional): "From maintenance to full installations — NATE-certified technicians
  serving Tucson and Phoenix, AZ since 1972" — centered, `--color-gray-600`
- "Alaskafy Your System" card is displayed first with a featured badge
- "See all services →" link below grid, centered, links to `/services/`

### 5.8 WhyChooseUs

Full-width section, alternating background from ServicesGrid.

**Background:** `--color-white`

**Content layout:** 2 columns on desktop — left: heading + copy, right: list of differentiators.
On mobile: stacked.

**Differentiator items (6 total, use icon + bold label + short description format):**
1. ⭐ Since 1972 — Over 50 years serving Tucson and Phoenix, AZ
2. ★★★★★ 4,400+ 5-Star Reviews — Google · Nearby Now · BBB
3. NATE-Certified Technicians — Industry's highest technical standard
4. Trane Comfort Specialist — Factory-trained on Trane systems
5. Google Guaranteed — Background-checked, licensed, bonded
6. The Alaskafy Difference — Our proprietary maintenance system, not the cheap way

**Item layout:**
```
[Icon 32px, --color-blue]  [Bold Label, H4]
                           [Short description, body text]
```

### 5.9 TestimonialCard

```
┌───────────────────────────────────┐
│  ★★★★★                            │
│  "Quote from customer here..."    │
│                                   │
│  — Reviewer Name, City            │
└───────────────────────────────────┘
```

- Background: `--color-white`
- Border-left: 4px solid `--color-orange`
- Padding: `--space-6`
- Border-radius: `--radius-md`
- Stars: `--color-orange`, 18px
- Quote: 16px italic, `--color-text`
- Attribution: 14px, `--color-gray-600`

**⚠️ CLIENT INPUT NEEDED:** 6–9 curated real review quotes with reviewer first name and
Tucson/Phoenix attribution. The current site has 29 testimonials on the homepage (from
NearbyNow widget) — pull the best ones for the static testimonial section.

### 5.10 TestimonialBlock (Homepage Section)

**Background:** `--color-navy`

**Heading:** "What Our Customers Say" — H2, white, centered

**Sub-heading:** "4.7★ rated on Google · 4,400+ reviews across Google, Nearby Now, and BBB"
— white, centered, 16px

**Layout:** 3-column grid of TestimonialCards (desktop), 1-column carousel/stack (mobile)

**Social proof footer inside section:**
```
[Google Reviews badge]  [NearbyNow badge]  [BBB badge]
```
Each badge shows: platform logo + star rating + count

**"Leave Us a Review" button:** Secondary (outlined, white) — links to Google review URL
`https://search.google.com/local/writereview?placeid=ChIJQWnLxGtx1oYR-AKYEEAAdY0`

### 5.11 MapEmbed

**Used on:** Homepage (section after testimonials), `/contact/` page, `/tucson-az/`, `/phoenix-az/`

```html
<div class="map-wrapper" style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden;">
  <iframe
    src="https://www.google.com/maps/embed/v1/place?key=YOUR_MAPS_API_KEY&q=place_id:ChIJQWnLxGtx1oYR-AKYEEAAdY0"
    style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;"
    allowfullscreen
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Alaskan Air Conditioning & Heating Tucson location map"
    width="600" height="450">
  </iframe>
</div>
```

> Replace `YOUR_MAPS_API_KEY` with the Google Maps Embed API key.
> **⚠️ CLIENT INPUT NEEDED:** Google Maps API key (Maps Embed API, free tier). Also need
> the Google Maps Place ID for Phoenix: `ChIJQWnLxGtx1oYR-AKYEEAAdY0` is Tucson — the
> Phoenix Place ID must be retrieved separately.

### 5.12 ButtonPrimary

```css
.btn-primary {
  display:          inline-flex;
  align-items:      center;
  gap:              var(--space-2);
  padding:          var(--space-3) var(--space-6);
  background-color: var(--color-orange);
  color:            var(--color-white);
  font-family:      var(--font-base);
  font-size:        var(--text-cta-size);
  font-weight:      var(--text-cta-weight);
  letter-spacing:   var(--text-cta-ls);
  border:           none;
  border-radius:    var(--radius-md);
  cursor:           pointer;
  text-decoration:  none;
  transition:       background-color 150ms ease, transform 100ms ease, box-shadow 150ms ease;
  white-space:      nowrap;
}

.btn-primary:hover,
.btn-primary:focus-visible {
  background-color: var(--color-orange-dark);
  box-shadow:       0 4px 12px rgba(232,103,10,0.35);
  transform:        translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
}

.btn-primary:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
```

**Variants:**
- `btn-primary--blue`: same styles, `--color-blue` background, `--color-blue-dark` hover
- `btn-primary--large`: padding `var(--space-4) var(--space-8)`, font-size 18px — used in hero only
- `btn-primary--outline`: transparent bg, 2px `--color-white` border, white text — for dark backgrounds

### 5.13 EmergencyBadge

```
┌──────────────────────────┐
│  ⚡  24/7 Emergency      │
│     Service              │
└──────────────────────────┘
```

- Background: `--color-orange`
- Text: white, 11px, uppercase, 700 weight, letter-spacing 0.08em
- Border-radius: `--radius-full`
- Padding: 4px 10px
- Positioned in sticky header, left of phone number
- On mobile: hidden from header (space constraints); visible in mobile nav panel

### 5.14 ReviewBadge (Inline)

An inline pill used in hero sub-headline and CTAs:

```
[ ★ 4.7  ·  4,400+ Google Reviews ]
```

- Background: `rgba(255,255,255,0.15)` (on blue/dark backgrounds) or `--color-blue-light` (on white)
- Border: 1px `rgba(255,255,255,0.3)` (dark bg) or `--color-blue` (light bg)
- Border-radius: `--radius-full`
- Padding: 4px 12px
- Star: `--color-orange`, 16px
- Text: 14px, 700 weight

### 5.15 ContactForm

**Fields (in order):**
1. Name — `<input type="text" name="name" required>`
2. Phone — `<input type="tel" name="phone" required>`
3. Service Type — `<select name="service" required>` with options:
   - AC Maintenance / Alaskafication
   - AC Installation or Replacement
   - AC Repair
   - Heating & Furnace Service
   - Indoor Air Quality
   - Other / Emergency
4. Location — `<select name="location">` with options: Tucson · Phoenix
5. Message — `<textarea name="message" rows="4">` (not required)
6. Submit: ButtonPrimary — "Send Message — We'll Call You Back"

**Validation:**
- Required fields validated client-side on submit (do not validate on blur — it's frustrating
  for phone numbers while typing)
- Show error message below each invalid field in `--color-error`, 14px
- On success: replace form with success message (do NOT redirect): "Thanks! We'll call you
  back within 1 business hour during business hours, or first thing in the morning."

**Styling:**
- Labels: 14px, 700, `--color-text`, above each field
- Inputs: full-width, 16px, border `1px solid --color-gray-200`, radius `--radius-md`,
  padding 12px 16px, background white
- Focus state: `border-color: --color-blue`, `box-shadow: 0 0 0 3px rgba(27,108,168,0.15)`
- Select: same as input + custom arrow icon (no browser default arrow)

### 5.16 FAQAccordion

**Used on:** `/faq/` page, and FAQ sections within service pages

```
┌─────────────────────────────────────────────[+]──┐
│ Question text (H4 level)                          │
└───────────────────────────────────────────────────┘
▼ (when open)
┌───────────────────────────────────────────────────┐
│ Answer text (body, 16px)                          │
│ Internal link to relevant service page            │
└───────────────────────────────────────────────────┘
```

- Border: 1px `--color-gray-200` top (each item)
- Question: 18px, 700, `--color-text`, padding `--space-5` `--space-4`
- Chevron icon: rotates 180° on open, `--color-blue`
- Answer: 16px, `--color-text`, padding `--space-4 --space-4 --space-6`
- Open/close: CSS `max-height` transition for smooth animation (do NOT use JS height
  calculation — it causes reflow/CLS)
- Uses `<details>` + `<summary>` HTML elements for zero-JS accordion with keyboard accessibility

### 5.17 BreadcrumbNav

Used on all pages except the homepage.

```
Home > Services > Alaskafy Your System
```

- Font: 13px, 400, `--color-gray-600`
- Link color: `--color-blue`
- Separator: " › " — CSS-generated, not HTML entity (avoids screen reader reading "›")
- Renders `BreadcrumbList` JSON-LD (see SEO_SPEC.md)
- Top of page, inside `.container`, below sticky header padding

### 5.18 CTABanner

Full-width call-to-action strip used at bottom of service pages and between sections.

**Variants:**
- **Blue variant** — "Ready to schedule your Alaskafication?" on `--color-blue` background
- **Orange variant** — "24/7 Emergency HVAC Service" on `--color-orange` background (rare use)

**Layout:** Single row (desktop): [Headline H3] [Sub-text] [Button]
Stack on mobile.

### 5.19 LocationSelectorDropdown

Nav element that switches location context.

```
[Location: Tucson, AZ ▾]
  ┌──────────────────────┐
  │ ● Tucson, AZ         │
  │   Phoenix, AZ        │
  └──────────────────────┘
```

- Triggers navigation to `/tucson-az/` or `/phoenix-az/` on selection
- NOT a JavaScript-only state change — use real anchor/navigation
- Current location shown with a filled dot indicator
- Keyboard accessible (arrow keys within dropdown)

---

## 6. WHAT TO PRESERVE FROM CURRENT SITE

| Element | Decision | Reason |
|---|---|---|
| Lato font (400/700) | ✅ Keep | Zero extra network cost; site already loads it |
| Polar bear mascot | ✅ Keep | Distinctive, memorable, tied to brand identity |
| "Alaskafy / Alaskafications" copy | ✅ Keep | Core brand differentiator — do not genericize |
| "Keeping you chill since 1972" | ✅ Keep | Strong trust signal + brand voice |
| Primary blue (#1B6CA8) | ✅ Keep | Consistent with brand |
| Orange accent (#E8670A) | ✅ Keep | Consistent CTA color |
| CSS custom properties architecture | ✅ Keep (extend) | Already modern, maintainable |
| Location hub pages (/tucson-az/, /phoenix-az/) | ✅ Keep + refresh | Have HVACBusiness schema + backlinks |
| "Schedule Now (Tucson)" + "(Phoenix)" CTA split | ✅ Keep pattern | Good multi-location UX |
| Booking widget integration | ✅ Keep widget, fix wrapper | Current widget works; the bug is the container, not the widget |

---

## 7. WHAT TO FIX IN THE REBUILD

| Problem | Fix |
|---|---|
| Hero "Schedule Now" buttons are teal/green (inconsistent) | Replace with `--color-orange` ButtonPrimary |
| H1 ("Air Conditioning Services in Arizona") is below the fold | Move H1 into the hero panel as the visible headline; redesign hero markup |
| CTA hero copy and H1 are different elements (div vs. H1) | The hero H1 IS the headline — no separate styled div needed |
| Trust signals render client-side (missed by crawlers) | Build trust bar as static HTML, not JS-injected |
| Booking widget causes scroll-to-top on desktop | Wrap in `<dialog>` modal — see TECHNICAL_SPEC.md §6 |
| 32% images missing alt text | All images get descriptive alt text at build time |
| No address in homepage footer | Add both NAP blocks to every page footer (static HTML) |
| Three different phone formats on location pages | Standardize: 844-364-5800 in all UI; location phone only in schema |

---

## 8. ANIMATION & INTERACTION RULES

**Principle:** Subtle and purposeful. Every animation must justify its existence.
No decorative animations. No parallax. No scroll-triggered motion (except fade-in opacity).

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Mobile nav open | translateX(100%) → translateX(0) | 250ms | ease-out |
| Mobile nav backdrop | opacity 0 → 0.5 | 200ms | linear |
| ServiceCard hover | translateY(0) → translateY(-2px) + box-shadow | 200ms | ease |
| Button hover | box-shadow + background-color | 150ms | ease |
| FAQAccordion open/close | max-height 0 → auto (CSS transition) | 300ms | ease |
| Sticky header shadow | box-shadow fade in on scroll | 200ms | linear |
| Section fade-in on scroll | opacity 0 → 1 (IntersectionObserver) | 400ms | ease | 
| CTA button BOOK NOW | No pulse/loop animation — it's visually annoying on service sites | — | — |

**Scroll behavior:**
- `html { scroll-behavior: smooth; }` — for anchor link scrolls within pages
- Do NOT use `scroll-behavior: smooth` globally if the booking widget does
  `window.scrollTo(0,0)` — this will cause a visually jarring slow-scroll to top.
  Instead, use `scroll-behavior: smooth` only on anchor links via JavaScript:
  ```js
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  });
  ```
  And handle the booking widget with `prefers-reduced-motion` awareness.

**Focus states:**
All interactive elements must have a visible focus ring:
```css
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
:focus:not(:focus-visible) {
  outline: none; /* Remove for mouse users, keep for keyboard */
}
```

---

## 9. ICON LIBRARY

**Recommended:** Heroicons (MIT license, SVG sprites, tree-shakeable)
or Phosphor Icons (similar quality, slightly more styles available).

Do NOT use icon fonts (Font Awesome loaded via CDN) — they add ~100KB + a blocking
network request. Use inline SVG or SVG sprites only.

**Icons required (by component):**
| Icon | Component | Style |
|---|---|---|
| Snowflake | Alaskafy/AC service card | Outline |
| Wind/fan | AC Installation card | Outline |
| Flame | Heating card | Outline |
| Leaf/air | Indoor Air Quality card | Outline |
| Check circle | Trust bar (Licensed & Insured) | Solid |
| Star (filled) | Star ratings, review badges | Solid |
| Phone | Header mobile, footer | Outline |
| MapPin | NAP block, footer | Outline |
| Clock | Hours display | Outline |
| ChevronDown | Dropdown arrows, FAQ accordion | Outline |
| Menu (☰) | Mobile hamburger | Outline |
| X (close) | Mobile nav close, dialog close | Outline |
| ArrowRight | "Learn More →" links | Outline |
| Shield check | Google Guaranteed, certifications | Solid |
| Lightning bolt | 24/7 Emergency badge | Solid |
