# CONTENT_SPEC.md
## Alaskan Air Conditioning & Heating — New Site Build
**Version:** 1.0 | **Date:** 2026-05-05
**Source:** blueprint.md, report.json, homepage.png + service.png screenshots

> This document is the single source of truth for all written content across the new site.
> A copywriter, developer, or AI code generator reading only this file should be able to
> write every word on every page without asking questions.
>
> Cross-references:
> - Component names → DESIGN_SYSTEM.md §5 (where each content block renders)
> - Schema blocks → SEO_SPEC.md §1–2 (JSON-LD using these meta values)
> - Page routes → SITE_ARCHITECTURE.md §1 (full page inventory)

---

## 1. GLOBAL COPY — ELEMENTS THAT APPEAR ON EVERY PAGE

### 1.1 Navigation Labels (exact, no variation)

| Element | Copy |
|---|---|
| Services dropdown trigger | `Services` |
| About nav link | `About` |
| FAQ nav link | `FAQ` |
| Contact nav link | `Contact` |
| Location selector — Tucson | `Tucson, AZ` |
| Location selector — Phoenix | `Phoenix, AZ` |
| Header phone display | `(844) 364-5800` |
| Header primary CTA button | `BOOK NOW` |
| Mobile nav emergency line | `24/7 Emergency: (844) 364-5800` |

### 1.2 Trust Bar (exact copy, in order)

```
Keeping you chill since 1972
·
Trane Comfort Specialist
·
Google Guaranteed
·
NATE Certified
·
ACCA Member
·
Energy Star Partner
·
Licensed & Insured · ROC# 240693
```

All items separated by a vertical rule (see DESIGN_SYSTEM.md §5.5).

### 1.3 Footer Tagline and Social Proof Line

```
Expert HVAC & Air Conditioning in Tucson & Phoenix, AZ
4.7★ Rated · 4,400+ Reviews Across Google, Nearby Now & BBB · Serving Arizona Since 1972
```

### 1.4 Footer Review CTA

```
Link text: Leave Us a Google Review ★
URL: https://search.google.com/local/writereview?placeid=ChIJQWnLxGtx1oYR-AKYEEAAdY0
```

### 1.5 Footer Copyright Line

```
© [CURRENT_YEAR] Alaskan Air Conditioning & Heating. ROC# 240693. All rights reserved.
```
> Use dynamic year in code: `new Date().getFullYear()` — never hardcode.

---

## 2. BRAND VOICE — THE ALASKAFY GUIDELINES

This section governs tone and terminology for ALL copy on the site.
Deviation from these guidelines is a brand defect, not a style choice.

### 2.1 Core Voice Characteristics

| Trait | What it means in practice |
|---|---|
| **Confident** | State things plainly. "We do it right." Not "We try to do our best." |
| **Plain-spoken** | No HVAC jargon in customer-facing copy. "Your AC" not "your HVAC unit." |
| **Warm** | This is a family business since 1972. Write like you know the customer. |
| **Slightly playful** | The brand is named after Alaska and has a polar bear mascot. Lean into it lightly — never forced. |
| **Tucson-native** | Reference Tucson summer heat specifically. "Tucson summers" not "hot weather." |

### 2.2 The Alaskafy Terminology — Three Forms

These are branded proper nouns. Always capitalize them.

| Form | How to use | Example |
|---|---|---|
| **Alaskafy** (verb) | Action the technician performs on the system | "We'll Alaskafy your system before summer." |
| **Alaskafication** (noun, singular) | One service event | "Schedule your annual Alaskafication." |
| **Alaskafications** (noun, plural) | The service concept / line of service | "Alaskafications lower your energy bills and prevent breakdowns." |
| **Alaskafied** (adjective/past tense) | State after service is complete | "Your A/C isn't ready until it's Alaskafied." |

### 2.3 Do / Don't Examples

| ✅ DO write this | ❌ DON'T write this | Why |
|---|---|---|
| "Schedule your Alaskafication" | "Schedule your tune-up" | Tune-up is generic. Alaskafication is the brand. |
| "Get your system Alaskafied" | "Get your system serviced" | "Serviced" is forgettable. "Alaskafied" is ownable. |
| "Alaskafications keep your AC running all summer" | "Regular maintenance keeps your AC running" | First version ties the service to the brand. |
| "We do it the Alaskan way, not the cheap way" | "We provide quality service" | First version is specific, bold, and memorable. |
| "Keeping you chill since 1972" | "Serving the area for over 50 years" | First version uses brand voice. Second is generic. |
| "Tucson summers don't forgive a neglected AC" | "Hot weather can strain your HVAC system" | First is local and vivid. Second is national copy. |
| "Call (844) 364-5800 — we answer 24/7" | "Contact us for more information" | Always include the phone. Always give the next action. |

