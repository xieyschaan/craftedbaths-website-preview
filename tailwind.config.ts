import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',   // 16px on mobile
        sm: '1.5rem',      // 24px on small screens
        lg: '2rem',        // 32px on large screens
        xl: '2.5rem',      // 40px on extra large screens
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',   // Max content width
      },
    },
    extend: {
      maxWidth: {
        // Content width system
        'content': '1440px',      // Maximum content width (luxury, spacious)
        'content-narrow': '1280px', // Standard content width
        'content-tight': '1120px',  // Tighter content width
        'text': '65ch',           // Optimal reading width for body text
        'text-narrow': '55ch',    // Narrower text blocks
      },
      spacing: {
        // Custom spacing scale (luxury, generous spacing)
        'section': '160px',       // Section vertical spacing (hero sections - large)
        'section-md': '120px',    // Medium-large section spacing (content sections)
        'section-sm': '80px',     // Medium section spacing
        'section-xs': '60px',     // Small section spacing
        'header': '120px',        // Header height (1.5x original)
        'footer': 'auto',         // Footer auto height
        // Grid gaps (increased for more breathing room)
        'gap-sm': '1rem',         // 16px
        'gap-md': '1.5rem',       // 24px
        'gap-lg': '2.5rem',       // 40px (increased from 32px)
        'gap-xl': '3rem',         // 48px
      },
      colors: {
        // Primary brand color - Dark brown/charcoal
        primary: {
          50: '#f5f4f2',
          100: '#e8e5e0',
          200: '#d1cbc1',
          300: '#b8afa2',
          400: '#9f9383',
          500: '#867764',
          600: '#6d5f4f',
          700: '#544a3d',
          800: '#3b352a',
          900: '#302620', // Main primary color
          950: '#1a1512',
        },
        // Accent color - Beige/taupe
        accent: {
          50: '#f7f5f2',
          100: '#ede8e0',
          200: '#dbd1c1',
          300: '#c9baa2',
          400: '#b7a383',
          500: '#bea98e', // Main accent color
          600: '#a8957a',
          700: '#928166',
          800: '#7c6d52',
          900: '#66593e',
          950: '#50452a',
        },
        // Secondary color - darker brown
        secondary: {
          DEFAULT: '#261e1a',
        },
        // Background color
        background: {
          DEFAULT: '#fcfbfa',
        },
        // Neutral grays
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        serif: ['Rexton', 'Georgia', 'serif'],
        jost: ['var(--font-jost)', 'sans-serif'],
        rexton: ['Rexton', 'serif'],
      },
      fontSize: {
        // Typography scale (luxury, clear hierarchy)
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],  // 72px - Hero headings
        'h1': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],      // 56px - Page headings
        'h2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],       // 40px - Section headings
        'h3': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],        // 32px - Subsection headings
        'h4': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],             // 24px - Card headings
        'h5': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],            // 20px - Small headings
        'h6': ['1rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],               // 16px - Tiny headings
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],                        // 18px - Large body text
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],                               // 16px - Body text
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],                        // 14px - Small body text
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],                    // 12px - Captions
      },
      lineHeight: {
        // Consistent line heights
        'tight': '1.2',
        'snug': '1.4',
        'normal': '1.6',
        'relaxed': '1.7',
        'loose': '2',
      },
      letterSpacing: {
        // Letter spacing for luxury feel
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
      },
    },
  },
  plugins: [],
};
export default config;

