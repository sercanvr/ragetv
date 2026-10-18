/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      tv: '1920px', // 10-foot UI / Smart TV breakpoint
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FC3564',
          hover: '#FF4D79',
          muted: '#8A1B35',
          glow: 'rgba(252, 53, 100, 0.25)',
        },
        surface: {
          deep: 'var(--color-bg-deep)',
          base: 'var(--color-bg-base)',
          card: 'var(--color-bg-card)',
          panel: 'var(--color-bg-panel)',
          border: 'var(--color-border)',
          borderLight: 'var(--color-border-subtle)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'brand-glow': '0 0 24px -4px rgba(252, 53, 100, 0.35)',
        'tv-focus': '0 0 0 4px #FC3564',
      },
    },
  },
  plugins: [],
};