### 2.4 What "The Alaskan Way" Means

Every piece of content on service pages should convey at least one of these values,
which are the business's actual differentiators:

1. **Thoroughness over speed** — "Not the cheap way" is a brand statement about doing
   the full job, not cutting corners to turn the call faster.
2. **Honesty** — No upselling for parts the system doesn't need.
3. **NATE certification** — Their techs are trained to industry's highest standard.
4. **Trane Comfort Specialist** — Factory-trained on the brand they install/service.
5. **Since 1972** — Not a fly-by-night company. This is the most trust signal the brand has.

### 2.5 Tone Don'ts (Site-Wide)

- Never use "HVAC system" where "AC" or "air conditioner" is clearer to a homeowner
- Never use "we offer" — say "we do" or "we provide" or just state the service
- Never use "affordable" or "cheap" (except the brand phrase "not the cheap way")
- Never use "world-class" or "cutting-edge" — generic superlatives
- Never write a headline that starts with "Welcome to" or "At Alaskan Air, we..."
- Never put the business name first in an H1 — keyword-first, always

---

## 3. PAGE-BY-PAGE CONTENT SPECIFICATIONS

---

### PAGE 1: Homepage (`/`)

**Primary keyword:** `hvac tucson az`
**Secondary keywords:** `air conditioning tucson`, `ac repair tucson az`
**Target word count:** 900–1,200 words (body copy only, excluding nav/footer)
**Schema:** HVACBusiness + WebSite + WebPage (see SEO_SPEC.md §1.1)

#### Meta Tags
```
Title:       HVAC Tucson AZ | Alaskan Air Conditioning
             (42 chars ✓)
Description: Expert HVAC & air conditioning in Tucson, AZ. 4.7★ rated with 4,400+ reviews.
             Serving Tucson since 1972. Call (844) 364-5800.
             (141 chars ✓)
```

#### Hero Section
```
H1:          HVAC Tucson AZ — Alaskan Air Conditioning
Sub-headline: Alaskafications lower your energy bills and prevent breakdowns.
              4.7★ Rated · 4,400+ Reviews · Serving Tucson since 1972
Star line:   4.7★ · 4,400+ Google Reviews
CTA button 1: Schedule Now — Tucson
CTA button 2: Schedule Now — Phoenix
Emergency line: 24/7 Emergency Line: (844) 364-5800
```

#### Section 2: Trust Bar
Copy: see §1.2 above. Renders directly below hero, full width.

#### Section 3: Services Grid
```
Section heading: HVAC Services in Tucson & Phoenix, AZ
Section sub:     From annual Alaskafications to full system installations —
                 NATE-certified technicians you can trust.
```
Cards in order (see DESIGN_SYSTEM.md §5.6 for card layout):
1. **Alaskafy Your System** — "Our proprietary AC tune-up that goes far beyond a basic
   checkup. Your system isn't ready until it's Alaskafied."
2. **AC Installation** — "New system? We install Trane units sized right for your home,
   not the largest one that fits."
3. **Heating & Furnaces** — "Tucson winters get cold. Keep your furnace ready with
   expert heating service from Alaskan."
4. **Indoor Air Quality** — "Breathe easier. We test, filter, and improve the air
   inside your home."
```
Link below grid: See all HVAC services →  [/services/]
```

#### Section 4: Why Choose Us
```
Section heading: Why Tucson Chooses Alaskan Air Conditioning
```
Six differentiators (see DESIGN_SYSTEM.md §5.8):
1. **Since 1972** — Over 50 years keeping Tucson and Phoenix cool. We've outlasted
   every competitor that tried to undercut us.
2. **4,400+ Five-Star Reviews** — Rated 4.7★ on Google with thousands of verified reviews
   across Google, Nearby Now, and BBB.
3. **NATE-Certified Technicians** — NATE certification is the industry's highest technical
   standard. Your tech knows what they're doing.
4. **Trane Comfort Specialist** — Factory-trained on Trane systems. We install and service
   the brand we believe in.
5. **Google Guaranteed** — Background-checked, licensed, and bonded. Protected by Google.
6. **The Alaskafy Difference** — We maintain your system the Alaskan way — not the cheap
   way. That's why our customers stay with us for decades.

#### Section 5: Testimonials
```
Section heading: What Tucson Says About Us
Section sub:     4.7★ across 4,400+ reviews — here's why people keep calling Alaskan
```
⚠️ **CLIENT INPUT NEEDED:** 6 curated real review quotes (2–4 sentences each) with
reviewer first name and city (Tucson or Phoenix). Pull from Google Reviews or NearbyNow.
Prioritize reviews that mention: Alaskafication, specific techs by name, emergency service,
or years as a customer.

