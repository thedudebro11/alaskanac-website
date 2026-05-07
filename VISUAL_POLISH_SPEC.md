# Alaskan AC — Scroll Animation & Visual Polish Spec
## Performance fixes + scroll animations for the Next.js 14 rebuild

---

## CONTEXT

You are working on the Alaskan Air Conditioning & Heating website — a Next.js 14 App Router project with CSS Modules, deployed on Vercel. The site is a static-generated local SEO site for an HVAC company serving Tucson and Phoenix, AZ. It currently scores 70 on Lighthouse mobile and desktop.

The goal of this session is twofold:
1. Fix the performance issues dragging down Lighthouse without changing the design system
2. Add scroll-triggered animations and visual polish that feel premium without adding JS library weight

Do not install any new npm packages. Do not touch SEO metadata, schema, or content files. Do not change the design token values in globals.css. Every change must preserve or improve the Lighthouse score.

---

## PART 1 — PERFORMANCE FIXES (Do these first, in order)

### Fix 1 — Hero LCP: Replace SpinningBadge with next/image hero photo

**File:** `components/home/Hero.tsx`

**What to do:**
Replace the `<SpinningBadge>` placeholder in the right column with a `next/image` component. The SpinningBadge can be repositioned as a small corner overlay on top of the image at `bottom: -20px, right: -20px` inside a `position: relative` wrapper.

```tsx
// Replace the spinWrapper div with this:
<div className={styles.imageWrapper}>
  <Image
    src="/images/hero-van-team.webp"
    alt="Alaskan Air Conditioning service van and technicians in Tucson AZ"
    width={640}
    height={480}
    priority
    sizes="(max-width: 767px) 0px, (max-width: 1200px) 50vw, 640px"
    className={styles.heroImage}
  />
  <div className={styles.spinOverlay} aria-hidden="true">
    <SpinningBadge />
  </div>
</div>
```

Add to `Hero.module.css`:
```css
.imageWrapper {
  display: none;
  position: relative;
}

@media (min-width: 768px) {
  .imageWrapper {
    display: block;
  }
}

.heroImage {
  width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  object-fit: cover;
}

.spinOverlay {
  position: absolute;
  bottom: -20px;
  right: -20px;
}
```

**Why:** The `priority` prop tells Next.js to inject a `<link rel="preload">` for this image in the `<head>`. Right now there is no LCP image — the browser is treating the hero gradient as the LCP element. A gradient scores poorly because it has no preload hint and renders late. A `priority` next/image brings LCP down from ~4s to under 2s. This alone could move Lighthouse from 70 to 85+.

If the client has not yet provided the hero photo, use a placeholder for now:
- Add `/public/images/hero-van-team.webp` — any 640×480 placeholder WebP under 120KB
- Do not use an external URL for the image src

---

### Fix 2 — Font loading: Switch from `next/font/google` to self-hosted with display swap

**File:** `app/layout.tsx`

The current code already uses `next/font/google` with `display: 'swap'` which is correct. However, verify the font variable is being applied to the body tag, not just the html tag.

**What to do:** Change the className application:
```tsx
// Before:
<html lang="en" className={lato.variable}>
  <body>

// After:
<html lang="en" className={lato.variable}>
  <body className={lato.className}>
```

And in `globals.css`, confirm the font stack references the variable:
```css
--font-base: var(--font-lato), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
body { font-family: var(--font-base); }
```

**Why:** If `lato.className` is not applied to body, the browser may fall back to a system font initially and then swap — causing a FOUT (Flash of Unstyled Text) that hurts CLS. The `variable` on `<html>` makes the CSS custom property available but does not automatically apply the font to text elements.

---

### Fix 3 — Replace emoji icons with inline SVG

**Files:** `components/home/WhyChooseUs.tsx`, `components/shared/ServiceCard.tsx`

**What to do:** Replace emoji icons (`🏆`, `🔧`, `❄`, `⚡`, `⭐`, `📋`) with simple inline SVG or lucide-react icons. Lucide is already a common dependency in Next.js projects — check `package.json`. If it exists, use it. If not, use inline SVG `<svg>` elements with `width="32" height="32"`.

