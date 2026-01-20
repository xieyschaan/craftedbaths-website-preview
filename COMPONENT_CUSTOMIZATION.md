# Component Customization Guide

## How Components Are Styled

All components use **Tailwind CSS classes** defined directly in the component files. You can customize them by modifying the class strings in each component.

## Where to Edit

### Button Component
**File:** `components/ui/Button.tsx`

**What you can customize:**
- **Shape:** Change `rounded-md`, `rounded-lg`, `rounded-xl` to `rounded-none`, `rounded-full`, or custom values
- **Borders:** Add/remove borders, change thickness
- **Shadows:** Add `shadow-lg`, `shadow-xl`, or custom shadows
- **Animations:** Add hover effects, transitions, transforms
- **Typography:** Font weight, letter spacing, text transform

**Example customizations:**

```tsx
// More rounded, luxury feel
const sizes = {
  sm: 'px-4 py-2 text-sm rounded-full',  // Changed to rounded-full
  md: 'px-6 py-3 text-base rounded-full',
  lg: 'px-8 py-4 text-lg rounded-full',
}

// Add subtle shadow and hover lift effect
const variants = {
  primary:
    'bg-primary-900 text-white hover:bg-primary-800 hover:shadow-lg hover:-translate-y-0.5 focus:ring-primary-500 active:bg-primary-950 transition-all duration-300',
}
```

### Input/Form Components
**Files:** `components/ui/Input.tsx`, `Textarea.tsx`, `Select.tsx`

**What you can customize:**
- **Border style:** Change from `border-2` to `border` or add custom borders
- **Focus effects:** Customize focus ring, add animations
- **Placeholder styling:** Add custom placeholder colors/styles
- **Background:** Add subtle backgrounds or gradients

**Example:**
```tsx
// More minimal, luxury input
className={cn(
  'w-full px-4 py-3 font-gilroy text-base',
  'border-b-2 border-neutral-300 rounded-none', // Changed to bottom border only
  'focus:outline-none focus:border-primary-900', // Simpler focus
  'bg-transparent', // Transparent background
  'transition-colors duration-200',
  className
)}
```

### Card Component
**File:** `components/ui/Card.tsx`

**What you can customize:**
- **Corners:** Change `rounded-xl` to different radius values
- **Shadows:** Customize shadow depth and style
- **Borders:** Add subtle borders, change colors
- **Background:** Add gradients or subtle patterns

## Design Ideas for Luxury Bathroom Brand

### Button Styles

1. **Minimal with subtle hover:**
   - Thin borders
   - Subtle shadow on hover
   - Smooth color transitions

2. **Elegant rounded:**
   - Fully rounded (`rounded-full`)
   - Soft shadows
   - Gentle hover lift

3. **Geometric luxury:**
   - Sharp corners (`rounded-none` or minimal radius)
   - Clean lines
   - Precise spacing

### Form Input Styles

1. **Minimal underline:**
   - Only bottom border
   - Transparent background
   - Focus expands border

2. **Floating label:**
   - Label moves on focus
   - Clean, modern look

3. **Bordered luxury:**
   - Thin, elegant borders
   - Subtle focus glow
   - Premium feel

## Custom CSS (Advanced)

You can also add custom CSS in `app/globals.css`:

```css
/* Custom button styles */
.btn-luxury {
  position: relative;
  overflow: hidden;
}

.btn-luxury::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn-luxury:hover::before {
  left: 100%;
}
```

## Quick Customization Examples

### Make buttons more rounded:
Edit `components/ui/Button.tsx`, change `rounded-md` → `rounded-full`

### Add hover lift effect:
Add `hover:-translate-y-1` and `hover:shadow-lg` to button variants

### Make inputs minimal:
Change `border-2` → `border-b-2` (bottom border only)

### Add subtle animations:
Add `transition-all duration-300` and custom hover states

## Need Help?

Tell me what style you want:
- "Make buttons more rounded and elegant"
- "Make inputs minimal with only bottom border"
- "Add subtle hover animations"
- "Make cards have softer shadows"

I can help customize any component to match your vision!