Format for each:
```
"[Quote]" — [First Name], [City]  ★★★★★
```

After testimonial grid:
```
Join 4,400+ satisfied customers in Tucson and Phoenix.
[Leave us a Google Review ★]  [Read more reviews on Google →]
```

#### Section 6: Service Area + Map
```
Heading: Serving Tucson & Phoenix, AZ Since 1972
Body:    Alaskan Air Conditioning & Heating serves homeowners and businesses throughout
         Tucson and the greater Phoenix area. Our NATE-certified technicians are familiar
         with the specific demands Arizona summers put on HVAC systems — and we keep our
         response times fast because we know a broken AC in Tucson is never optional.
```
Google Maps embed (Tucson) — see DESIGN_SYSTEM.md §5.11.

#### Section 7: Footer
See §1.3–1.5 for global footer copy. Both Tucson and Phoenix NAP blocks.

---

### PAGE 2: Services Hub (`/services/`)

**Primary keyword:** `hvac services tucson`
**Target word count:** 500–700 words
**Schema:** WebPage + BreadcrumbList

#### Meta Tags
```
Title:       HVAC & Air Conditioning Services Tucson AZ | Alaskan
             (56 chars ✓)
Description: Full-service HVAC in Tucson & Phoenix — AC maintenance, installation,
             heating, and indoor air quality. NATE-certified. Call (844) 364-5800.
             (155 chars ✓)
```

#### Page Content
```
H1:   HVAC & Air Conditioning Services in Tucson & Phoenix, AZ
Sub:  NATE-certified technicians. Serving Arizona since 1972.
      From our signature Alaskafications to full system replacements — we do it right.
```

Intro paragraph (2–3 sentences):
> Alaskan Air Conditioning & Heating has been the trusted HVAC company for Tucson and
> Phoenix homeowners since 1972. Whether you need your system Alaskafied before summer,
> a new Trane installation, or emergency heating repair — our NATE-certified team handles it.

Service cards (expanded grid — 4 cards, same as homepage but with longer descriptions):
Each card: same title + 2-sentence description + "Learn more about [Service] →" link.

Closing CTA block:
```
Heading: Not sure what your system needs?
Body:    Call (844) 364-5800 and describe what you're experiencing.
         Our team will tell you exactly what's going on — no upsell, no guesswork.
Button:  Schedule a Service Call   [→ /contact/]
```

---

### PAGE 3: Alaskafy Your System (`/alaskafy-your-system/`)

**Primary keywords:** `ac tune up tucson`, `hvac maintenance tucson`
**Secondary:** `alaskafication hvac tucson`, `ac maintenance tucson az`
**Target word count:** 900–1,100 words
**Schema:** Service + FAQPage (for the FAQ section) + BreadcrumbList
**Design note:** This is the SIGNATURE service — give it hero-level visual treatment.
Use a featured banner or badge: "★ Our Signature Service"

#### Meta Tags
```
Title:       Alaskafy Your System | AC Tune-Up Tucson AZ | Alaskan
             (56 chars ✓)
Description: Alaskafications are Alaskan's signature AC maintenance service — more thorough
             than a basic tune-up. Serving Tucson & Phoenix. Call (844) 364-5800.
             (159 chars ✓)
```

#### Page Content Structure

**Hero:**
```
H1:   Alaskafy Your System — AC Maintenance in Tucson & Phoenix, AZ
Sub:  Your A/C isn't ready for a Tucson summer until it's Alaskafied.
      More thorough than a basic tune-up. Guaranteed.
```

**Section 1: What Is an Alaskafication?** (~150 words)
> An Alaskafication is Alaskan Air Conditioning's proprietary maintenance service — our
> version of an AC tune-up, built around one principle: we do it right, not cheap.
>
> A basic tune-up from most companies takes 20 minutes and checks a few boxes. An
> Alaskafication is a thorough inspection, cleaning, and optimization of your entire
> system. When we're done, your AC is ready for a Tucson summer — not just technically
> running, but running at full efficiency.
>
> "Your A/C isn't ready until it's Alaskafied." That's not marketing copy. That's our
> standard.

⚠️ **CLIENT INPUT NEEDED:** The complete checklist of what an Alaskafication includes
(every item inspected, cleaned, tested, adjusted). This is your key differentiator —
list every step. The more specific this list, the more it justifies the Alaskan premium
over competitors.

**Section 2: Signs You Need an Alaskafication** (~100 words)
Use a bulleted list (6–8 items):
- Your energy bills have increased without a change in usage
- Your AC is running but the house isn't as cool as it used to be
- You hear unusual noises from the unit (clicking, banging, squealing)
- Your system hasn't been serviced in 12+ months
- You're heading into Tucson summer and want peace of mind
- Your thermostat and AC don't seem to agree
- You've noticed more dust or humidity inside the house