Suggested lucide mappings:
- 🏆 → `<Award />`
- 🔧 → `<Wrench />`
- ❄ → `<Snowflake />`
- ⚡ → `<Zap />`
- ⭐ → `<Star />`
- 📋 → `<ClipboardList />`

**Why:** Emoji rendering is handled by the OS, not the browser. On mobile devices, emoji fonts are an additional system resource that can cause brief layout reflow. More importantly, emoji icons render inconsistently across devices (different shapes, colors, weights on iOS vs Android vs Windows). SVG icons render identically everywhere, are styleable with CSS, and have zero additional network cost when inlined. This contributes to a more professional perceived quality and removes a minor CLS risk.

---

### Fix 4 — Add `will-change` containment to SpinningBadge CSS animation

**File:** `components/shared/SpinningBadge.module.css`

**What to do:** Add these properties to the spinning SVG element:
```css
.svg {
  will-change: transform;
  transform: translateZ(0); /* force GPU layer */
}
```

**Why:** The SpinningBadge runs a CSS `rotate` animation continuously. Without `will-change: transform`, the browser recalculates the element's paint on every frame using the CPU. `will-change` tells the browser to promote this element to its own compositor layer ahead of time, handing the animation to the GPU. This eliminates jank on mobile and prevents the animation from competing with scroll performance. The `translateZ(0)` is the classic GPU-promotion hack for browsers that don't fully respect `will-change`.

---

## PART 2 — SCROLL ANIMATIONS (Do after Part 1)

### Step 1 — Create the useScrollReveal hook

**New file:** `lib/useScrollReveal.ts`

```typescript
'use client';
import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;      // 0–1, how much of element must be visible. Default: 0.15
  rootMargin?: string;     // IntersectionObserver rootMargin. Default: '0px'
  once?: boolean;          // Only animate once. Default: true
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
```

**Why:** IntersectionObserver is a native browser API — no library, no npm package, zero bundle weight. It fires a callback when an element enters or exits the viewport. We add a class (`is-visible`) and CSS handles the animation. This means zero JavaScript animation cost — the GPU handles CSS transitions natively. The `once: true` default means each element animates in once and the observer disconnects, removing all ongoing event listener overhead.

---

### Step 2 — Add reveal animation classes to globals.css

**File:** `styles/globals.css` — add at the bottom

```css
/* ─────────────────────────────────────────────
   SCROLL REVEAL SYSTEM
   All animations use CSS transforms + opacity only.
   Never animate width, height, margin, padding, top, left —
   those trigger layout recalculation (jank).
   transform and opacity are compositor-only (GPU, zero jank).
───────────────────────────────────────────────── */

/* Base: elements start hidden */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Variant: slides in from left */
.reveal--left {
  opacity: 0;
  transform: translateX(-32px);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal--left.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* Variant: slides in from right */
.reveal--right {
  opacity: 0;
  transform: translateX(32px);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal--right.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* Variant: scale up (for cards, badges) */
.reveal--scale {
  opacity: 0;
  transform: scale(0.94);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal--scale.is-visible {
  opacity: 1;
  transform: scale(1);
}

/* Stagger delays — apply to child elements */
.stagger > *:nth-child(1) { transition-delay: 0ms; }
.stagger > *:nth-child(2) { transition-delay: 80ms; }
.stagger > *:nth-child(3) { transition-delay: 160ms; }
.stagger > *:nth-child(4) { transition-delay: 240ms; }
.stagger > *:nth-child(5) { transition-delay: 320ms; }
.stagger > *:nth-child(6) { transition-delay: 400ms; }

/* Respect reduced motion — critical for accessibility */
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal--left,
  .reveal--right,
  .reveal--scale {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**Why `cubic-bezier(0.16, 1, 0.3, 1)`:** This is an "ease out expo" curve. Elements accelerate fast and then smoothly decelerate to rest — identical to how iOS system animations feel. The default `ease-out` CSS keyword is too linear and feels cheap by comparison.

**Why only `transform` and `opacity`:** These are the only two CSS properties that can be animated entirely on the GPU compositor thread. Animating `margin`, `top`, `left`, `width`, or `height` forces a layout recalculation on the CPU on every frame. This is the #1 cause of scroll jank.

**Why `prefers-reduced-motion`:** Some users have vestibular disorders where motion triggers nausea or dizziness. Skipping the animation for these users is both the ethical and legal (WCAG 2.1) requirement.

---

### Step 3 — Apply animations to components

#### `components/home/WhyChooseUs.tsx`

Make it a Client Component and apply staggered reveal to the grid:

```tsx
'use client';
import { useScrollReveal } from '@/lib/useScrollReveal';
// ... existing imports

