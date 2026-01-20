# Design Inspiration: Simplicity Principles

## Study: West One Bathrooms (westonebathrooms.com)

This document captures design principles and layout insights from studying West One Bathrooms' website, focusing on simplicity and elegance that we can apply to Crafted Bathrooms.

---

## Core Simplicity Principles

### 1. **Minimal, Clear Navigation**
**What they do:**
- Streamlined top navigation with only core sections
- Secondary items (search, contact) are subtle or tucked away
- No overwhelming menu lists

**Application for Crafted Bathrooms:**
- Keep header navigation focused on essential pages only
- Consider grouping related items (e.g., "About" and "Services" could be primary, with sub-items)
- Mobile: Use hamburger menu to hide secondary navigation
- Limit visible nav items to 5-6 maximum

### 2. **Whitespace & Visual Breathing Room**
**What they do:**
- Ample spacing between sections (not crammed)
- Each content block has generous margin/padding
- Content doesn't feel overwhelming

**Application for Crafted Bathrooms:**
- Our current `py-section-md` (80px) is good, but consider even more generous spacing for hero sections
- Increase spacing between cards in grids (we use `gap-gap-lg` which is good)
- Ensure text blocks have adequate line-height (we use 1.6 for body, which is good)
- Add more vertical padding to hero sections (consider 120-160px)

### 3. **Strong Imagery & Minimal Text**
**What they do:**
- Large, high-quality visuals as statement pieces
- Text is purposeful and sparing: headlines + short intros + CTAs
- Images complement copy rather than compete

**Application for Crafted Bathrooms:**
- Hero sections should be image-first with minimal text overlay
- Use large, full-width images for project showcases
- Keep headlines concise (2-8 words ideal)
- Body text should be 2-3 sentences max for intros
- Let images tell the story; text provides context

### 4. **Consistent, Limited Palette & Typography**
**What they do:**
- Restrained color scheme: mostly neutrals with occasional accent pops
- Typography hierarchy is visually obvious
- Limited font weights and sizes