**Section 3: What to Expect — The Alaskan Process** (~150 words)
> Here's what happens when we Alaskafy your system:
1. We schedule around your availability — no 4-hour windows
2. Our NATE-certified technician arrives on time, in uniform, in a marked vehicle
3. [ALASKAFICATION CHECKLIST ITEMS — client to provide]
4. We show you exactly what we found and what we did — no jargon, no fear tactics
5. Your system leaves the visit Alaskafied — running clean, efficient, and ready

**Section 4: Why Choose Alaskan for Your Alaskafication** (~100 words)
> - NATE-certified technicians — the industry's highest standard
> - Trane Comfort Specialist — factory-trained on the systems we service
> - Google Guaranteed — background-checked and bonded
> - Serving Tucson and Phoenix since 1972 — over 50 years of Alaskafications
> - 4.7★ from 4,400+ verified customers — they know the difference

**Section 5: FAQ (3 questions)** — these populate FAQPage schema
```
Q: What is included in an Alaskafication?
A: [CLIENT INPUT — provide specific checklist]. An Alaskafication goes far beyond
   a standard tune-up — it's a complete inspection, cleaning, and optimization
   of your entire HVAC system. Call (844) 364-5800 for the full details.

Q: How often should I Alaskafy my system in Tucson?
A: Once a year, ideally in spring before Tucson's summer heat arrives. If your system
   runs year-round (which most Tucson ACs do), a mid-year check in fall is also smart.

Q: How long does an Alaskafication take?
A: [CLIENT INPUT — typical service duration]. We don't rush it. An Alaskafication
   takes as long as it takes to do it right.
```

**Section 6: CTA**
```
Heading: Ready to Alaskafy Your System?
Body:    Don't wait until your AC quits on a 108° Tucson day.
         Schedule your Alaskafication now — we serve Tucson and Phoenix.
Button:  Schedule Your Alaskafication   [→ booking widget / /contact/]
Phone:   Or call (844) 364-5800 — we answer 24/7
```

---

### PAGE 4: AC Installation (`/ac-installation/`)

**Primary keyword:** `ac installation tucson az`
**Secondary:** `new ac unit tucson`, `air conditioner replacement tucson`
**Target word count:** 800–1,000 words
**Schema:** Service + BreadcrumbList

#### Meta Tags
```
Title:       AC Installation Tucson AZ | Free Quotes | Alaskan
             (51 chars ✓)
Description: New AC unit installation & replacement in Tucson & Phoenix. Free quotes,
             Trane systems, NATE-certified install. Call (844) 364-5800.
             (145 chars ✓)
```

#### Page Content Structure
```
H1:   AC Installation & Replacement in Tucson & Phoenix, AZ
Sub:  Free quotes on new Trane systems. Sized right for your home — not oversized.
      NATE-certified installation from Alaskan Air Conditioning.
```

**Section 1: What Is AC Installation?** (~120 words)
> A new AC installation isn't just swapping one unit for another. Done right, it's a
> system design decision: the right capacity for your home's square footage, insulation,
> and sun exposure. Oversize it and the system short-cycles, never removes humidity, and
> breaks down sooner. Undersize it and it runs constantly trying to keep up with a Tucson
> summer.
>
> Alaskan does a proper load calculation before recommending a system size. We're a Trane
> Comfort Specialist — meaning we're factory-trained on the brand we install, and we stand
> behind the equipment we put in.

**Section 2: Signs You Need a Replacement** (~100 words, bulleted)
- Your system is more than 12–15 years old
- Repair costs are approaching 50% of replacement cost
- Your energy bills have climbed steadily despite regular maintenance
- The system uses R-22 refrigerant (no longer manufactured — parts are scarce and expensive)
- You've had 2+ major repairs in the last two years
- Your home never quite reaches the set temperature on hot days

**Section 3: Our Installation Process** (~150 words)
1. Free in-home quote — we measure, assess, and calculate the right system size
2. Equipment recommendation — Trane systems with warranty options explained clearly
3. Scheduling that works around you
4. Professional installation by NATE-certified technicians
5. System startup and walkthrough — we show you how everything works
6. Post-install Alaskafication — your new system gets the Alaskan treatment from day one

**Section 4: Why Alaskan for Your New System** (~100 words)
Same differentiator structure as Alaskafy page, adapted to installation context:
- Trane Comfort Specialist (emphasize brand trust)
- NATE-certified (emphasize installation quality)
- Since 1972 (emphasize longevity/accountability)
- Free quotes, no-pressure recommendations