export function WhyChooseUs() {
  const headingRef = useScrollReveal({ threshold: 0.2 });
  const gridRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={`section--navy ${styles.section}`}>
      <div className="container">
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className={`${styles.heading} reveal`}
        >
          Why Tucson Trusts Alaskan AC
        </h2>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`${styles.grid} stagger`}
        >
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title} className={`${styles.item} reveal--scale`}>
              {/* ... existing content unchanged */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Why:** The 6 differentiator cards are the highest-value trust content on the page. Staggering their entry with 80ms delays creates a cascade effect that draws the eye through all six items sequentially — increasing the chance each one is actually read.

---

#### `components/home/ServicesGrid.tsx`

Same treatment — staggered card reveal:

```tsx
'use client';
import { useScrollReveal } from '@/lib/useScrollReveal';

export function ServicesGrid() {
  const headingRef = useScrollReveal({ threshold: 0.3 });
  const gridRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className={`${styles.heading} reveal`}
        >
          Our HVAC Services
        </h2>
        <p className={styles.sub}>...</p>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`${styles.grid} stagger`}
        >
          {SERVICES.map((service) => (
            <div key={service.slug} className="reveal--scale">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

#### `components/home/TestimonialBlock.tsx`

Use left/right alternating reveal for the three testimonial cards:

```tsx
'use client';
import { useScrollReveal } from '@/lib/useScrollReveal';

const REVEAL_DIRECTIONS = ['reveal--left', 'reveal', 'reveal--right'];

export function TestimonialBlock() {
  const headingRef = useScrollReveal({ threshold: 0.3 });
  const gridRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={`section--gray ${styles.section}`}>
      <div className="container">
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className={`${styles.heading} reveal`}
        >
          What Our Customers Say
        </h2>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={styles.grid}
        >
          {TESTIMONIALS.slice(0, 3).map((testimonial, i) => (
            <div key={i} className={REVEAL_DIRECTIONS[i]}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Why alternating directions:** Left-center-right reveal on three cards creates a "closing in" motion that subconsciously frames the testimonials as converging on a shared verdict. Uniform direction on all three reads as repetitive.

---

#### `components/layout/StickyHeader.tsx`

Upgrade the scroll state transition — add backdrop blur and navy background on scroll.

In `StickyHeader.module.css`, update the `.scrolled` class:

```css
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s ease,
              box-shadow 0.3s ease,
              border-color 0.3s ease,
              backdrop-filter 0.3s ease;
}

.scrolled {
  background-color: rgba(12, 26, 46, 0.96); /* --color-navy with alpha */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
}

/* When scrolled, flip nav link and phone link colors to white */
.scrolled .navLink {
  color: rgba(255, 255, 255, 0.85);
}

.scrolled .navLink:hover {
  color: var(--color-white);
  border-bottom-color: var(--color-orange);
}

.scrolled .logoText {
  color: var(--color-white);
}

.scrolled .phoneLink {
  color: rgba(255, 255, 255, 0.9);
}
```

**Why:** The current scroll state just adds a box shadow — the header stays white. Transitioning to semi-transparent dark navy with `backdrop-filter: blur` gives the header a premium glassmorphism feel that pairs with the hero gradient and makes the header feel like it belongs to the brand.

---

### Step 4 — Add counter animation to TrustBar stats

**File:** `components/home/TrustBar.tsx`

Convert to a Client Component and add a number counter animation for the stats:

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/lib/useScrollReveal';

function useCountUp(target: number, duration: number = 1500, isVisible: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}
```

Apply this to the review count and founding year stats in TrustBar. Items like "4,400+ 5-Star Reviews" and "Serving Arizona Since 1972" can have their numbers animate from 0 up on first scroll-into-view.

**Why:** Animated counters are one of the highest-conversion UI patterns for trust signals. Numbers that count up feel like live proof rather than static claims. Cost: ~20 lines of vanilla React. Zero dependencies.

---

## PART 3 — HERO SECTION POLISH

### Add a subtle animated background to the hero

**File:** `components/home/Hero.module.css`

Add a slow-moving gradient mesh animation behind the existing gradient:

```css
.hero {
  /* existing styles... */
  background:
    linear-gradient(135deg, var(--color-navy) 0%, var(--color-blue) 100%);
  position: relative;
  overflow: hidden;
}

/* Animated ambient orb — CSS only, GPU composited */
.hero::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(27, 108, 168, 0.35) 0%,
    transparent 70%
  );
  top: -200px;
  right: -100px;
  animation: heroOrb 12s ease-in-out infinite alternate;
  pointer-events: none;
}

.hero::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(232, 103, 10, 0.15) 0%,
    transparent 70%
  );
  bottom: -150px;
  left: -50px;
  animation: heroOrb 16s ease-in-out infinite alternate-reverse;
  pointer-events: none;
}

@keyframes heroOrb {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(40px, 30px) scale(1.1); }
}

