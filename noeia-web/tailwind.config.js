/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b5998', // Deep Tranquil Blue (Main Brand)
          600: '#2d4475',
          700: '#1e2e52',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f4f7f6',
          100: '#e3ebe8',
          200: '#c5d6d0',
          300: '#a3bdb4',
          400: '#8aa89b', // Soft Sage Green
          500: '#6d8f80',
          600: '#547063',
          700: '#3e5249',
          800: '#2b3832',
          900: '#1a211e',
        },
        accent: {
          50: '#fef5f3',
          100: '#ffe6e0',
          200: '#ffd0c4',
          300: '#ffb2a1',
          400: '#f78c6b', // Warm Coral
          500: '#e06a45',
          600: '#c24e2b',
          700: '#a33b1d',
          800: '#853018',
          900: '#6b2815',
        },
        background: '#f9f9f9', // Off-White
        surface: '#ffffff',
        text: {
          DEFAULT: '#333333', // Charcoal Gray
          muted: '#64748b',
          light: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