**Section 5: FAQ (3 questions)**
```
Q: How much does AC installation cost in Tucson?
A: The cost of a new AC system in Tucson varies based on system size, equipment
   brand, and installation complexity — typically ranging from [CLIENT INPUT: price
   range or "call for a free quote"]. Alaskan provides free, no-obligation quotes with
   a full breakdown before any work begins. Call (844) 364-5800.

Q: How long does AC installation take?
A: Most standard residential installations are completed in one day.
   Complex retrofits or duct modifications may require a second visit.

Q: Should I repair or replace my AC unit?
A: The general rule: if the repair cost exceeds 50% of a new system's cost, or your
   system is over 12 years old, replacement is usually the better investment.
   We'll tell you honestly which makes sense for your situation.
```

**Section 6: CTA**
```
Heading: Get a Free Quote on a New AC System
Body:    No pressure. No obligation. Just an honest recommendation from a Trane
         Comfort Specialist who's been doing this in Tucson since 1972.
Button:  Get My Free Quote   [→ /contact/]
Phone:   Or call (844) 364-5800
```

---

### PAGE 5: Heating & Furnaces (`/heating-and-furnaces/`)

**Primary keyword:** `heating repair tucson az`
**Secondary:** `furnace repair tucson`, `hvac heating tucson`
**Target word count:** 700–900 words
**Schema:** Service + BreadcrumbList

#### Meta Tags
```
Title:       Heating & Furnace Service Tucson AZ | Alaskan AC
             (48 chars ✓)
Description: Furnace repair, heating maintenance & installation in Tucson & Phoenix.
             NATE-certified. Serving Arizona since 1972. Call (844) 364-5800.
             (148 chars ✓)
```

#### Page Content Structure
```
H1:   Heating & Furnace Service in Tucson & Phoenix, AZ
Sub:  Tucson winters get cold fast. Keep your furnace ready with expert heating
      service from Alaskan Air Conditioning — trusted since 1972.
```

Follow the same 6-section service page structure:
1. **What we do** — heating repair, maintenance, and installation for both gas furnaces and
   heat pumps. Note: Tucson homes often use heat pumps that run year-round as both heating
   and cooling — Alaskan services both modes.
2. **Signs you need heating service** — system won't start, uneven heat, unusual smells
   (burning dust on first use of season is normal; burning plastic or gas smell is not),
   high heating bills, system older than 15 years
3. **Our process** — same NATE-certified, honest-assessment approach
4. **Why Alaskan** — same differentiators, adapted to heating context
5. **FAQ (3 questions)**:
   - Q: How often should I service my furnace in Tucson?
     A: Once a year before the heating season (October–November). Even in Tucson's mild
        winters, an unserviced furnace can fail on the coldest night.
   - Q: How long does a furnace or heat pump last?
     A: A well-maintained furnace typically lasts 15–20 years. Heat pumps: 12–15 years.
        Annual servicing extends both lifespans significantly.
   - Q: Do you service heat pumps as well as furnaces?
     A: Yes. Many Tucson homes use heat pumps for year-round heating and cooling.
        Our technicians are trained on both systems.
6. **CTA** — "Schedule Heating Service" → booking widget / /contact/

---

### PAGE 6: Indoor Air Quality (`/indoor-air-quality/`)

**Primary keyword:** `indoor air quality tucson az`
**Secondary:** `air purifier tucson`, `hvac air filtration tucson`
**Target word count:** 600–800 words
**Schema:** Service + BreadcrumbList

#### Meta Tags
```
Title:       Indoor Air Quality Services Tucson AZ | Alaskan AC
             (52 chars ✓)
Description: Indoor air quality testing, filtration & purification in Tucson & Phoenix.
             Breathe easier with Alaskan Air Conditioning. Call (844) 364-5800.
             (152 chars ✓)
```

#### Page Content Structure
```
H1:   Indoor Air Quality Services in Tucson & Phoenix, AZ
Sub:  What's in the air you're breathing at home? Alaskan tests, filters,
      and improves indoor air quality for Tucson and Phoenix homeowners.
```

Follow 6-section structure. Key Tucson-specific angle:
- Tucson has high desert dust, pollen, and wildfire smoke season
- Older duct systems accumulate significant particulate
- Reference Alaskafication including IAQ check component (link to /alaskafy-your-system/)

⚠️ **CLIENT INPUT NEEDED:** Specific IAQ products and services offered (brands of
air purifiers, UV systems, filtration grades, duct cleaning — whatever Alaskan actually
sells and installs). Without this list, Section 1 and Section 3 cannot be completed.

---

### PAGE 7: Contact (`/contact/`)

**Primary keyword:** `hvac company tucson az`
**Target word count:** 300–400 words (mostly UI, not body copy)
**Schema:** HVACBusiness with openingHours + BreadcrumbList

#### Meta Tags
```
Title:       Contact Alaskan Air Conditioning — Tucson, AZ
             (47 chars ✓)
Description: Contact Alaskan Air Conditioning & Heating in Tucson & Phoenix. Call
             (844) 364-5800 or send a message. We respond within 1 business hour.
             (153 chars ✓)
```