**Application for Crafted Bathrooms:**
- Our palette is good (primary: #302620, accent: #bea98e, white background)
- Stick to 2-3 primary colors maximum
- Use accent color sparingly (for CTAs, hover states, highlights)
- Maintain clear typography hierarchy (we have this with our scale)
- Limit font weights: regular (400), medium (500), semibold (600), bold (700)

### 5. **Focused Content & CTAs**
**What they do:**
- Main actions are prominent (e.g., "Request Brochure," "Visit Showroom")
- Only 1-2 primary CTAs per page
- Sub-actions are lower priority in visual weight

**Application for Crafted Bathrooms:**
- Homepage hero: 1-2 primary CTAs maximum
- Each section should have one clear primary action
- Secondary actions should be text links or subtle buttons
- Use visual hierarchy: large primary button, smaller secondary button
- Avoid button overload - if you have 3+ CTAs, prioritize

### 6. **Clean Footer & Pared-Down Secondary Content**
**What they do:**
- Footer is informative but not overwhelming
- Essential links only (About, Showrooms, Contact)
- Social icons if relevant
- Legal stuff minimal
- No giant walls of text

**Application for Crafted Bathrooms:**
- Our footer structure is good (logo, quick links, contact)
- Keep it to 3-4 columns maximum
- Don't add too many links - stick to essentials
- Keep copyright and legal minimal

---

## Layout Patterns to Adopt

### Hero Section Pattern
```
- Full-width or large image background
- Minimal text overlay (headline + 1-2 sentences + 1-2 CTAs)
- Generous vertical spacing (120-160px padding)
- Text centered or left-aligned with ample whitespace
```

### Content Section Pattern
```
- Clear section heading (H2)
- Short intro paragraph (2-3 sentences, max-width: 65ch)
- Visual content (images, cards, grid)
- Single CTA at bottom if needed
- Generous spacing between sections (80-120px)
```

### Card/Grid Pattern
```
- Large, high-quality images
- Minimal text (title + short description)
- Clear hover states
- Generous gaps between cards (32-48px)
- Consistent card heights for visual harmony
```

### Project/Portfolio Pattern
```
- Large featured image
- Short title and category
- Brief description (2-3 sentences)
- Clear "View Project" CTA
- Grid layout with ample spacing
```

---

## Typography Guidelines for Simplicity

### Headlines
- **Hero**: Large, bold, minimal words (4-8 words ideal)
- **Section**: Clear hierarchy, not too many levels
- **Card**: Short, descriptive (3-5 words)

### Body Text
- **Intro paragraphs**: 2-3 sentences maximum
- **Descriptions**: 1-2 sentences for cards
- **Long-form**: Use max-width (65ch) for readability
- **Line height**: Generous (1.6-1.7 for body text)

### CTAs
- **Primary**: Bold, clear action words ("View Projects", "Get in Touch")
- **Secondary**: Subtle, text links or outlined buttons
- **Limit**: 1-2 per section maximum

---

## Color Usage for Simplicity

### Primary Color (#302620)
- Headlines
- Navigation text
- Primary buttons
- Footer headings

### Accent Color (#bea98e)
- Hover states
- Secondary CTAs
- Highlights
- Category tags

### Neutrals (grays)
- Body text (gray-700)
- Secondary text (gray-600)
- Borders (gray-200)
- Backgrounds (gray-50, white)

**Rule**: Use accent color sparingly - it should feel special, not common.

---

## Spacing Guidelines for Simplicity

### Section Spacing
- **Hero sections**: 120-160px vertical padding
- **Content sections**: 80-120px vertical padding
- **Related sections**: 60-80px vertical padding

### Component Spacing
- **Card grids**: 32-48px gaps
- **Text blocks**: 24-32px between paragraphs
- **Buttons**: 16-24px spacing between multiple buttons

### Content Widths
- **Hero text**: max-width 65ch (optimal reading)
- **Body text**: max-width 65ch
- **Cards**: Consistent widths, not too wide (max 400px per card)

---

## Image Guidelines

### Hero Images
- Full-width or large format
- High quality, professional photography
- Minimal text overlay (if any)
- Let image be the focus

### Project Images
- Large, high-resolution
- Consistent aspect ratios
- Featured image should be prominent
- Gallery images in grid with spacing

### General Rules
- Images should tell a story
- Don't overcrowd with images
- Use whitespace around images
- Consistent image treatment (borders, shadows, or clean)

---

## Navigation Simplification

### Header
- **Primary links**: 5-6 maximum
- **Grouping**: Consider dropdowns for related items if needed
- **Mobile**: Hamburger menu, clean drawer
- **Logo**: Left side, clear and visible

### Footer
- **Columns**: 3-4 maximum
- **Links**: Essential pages only
- **Contact**: Simple, clear
- **Legal**: Minimal, unobtrusive

---

## CTA Strategy

### Homepage
- **Hero**: 1-2 primary CTAs
- **Sections**: 1 CTA per section maximum
- **Footer**: Contact link

### Interior Pages
- **Primary action**: One clear CTA per page
- **Secondary actions**: Text links or subtle buttons
- **Avoid**: Multiple competing CTAs

### Button Hierarchy
1. **Primary**: Large, bold, primary color background
2. **Secondary**: Outlined or text link, accent color
3. **Tertiary**: Subtle text link, gray

---

## Content Strategy for Simplicity

### Less is More
- **Headlines**: Short and impactful
- **Descriptions**: 1-3 sentences maximum
- **Body text**: Break into short paragraphs
- **Lists**: Use sparingly, keep short

### Focus on What Matters
- **Homepage**: Hero, featured projects, services overview
- **Project pages**: Large images, brief description, clear navigation
- **Service pages**: Clear value proposition, simple layout

### Remove Clutter
- No unnecessary widgets
- No excessive social proof
- No overwhelming testimonials sections
- Keep it clean and focused

---

## Implementation Checklist

### Immediate Improvements
- [ ] Increase hero section spacing (120-160px)
- [ ] Simplify navigation (limit to 5-6 items)
- [ ] Reduce text in hero sections (headline + 1-2 sentences)
- [ ] Ensure 1-2 CTAs maximum per section
- [ ] Increase spacing between cards (32-48px)
- [ ] Use accent color more sparingly

### Design System Updates
- [ ] Review and tighten color palette usage
- [ ] Ensure typography hierarchy is clear
- [ ] Standardize image treatments
- [ ] Create consistent card patterns
- [ ] Define CTA button hierarchy

### Content Strategy
- [ ] Edit all copy to be more concise
- [ ] Focus on image-first approach
- [ ] Reduce text blocks to essentials
- [ ] Ensure clear, single CTAs per section

---

## Key Takeaways

1. **Whitespace is your friend** - More space = more luxury feel
2. **Images over text** - Let visuals tell the story
3. **Less is more** - Fewer elements, clearer focus
4. **Consistent hierarchy** - Clear visual structure
5. **Purposeful CTAs** - One primary action per section
6. **Restrained palette** - Use colors intentionally, not everywhere
7. **Clean navigation** - Essential links only
8. **Generous spacing** - Let content breathe

---

*Last Updated: Based on study of westonebathrooms.com*
