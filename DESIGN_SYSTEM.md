# Design System - Crafted Bathrooms

## Typography

### Font Families

#### Gilroy (Primary - Sans Serif)
- **Usage:** Body text, headings, UI elements
- **Weights Available:**
  - Thin (100)
  - Light (300)
  - Regular (400)
  - Medium (500)
  - Semibold (600)
  - Bold (700)
  - Extra Bold (800)
  - Heavy (900)
  - Black (950)
- **Tailwind Classes:** `font-gilroy` or `font-sans` (default)

#### Rexton (Secondary - Serif)
- **Usage:** Headings, display text, elegant typography
- **Weights Available:**
  - Light (300)
  - Regular (400)
  - Medium (500)
  - Bold (700)
  - Extra Bold (800)
  - Black (900)
- **Tailwind Classes:** `font-rexton` or `font-serif`

### Usage Examples

```tsx
// Gilroy (default)
<h1 className="font-gilroy font-bold">Heading</h1>
<p className="font-sans">Body text</p>

// Rexton
<h2 className="font-rexton font-bold">Elegant Heading</h2>
```

## Logo

### Variants

The Logo component supports three variants:

1. **Black** (default)
   ```tsx
   <Logo variant="black" />
   ```

2. **White**
   ```tsx
   <Logo variant="white" />
   ```

3. **With Tagline**
   ```tsx
   <Logo variant="with-tagline" />
   ```

### Usage

```tsx
import Logo from '@/components/ui/Logo'

<Logo variant="black" width={200} height={60} />
```

## Assets Structure

```
public/assets/
├── fonts/
│   ├── Gilroy/          # Primary font family
│   └── Rexton/          # Secondary font family
├── logo.svg/
│   ├── Logo SVG-Black.svg
│   ├── Logo SVG-White.svg
│   └── Logo+Tagline PNGs-05.png
├── favicon.ico/
│   ├── 16x16.png
│   ├── 32x32.png
│   ├── 180x180.png
│   └── 192x192.png
├── hero-bg.jpg/
│   ├── freepik__enhance__92160.jpg
│   └── freepik__enhance__92160.webp
└── pdfs/
    └── THE COLOURED FINISHES SS26-01.jpg
```

## Color System

### Primary Color
- **Main:** `#302620` (Dark brown/charcoal)
- **Usage:** Primary actions, headings, important elements
- **Tailwind Classes:** `bg-primary-900`, `text-primary-900`, `border-primary-900`
- **Scale:** 50 (lightest) to 950 (darkest)

### Accent Color
- **Main:** `#bea98e` (Beige/taupe)
- **Usage:** Highlights, CTAs, important accents
- **Tailwind Classes:** `bg-accent-500`, `text-accent-500`
- **Scale:** 50 to 950

### Background
- **Color:** Pure white (`#ffffff`)
- **Usage:** All page backgrounds
- **Tailwind Class:** `bg-white`

### Neutral Colors
- **Usage:** Text, borders, secondary elements
- **Tailwind Classes:** `bg-neutral-{shade}`, `text-neutral-{shade}`
- **Scale:** 50 to 900

## Design Principles

- **Minimalistic:** Clean, simple design
- **Luxury:** Premium feel without exaggeration
- **Modern:** Contemporary aesthetic
- **White Background:** Pure white background as base
- **Elegant Color Palette:** Dark brown primary with beige accents

## Components

### Logo Component
Located at: `components/ui/Logo.tsx`

### Utility Functions
Located at: `lib/utils.ts`
- `cn()` - Utility for merging Tailwind classes

## Next Steps

1. Define brand colors and add to Tailwind config
2. Create additional UI components
3. Set up component library structure
4. Define spacing and sizing scales