#### Page Content
```
H1:   Contact Alaskan Air Conditioning — Tucson & Phoenix, AZ
Sub:  Call, schedule online, or send us a message.
      We respond within 1 business hour during business hours.
```

**Contact Options Section:**
```
Column 1: Call Us
  (844) 364-5800
  24/7 for emergencies
  [Schedule Now →]

Column 2: Tucson Office
  2305 N 7th Ave
  Tucson, AZ 85705
  [Get Directions →]    ← links to Google Maps
  ⚠️ HOURS: CLIENT INPUT NEEDED

Column 3: Phoenix Office
  ⚠️ ADDRESS: CLIENT INPUT NEEDED
  Phoenix, AZ
  [Get Directions →]
  ⚠️ HOURS: CLIENT INPUT NEEDED
```

**Contact Form — Labels and Placeholder Text:**

| Field | Label | Placeholder | Required |
|---|---|---|---|
| Name | Your Name | First and last name | Yes |
| Phone | Phone Number | (555) 555-5555 | Yes |
| Service | Service Needed | Select a service… | Yes |
| Location | Your Location | Tucson or Phoenix? | Yes |
| Message | Message (optional) | Tell us what's going on — the more detail, the better | No |
| Submit button | — | `Send Message — We'll Call You Back` | — |

Service dropdown options (exact):
```
AC Maintenance / Alaskafication
AC Installation or Replacement
AC Repair
Heating & Furnace Service
Indoor Air Quality
Emergency Service
Other
```

**Form success message (replaces form on submit):**
```
Heading: Message received — thank you!
Body:    We'll call you back within 1 business hour during business hours.
         For emergencies, call (844) 364-5800 — we answer 24/7.
```

**Below form:** Google Maps embed (Tucson location) — see DESIGN_SYSTEM.md §5.11.

---

### PAGE 8: About (`/about/`)

**Primary keyword:** `hvac contractor tucson`
**Secondary:** `alaskan air conditioning history`
**Target word count:** 500–700 words
**Schema:** WebPage + BreadcrumbList

#### Meta Tags
```
Title:       About Alaskan Air Conditioning | Tucson HVAC Since 1972
             (57 chars ✓)
Description: Alaskan Air Conditioning & Heating has served Tucson & Phoenix since 1972.
             Meet our team, learn our story, and see why 4,400+ customers trust us.
             (154 chars ✓)
```

#### Page Content Structure
```
H1:   About Alaskan Air Conditioning & Heating
Sub:  Keeping Tucson and Phoenix cool since 1972 — over 50 years,
      4,400+ reviews, and one promise: we do it the Alaskan way.
```

**Section 1: Our Story** (~150 words)
⚠️ **CLIENT INPUT NEEDED:** The actual founding story. Key questions to answer:
- Who founded the company and why?
- Why "Alaskan" — what's the origin of the name and polar bear mascot?
- What was Tucson HVAC like in 1972, and what made Alaskan different?
- Has the company been family-owned throughout?
- Any notable milestones (serving a major client, surviving the 2008 recession, etc.)?

Placeholder structure for copywriter:
> In 1972, [FOUNDER NAME] started Alaskan Air Conditioning with one truck and one idea:
> [FOUNDER PHILOSOPHY IN THEIR WORDS]. Over 50 years later, [COMPANY EVOLUTION — team
> size, locations, etc.].
>
> The name "Alaskan" wasn't an accident. [BRAND NAME ORIGIN STORY]. That same spirit
> is in everything we do — including the Alaskafication, our proprietary maintenance
> service that goes far beyond a standard tune-up.

**Section 2: Meet Our Team** (~100 words intro + team grid)
⚠️ **CLIENT INPUT NEEDED:** Team photos (real, not stock), names, and titles for at
minimum: owner/GM, lead technician(s), office manager. Real faces = higher conversion
for a business inviting technicians into customers' homes.

**Section 3: Our Certifications** (~100 words)
> Alaskan Air Conditioning holds certifications that most HVAC companies in Tucson don't.
> These aren't plaques on the wall — they're ongoing training standards our technicians
> meet every year.

List with brief description of each:
- **NATE Certified** — North American Technician Excellence. The HVAC industry's highest
  technical standard for installation and service.
- **Trane Comfort Specialist** — Factory-certified by Trane. Means we're trained on the
  brand we install and can stand behind it fully.
- **Google Guaranteed** — Passed Google's background check and licensing verification.
  Your protection if something goes wrong.
- **ACCA Member** — Air Conditioning Contractors of America. Industry standards and ethics.
- **Energy Star Partner** — Committed to energy-efficient equipment and practices.
- **ROC# 240693** — Arizona Registrar of Contractors license. Licensed and insured.

