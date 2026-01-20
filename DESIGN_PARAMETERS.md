# Design Parameters Documentation

This document outlines all standardized design parameters for the Crafted Bathrooms website. These parameters ensure consistency, modernity, and a luxury aesthetic throughout the entire site.

---

## 📐 **Container & Content Widths**

### Maximum Content Widths
- **`max-w-content`** (1440px) - Maximum content width for luxury, spacious layouts
  - *Reason*: Provides ample space for content while maintaining readability. Used for main content areas, hero sections, and wide layouts.
  
- **`max-w-content-narrow`** (1280px) - Standard content width
  - *Reason*: Comfortable width for most content sections. Optimal balance between space and focus.
  
- **`max-w-content-tight`** (1120px) - Tighter content width
  - *Reason*: For focused content areas like product grids and card layouts.
  
- **`max-w-text`** (65ch) - Optimal reading width for body text
  - *Reason*: Based on typography best practices. 65-75 characters per line is ideal for reading comprehension.
  
- **`max-w-text-narrow`** (55ch) - Narrower text blocks
  - *Reason*: For captions, sidebars, or compact text areas.

### Container Padding (Responsive)
- **Mobile**: `1rem` (16px)
- **Small screens (sm)**: `1.5rem` (24px)
- **Large screens (lg)**: `2rem` (32px)
- **Extra large (xl)**: `2.5rem` (40px)

*Reason*: Responsive padding ensures content breathes appropriately on all screen sizes. Larger padding on bigger screens creates a luxury feel.

---

## 📏 **Section Spacing (Vertical Padding)**

- **`spacing-section`** (120px) - Large sections
  - *Reason*: Generous spacing for hero sections, major content dividers. Creates premium, spacious feeling.
  
- **`spacing-section-md`** (80px) - Medium sections
  - *Reason*: Standard spacing between most content sections. Balances visual separation with page flow.
  
- **`spacing-section-sm`** (60px) - Small sections
  - *Reason*: Tighter spacing for related content groups or nested sections.

---

## 🎨 **Component Spacing**

Standard spacing scale for components, gaps, and margins:
- **XS**: `0.25rem` (4px) - Minimal spacing
- **SM**: `0.5rem` (8px) - Small spacing
- **MD**: `1rem` (16px) - Standard spacing
- **LG**: `1.5rem` (24px) - Large spacing
- **XL**: `2rem` (32px) - Extra large spacing
- **2XL**: `3rem` (48px) - Very large spacing
- **3XL**: `4rem` (64px) - Maximum spacing

---

## 📱 **Grid Gaps**

- **`gap-sm`**: `1rem` (16px) - Small gaps
- **`gap-md`**: `1.5rem` (24px) - Standard gaps
- **`gap-lg`**: `2rem` (32px) - Large gaps (recommended for most card grids)
- **`gap-xl`**: `3rem` (48px) - Extra large gaps (for hero sections, feature showcases)

*Reason*: Consistent grid gaps create visual harmony. Larger gaps (24-32px) are recommended for luxury feel.

---

## 📝 **Typography Scale**

### Display & Headings
- **Display**: `4.5rem` (72px) - Hero headings
  - Line height: 1.1, Letter spacing: -0.02em, Weight: 700
  - *Reason*: Large, impactful text for hero sections. Tight line height creates bold statements.
  
- **H1**: `3.5rem` (56px) - Page headings
  - Line height: 1.15, Letter spacing: -0.02em, Weight: 700
  - *Reason*: Main page titles. Clear hierarchy without overwhelming.
  
- **H2**: `2.5rem` (40px) - Section headings
  - Line height: 1.2, Letter spacing: -0.01em, Weight: 600
  - *Reason*: Section dividers. Provides clear content structure.
  
- **H3**: `2rem` (32px) - Subsection headings
  - Line height: 1.25, Letter spacing: -0.01em, Weight: 600
  - *Reason*: Subsection titles. Maintains hierarchy.
  
- **H4**: `1.5rem` (24px) - Card headings
  - Line height: 1.3, Weight: 600
  - *Reason*: Card and component titles. Readable at smaller sizes.
  
- **H5**: `1.25rem` (20px) - Small headings
  - Line height: 1.4, Weight: 600
  - *Reason*: Secondary headings within components.
  
- **H6**: `1rem` (16px) - Tiny headings
  - Line height: 1.5, Weight: 600
  - *Reason*: Labels, small section titles.

### Body Text
- **Body Large**: `1.125rem` (18px) - Large body text
  - Line height: 1.7
  - *Reason*: Enhanced readability for important paragraphs.
  
- **Body**: `1rem` (16px) - Standard body text
  - Line height: 1.6
  - *Reason*: Standard readable size. Optimal for most content.
  
- **Body Small**: `0.875rem` (14px) - Small body text
  - Line height: 1.6
  - *Reason*: Secondary information, metadata, captions.
  
- **Caption**: `0.75rem` (12px) - Captions
  - Line height: 1.5, Letter spacing: 0.01em
  - *Reason*: Image captions, fine print, labels.

### Line Heights
- **Tight**: 1.2 - For large display headings
- **Snug**: 1.4 - For subheadings
- **Normal**: 1.6 - For body text (standard)
- **Relaxed**: 1.7 - For enhanced readability
- **Loose**: 2 - For maximum readability (spacious)

### Letter Spacing
- **Tighter**: -0.02em - For large display text
- **Tight**: -0.01em - For headings
- **Normal**: 0 - For body text
- **Wide**: 0.01em - For captions, small text
- **Wider**: 0.02em - For emphasis, luxury feel

*Reason*: Consistent typography scale creates clear hierarchy and readability. Negative letter spacing on large text improves visual impact.

