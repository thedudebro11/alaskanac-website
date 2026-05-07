# Alaskan AC — Image & Asset Generation Prompts
## Brand colors: Blue #1B6CA8 · Orange #E8670A · Navy #0C1A2E · White #FFFFFF

---

## HOW TO USE THIS FILE

- **Midjourney**: Paste the prompt directly into Discord. All prompts include `--ar` and `--v 6.1` parameters.
- **DALL-E 3 (ChatGPT)**: Paste the prompt, remove the `--` parameters at the end — DALL-E doesn't use them.
- **After generating**: Any logo/mascot image needs to be vectorized at **vectorizer.ai** (free) before use in the site. Upload the PNG → download SVG.
- **File naming**: Save files using the names listed under each prompt. Drop into `/public/images/`.

---

## ASSET 1 — Primary Polar Bear Logo Mascot
**File to save as:** `polar-bear-logo.png` → vectorize → `polar-bear-logo.svg`
**Used in:** Header logo, favicon, footer

### Midjourney Prompt:
```
Friendly professional polar bear mascot logo for an HVAC company called "Alaskan Air Conditioning". The polar bear is sitting upright with a confident smile, wearing a blue work shirt or holding a small AC unit. Clean flat vector illustration style. Bold black outlines. Color palette: medium blue #1B6CA8, white, with a small orange #E8670A accent on the uniform or badge. Circular badge composition with the bear centered. Pure white background. No text. Simple enough to work as a favicon at 16px. --ar 1:1 --v 6.1 --style raw --q 2
```

### DALL-E 3 Prompt:
```
Friendly professional polar bear mascot logo for an HVAC company called "Alaskan Air Conditioning". The polar bear is sitting upright with a confident smile, wearing a blue work shirt. Clean flat vector illustration style with bold outlines. Color palette: medium blue, white, with a small orange accent. Circular badge composition with the bear centered. Pure white background. No text. Simple enough to work as a favicon.
```

### What to look for in results:
- Bear should be clearly a polar bear (white fur, black nose)
- Expression: friendly, professional — not scary or overly cartoonish
- Should read clearly at small sizes
- The circular badge frame is important for use in the header

### Variations to generate (run separately):
- `--no tools, wrench, equipment` → cleaner mascot-only version
- Try: bear holding a snowflake instead of AC unit
- Try: bear with a thumbs up

---