**Section 4: Why the Alaskafy Concept Exists** (~100 words)
> Most AC maintenance in this industry is a checkbox exercise — show up, look at the
> unit, leave in 20 minutes. We saw that and decided to do something different.
>
> The Alaskafication came out of a simple question: what would we want done to our own
> home's system? [EXPAND WITH CLIENT INPUT — origin of the service concept].
>
> That's why customers who get an Alaskafication see lower energy bills and fewer
> breakdowns. It's not magic — it's just doing the job right.

**CTA:**
```
Ready to experience the Alaskan difference?
[Schedule Your Alaskafication →]   [Call (844) 364-5800]
```

---

### PAGE 9: FAQ (`/faq/`)

**Primary keyword:** `hvac faq tucson az`
**Target word count:** 1,000–1,400 words
**Schema:** FAQPage (CRITICAL — every Q&A must have Question + Answer schema)
**SEO note:** This page competes for featured snippets. Answers must be complete and
self-contained — Google pulls them directly from the page.

#### Meta Tags
```
Title:       HVAC & AC FAQ | Alaskan Air Conditioning | Tucson, AZ
             (55 chars ✓)
Description: Common HVAC questions answered by Alaskan Air Conditioning — serving
             Tucson & Phoenix since 1972. AC maintenance, installation, cost & more.
             (157 chars ✓)
```

#### Page Content
```
H1:   HVAC & Air Conditioning FAQ — Alaskan Air Conditioning Tucson, AZ
Sub:  Questions about your AC, heating, or our Alaskafication service?
      We've answered the most common ones below.
```

**Q&A Blocks — Exact Copy for Each**

---
**Q1: How often should I service my AC in Tucson?**
> Once a year, ideally in spring before temperatures climb above 100°F. Tucson's
> extreme summer heat puts more stress on AC systems than almost anywhere in the
> country — a system that hasn't been serviced can fail precisely when you need it
> most. If your system runs year-round (which most Tucson ACs do), a fall check before
> the heating season is smart too. An annual Alaskafication covers both modes.
> [Link: "Schedule your Alaskafication →" → /alaskafy-your-system/]

---
**Q2: What is an Alaskafication and what does it include?**
> An Alaskafication is Alaskan Air Conditioning's proprietary maintenance service —
> our version of an AC tune-up, done the right way instead of the cheap way.
> [CLIENT INPUT: specific checklist items here]
> Unlike a standard 20-minute checkup, an Alaskafication is a thorough inspection,
> cleaning, and optimization of your entire system. When we're done, your AC is ready
> for a Tucson summer — not just running, but running efficiently.
> [Link: "Learn more about Alaskafications →" → /alaskafy-your-system/]

---
**Q3: What size AC unit do I need for my home in Tucson?**
> AC sizing is calculated based on your home's square footage, ceiling height, insulation
> quality, window area, and sun exposure — not a simple rule of thumb. In Tucson's climate,
> an oversized unit is actually a common mistake: it cools too fast, short-cycles, and
> never removes humidity properly. Alaskan performs a proper load calculation (Manual J)
> before recommending a system size. Call (844) 364-5800 for a free quote.

---
**Q4: Why is my air conditioner blowing warm air?**
> The most common causes: low refrigerant (possibly a leak), a dirty air filter blocking
> airflow, a failing compressor, or a thermostat set incorrectly (check it's set to
> "cool," not "fan only"). If your filter is clean and thermostat is correct, call
> (844) 364-5800 — warm air usually means a refrigerant or mechanical issue that needs
> a technician.

---
**Q5: How long does an HVAC system last?**
> A well-maintained central air conditioner in Tucson typically lasts 12–15 years.
> Heat pumps: similar. Furnaces: 15–20 years. Systems in Tucson work harder than in
> most climates due to the extreme summer heat, which shortens lifespan compared to
> national averages. Regular Alaskafications extend system life measurably — most of
> our longest-running customers' systems outlast the average by 3–5 years.

---
**Q6: Should I repair or replace my AC unit?**
> The general rule: if the repair cost exceeds 50% of what a new system would cost, or
> your system is over 12 years old, replacement is usually the smarter investment. A new
> Trane system also saves money on energy bills — today's units are significantly more
> efficient than systems from 10+ years ago. We'll tell you honestly which makes more
> sense for your situation. We don't make money on fear.

---
**Q7: What's the best thermostat setting for summer in Tucson?**
> The Department of Energy recommends 78°F when you're home, 85°F when you're away.
> Every degree you raise the setpoint reduces cooling costs by about 3%. For Tucson
> summers: a programmable or smart thermostat pays for itself in one season. We install
> and configure smart thermostats as part of new system installations and Alaskafications.