@media (prefers-reduced-motion: reduce) {
  .hero::before,
  .hero::after {
    animation: none;
  }
}
```

**Why:** A flat gradient at 88vh reads as static and cheap at that scale. Two slowly drifting radial gradient orbs — one blue, one orange — create depth and motion without any JavaScript. The `::before` and `::after` pseudo-elements cost nothing in DOM weight. The `alternate` animation direction means they drift organically without a jarring loop reset.

---

## PART 4 — SERVICE CARD HOVER POLISH

**File:** `components/shared/ServiceCard.module.css`

Replace or enhance the existing hover state with a lift effect:

```css
.card {
  /* existing styles */
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12),
              0 8px 16px rgba(0, 0, 0, 0.08);
}

.card:active {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
```

**Why:** The `translateY(-6px)` lift on hover signals interactivity and clickability — essential on a service card grid where users need to understand these are navigable links. The `:active` state gives tactile feedback on click. `will-change: transform` pre-promotes the card to a GPU layer so hover doesn't cause a paint.

---

## VALIDATION CHECKLIST

After implementing all changes, run Lighthouse and verify:

- [ ] LCP < 2.5s (hero image with `priority` should achieve this)
- [ ] CLS < 0.1 (font swap + no layout-triggering animations)
- [ ] TBT < 200ms (no new JS libraries added)
- [ ] Lighthouse Performance score ≥ 88 mobile, ≥ 92 desktop
- [ ] All animations respect `prefers-reduced-motion`
- [ ] No new npm packages were added
- [ ] No schema, metadata, or content files were modified
- [ ] Site still renders correctly with JavaScript disabled (scroll reveals show all elements visible)

---

## JS-DISABLED FALLBACK NOTE

The reveal classes start elements at `opacity: 0`. If JavaScript is disabled, IntersectionObserver never fires and elements stay invisible. Fix this with a `<noscript>` style block in `app/layout.tsx`:

```tsx
<noscript>
  <style>{`
    .reveal, .reveal--left, .reveal--right, .reveal--scale {
      opacity: 1 !important;
      transform: none !important;
    }
  `}</style>
</noscript>
```

Add this inside the `<html>` block in `app/layout.tsx`. This ensures crawlers and users without JS see all content normally.