---

## 🎯 **Component Heights**

- **Header Height**: `80px`
  - *Reason*: Standard header height. Provides enough space for logo and navigation while maintaining elegance.
  
- **Footer Padding**: `3rem` (48px)
  - *Reason*: Generous padding for footer content. Creates spacious, premium feel.

---

## 🖼️ **Borders**

- **Border Widths**:
  - Thin: `1px` - Standard borders
  - Medium: `2px` - Emphasis borders
  - Thick: `3px` - Strong emphasis
  
- **Border Colors**:
  - Light: `#e5e5e5` - Subtle separators
  - Medium: `#d4d4d4` - Standard borders
  - Dark: `#a3a3a3` - Strong borders

*Reason*: Subtle borders (1px, light colors) maintain minimalistic luxury aesthetic.

---

## 🌑 **Shadows**

- **Small**: Subtle shadow for slight elevation
- **Medium**: Standard card shadows
- **Large**: Prominent shadows for emphasis
- **Extra Large**: Hero shadows, major elevation

*Reason*: Subtle shadows add depth without being heavy. Maintains clean, modern aesthetic.

---

## 📱 **Breakpoints**

Standard Tailwind breakpoints (ensuring responsive design):
- **sm**: 640px - Small tablets
- **md**: 768px - Tablets
- **lg**: 1024px - Small desktops
- **xl**: 1280px - Desktops
- **2xl**: 1440px - Large desktops (max content width)

---

## ✅ **Usage Guidelines**

### When to Use Each Width:
- **`max-w-content` (1440px)**: Hero sections, full-width layouts, main content containers
- **`max-w-content-narrow` (1280px)**: Product listings, standard pages
- **`max-w-content-tight` (1120px)**: Product grids, card collections
- **`max-w-text` (65ch)**: Article content, blog posts, long-form text
- **`max-w-text-narrow` (55ch)**: Sidebars, captions, compact text

### Spacing Best Practices:
1. **Sections**: Use `spacing-section-md` (80px) for most content sections
2. **Cards**: Use `gap-lg` (32px) for grid gaps between cards
3. **Components**: Use standard Tailwind spacing scale (4px increments)
4. **Typography**: Maintain consistent line heights - 1.6 for body, 1.2-1.3 for headings

### Container Usage:
Always use `container` class for consistent padding:
```tsx
<div className="container max-w-content">
  {/* Content */}
</div>
```

---

## 🎨 **Design Philosophy**

These parameters are designed to:
1. **Create Visual Harmony**: Consistent spacing and sizing throughout
2. **Maintain Luxury Feel**: Generous spacing, clear typography hierarchy
3. **Ensure Readability**: Optimal text widths and line heights
4. **Support Responsiveness**: Scales gracefully across all devices
5. **Preserve Minimalism**: Clean, uncluttered layouts with purposeful spacing

---

## 📋 **Quick Reference**

| Parameter | Value | Usage |
|-----------|-------|-------|
| Max Content Width | 1440px | Main content areas |
| Max Text Width | 65ch | Body text |
| Section Spacing | 80px | Between sections |
| Grid Gap | 32px | Card grids |
| Header Height | 80px | Navigation |
| Body Text Size | 16px | Standard content |
| Body Line Height | 1.6 | Readability |

---

---

## 🎨 **Text Color Guidelines**

### **IMPORTANT: Text Color Rule**
**All text throughout the website must use black and shades of black only. Primary brown colors are NOT to be used for text.**

### Text Color Scale
- **Pure Black**: `text-black` - For primary headings and important text
- **Dark Gray**: `text-gray-900` - Alternative to pure black, slightly softer
- **Medium Gray**: `text-gray-800` - For hover states and secondary emphasis
- **Light Gray**: `text-gray-600` - For body text and secondary content
- **Lighter Gray**: `text-gray-500` - For captions and metadata

### Usage Guidelines
- **Headings (H1-H6)**: Use `text-black` or `text-gray-900`
- **Body Text**: Use `text-gray-700` or `text-gray-600`
- **Links**: Use `text-black` or `text-gray-900` with `hover:text-gray-800` or `hover:text-gray-700`
- **Buttons**: Text should be `text-black` or `text-gray-900` (not primary colors)
- **Captions/Metadata**: Use `text-gray-500` or `text-gray-600`

*Reason*: Black text provides maximum readability and maintains a clean, modern aesthetic. Primary brown colors are reserved for backgrounds, borders, and accents only.

---

## 🎯 **Component Specifications**

### Section Heading Style (Shop Online)
- **Size**: `44px` (`text-[44px]`)
- **Weight**: Light (`font-light` / 300)
- **Color**: Black (`text-black` or `text-gray-900`)
- **Alignment**: Center (`text-center`)
- **Bottom Margin**: `60px` (`mb-[60px]`)

*Usage*: For main section headings like "Shop Online". Creates elegant, minimalistic headings with light weight for luxury feel.

### Button Style (Shop All)
- **Padding**: Horizontal `39px` (`px-[39px]`), Vertical `8px` (`py-2`)
- **Text Size**: `12px` (`text-[12px]`)
- **Text Transform**: Uppercase (`uppercase`)
- **Background**: White (`bg-white`)
- **Text Color**: Black (`text-black` or `text-gray-900`)
- **Border**: Thin dark border (`border border-gray-900` or `border border-black`)
- **Hover**: Light gray background (`hover:bg-gray-50`)
- **Variant**: Outline (`variant="outline"`)

*Usage*: For secondary action buttons. Minimalistic design with thin borders and uppercase text for modern, luxury aesthetic.

---

*Last Updated: January 2025*