---
**Q8: How much does AC installation cost in Tucson?**
> The cost depends on system size, efficiency rating (SEER), equipment brand, and
> installation complexity. ⚠️ **CLIENT INPUT NEEDED:** Provide a realistic price range
> or a "starting from" figure, OR use: "Call (844) 364-5800 for a free, no-obligation
> quote — we provide full written estimates before any work begins."

---
**Closing CTA:**
```
Still have questions? We're happy to talk through your situation.
[Contact Us →]   [Call (844) 364-5800]
```

---

### PAGE 10: Tucson Location (`/tucson-az/`)

**Primary keyword:** `air conditioning tucson az`
**Secondary:** `hvac company tucson`, `ac repair tucson`
**Target word count:** 900–1,100 words (current crawl: 1,088 ✓ — refresh, don't reduce)
**Schema:** HVACBusiness (Tucson-specific entity) + BreadcrumbList

#### Meta Tags
```
Title:       Alaskan Air Conditioning & Heating | Tucson, AZ
             (47 chars ✓)
Description: Trusted HVAC company in Tucson, AZ since 1972. AC repair, maintenance &
             installation. 4.7★ rated. Call (844) 364-5800.
             (132 chars ✓)
```

#### Page Content
```
H1:   HVAC & Air Conditioning Services in Tucson, AZ
Sub:  Keeping Tucson chill since 1972. Your trusted local HVAC company —
      NATE-certified, Google Guaranteed, and Alaskafied.
```

**Key sections for this page:**
1. Intro paragraph: Tucson-specific (reference the summer heat, local neighborhoods)
2. Services grid (same as homepage but with "in Tucson, AZ" appended to each card title)
3. Tucson service areas list — neighborhoods and zip codes served
4. Tucson-specific testimonials (pull reviews mentioning Tucson neighborhoods)
5. Tucson NAP block + Google Maps embed (Tucson)
6. Link to /phoenix-az/ for Phoenix customers

⚠️ **CLIENT INPUT NEEDED:** List of Tucson neighborhoods and zip codes served.
Current site has a "Tucson Service Areas" H2 section — pull the current neighborhood
list and update it.

---

### PAGE 11: Phoenix Location (`/phoenix-az/`)

**Primary keyword:** `air conditioning phoenix az`
**Secondary:** `hvac company phoenix`, `ac repair phoenix`
**Target word count:** 900–1,100 words (current crawl: 1,139 ✓ — refresh, don't reduce)
**Schema:** HVACBusiness (Phoenix-specific entity) + BreadcrumbList

#### Meta Tags
```
Title:       Alaskan Air Conditioning & Heating | Phoenix, AZ
             (48 chars ✓)
Description: Trusted HVAC company in Phoenix, AZ. AC repair, maintenance & installation.
             NATE-certified. Serving Phoenix since 1972. Call (844) 364-5800.
             (152 chars ✓)
```

#### Page Content
```
H1:   HVAC & Air Conditioning Services in Phoenix, AZ
Sub:  Keeping Phoenix chill since 1972. Expert HVAC service from a company
      that's been in Arizona longer than most of your neighbors.
```

Same structure as Tucson page, with Phoenix-specific:
- Service areas / neighborhoods
- Phoenix NAP block (⚠️ address CLIENT INPUT NEEDED)
- Google Maps embed (Phoenix — ⚠️ Place ID CLIENT INPUT NEEDED)
- Phoenix-specific testimonials

---

## 4. CLIENT INPUT CONSOLIDATED CHECKLIST

All items flagged throughout this document, organized for a single client meeting:

### Must Have Before Build Starts
- [ ] Phoenix street address (exact, must match Phoenix GBP listing)
- [ ] Phoenix GBP phone number (canonical number on the Phoenix Google Business Profile)
- [ ] Business hours — both Tucson and Phoenix (Mon–Sun, including holiday hours)
- [ ] Alaskafication service checklist (every step performed during service)

### Must Have Before Launch
- [ ] SVG or high-res PNG logo file
- [ ] High-resolution hero photo (van + technicians — uncompressed original)
- [ ] Team photos (owner, techs, office staff) — real, not stock
- [ ] 6–9 curated real review quotes (name + city + content)
- [ ] Phoenix service area neighborhoods / zip codes
- [ ] Tucson service area neighborhoods / zip codes (update from current site)
- [ ] AC installation price range or preferred quote CTA language
- [ ] Alaskafication service duration (how long does a typical visit take?)

### Nice to Have (Can Launch Without, Fill Later)
- [ ] Founding story details (founder name, origin of brand name, company history)
- [ ] IAQ products and services specific list (brands, model names)
- [ ] Team bios (2–3 sentences per person)
- [ ] Before/after job photos for a future gallery page