## ASSET 2 — Full-Body Polar Bear Hero Mascot
**File to save as:** `polar-bear-hero.png` → vectorize → `polar-bear-hero.svg`
**Used in:** Homepage hero right column (when real team photo isn't available), Alaskafy page

### Midjourney Prompt:
```
Full body polar bear mascot character for an HVAC company. The bear is standing confidently, wearing a blue uniform with an orange logo patch. One paw giving thumbs up, other holding a clipboard or small snowflake. Flat vector illustration style. Clean bold outlines. White and blue color palette with orange accents. Transparent or white background. Professional mascot character design, not childish. --ar 3:4 --v 6.1 --style raw --q 2
```

---

## ASSET 3 — Hero Background Atmosphere
**File to save as:** `hero-bg-texture.webp`
**Used in:** Homepage hero section background overlay, any dark section that needs depth
**Final size:** 1920×1080px minimum, compress to WebP under 150KB

### Midjourney Prompt:
```
Abstract dark atmospheric background for HVAC website hero section. Deep navy blue to dark teal gradient. Subtle ice crystal frost patterns in the distance, barely visible. Soft bokeh light particles. Cool temperature feeling. No people, no text, no equipment. Cinematic dark mood. Suitable for white text overlay. Ultra wide format. --ar 16:9 --v 6.1 --style raw --q 2
```

### DALL-E 3 Prompt:
```
Abstract dark atmospheric background for a website hero section. Deep navy blue gradient with subtle ice crystal frost patterns barely visible in the background. Soft light particles bokeh effect. Cool temperature mood. No people, no text, no objects. Designed for white text to be placed over it.
```

---

## ASSET 4 — Service Van Hero Photo (AI Placeholder)
**File to save as:** `hero-van-team.webp`
**Used in:** Homepage hero right column
**Note:** Replace with real client photo when available. This is only for development.

### Midjourney Prompt:
```
Professional HVAC service technician van parked in front of a residential home in Arizona desert landscape. Van is white with blue and orange company graphics. Sunny day, blue sky. Clean modern photography style. Photorealistic. No visible text or logos. Shot from a 3/4 angle showing the full van. --ar 4:3 --v 6.1 --style raw --q 2
```

---

## ASSET 5 — Frost/Ice Section Background Texture
**File to save as:** `frost-texture.webp`
**Used in:** Subtle overlay on dark sections, header scrolled state background
**Final size:** 800×800px tileable, under 60KB WebP

### Midjourney Prompt:
```
Close-up macro photography of frozen ice surface texture. Crystalline frost patterns, white and light blue tones. Very subtle, almost white, high key lighting. Seamlessly tileable texture. Abstract, no focal point. Suitable as a subtle overlay at 10-15% opacity. --ar 1:1 --v 6.1 --style raw --tile --q 2
```

---

## ASSET 6 — "Polar Bears" Team Illustration
**File to save as:** `polar-bears-team.png` → `polar-bears-team.webp`
**Used in:** About page, Why Choose Us section accent

### Midjourney Prompt:
```
Group of three cartoon polar bears in blue HVAC technician uniforms. They are standing together as a team, each holding different tools: one with a wrench, one with a clipboard, one giving thumbs up. Flat vector illustration style. Friendly professional characters. Blue uniforms with orange badge accents. White background. Team photo composition. --ar 3:2 --v 6.1 --style raw --q 2
```

---

## ASSET 7 — Snowflake Icon Set
**File to save as:** `icon-snowflake-lg.svg`, `icon-snowflake-sm.svg`
**Used in:** Section accents, decorative elements, service card backgrounds

### Midjourney Prompt:
```
Single geometric snowflake icon, clean minimal design, 6-fold symmetry, thin elegant lines, white on transparent background, vector style, suitable for use as a decorative watermark, no gradients, pure geometric shapes --ar 1:1 --v 6.1 --style raw --no color, shading, shadow
```

**Better approach:** Generate these at draw.io, Figma, or use an icon library.
Recommended free source: **heroicons.com** → search "snowflake" or use the SVG I already built into the codebase.

---

## ASSET 8 — Alaskafy Service Page Hero
**File to save as:** `alaskafy-hero.webp`
**Used in:** `/alaskafy-your-system/` page hero section

### Midjourney Prompt:
```
HVAC air conditioning technician performing a professional AC maintenance service on a residential central air unit outside a home. Arizona suburban neighborhood. Technician is focused and professional, wearing blue uniform. Photorealistic high quality photography. Warm outdoor lighting, blue sky. Shot from behind or side angle showing the technician working. --ar 16:9 --v 6.1 --style raw --q 2
```

---

## POST-PROCESSING NOTES

### Vectorizing raster images (for logos/mascots):
1. Go to **vectorizer.ai** (free, no account needed)
2. Upload the PNG from Midjourney
3. Download the SVG
4. Open in **Inkscape** (free) or **Illustrator** to clean up stray paths
5. Save as optimized SVG

### Compressing for web:
1. Go to **squoosh.app** (free, browser-based)
2. Convert to WebP
3. Target: Hero images < 120KB, textures < 60KB, illustrations < 80KB
4. Quality setting: 82 usually hits the right balance

### Checking file sizes before committing:
```bash
ls -lh public/images/
```

---

## WHAT NEEDS REAL CLIENT PHOTOS (do not use AI)

| Asset | Why real photo matters |
|---|---|
| Team/technician photos | AI people look uncanny — kills trust |
| Specific van/truck photos | Needs to match actual vehicle livery |
| Owner portrait (About page) | Personal trust signal — must be real |
| Job site before/after | Authenticity is the point |

These block the About page and testimonials section from launching. Flag to client.
