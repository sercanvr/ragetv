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
          DEFAULT: '#D84040',
          hover: '#E85252',
          muted: '#8A1B1B',
          glow: 'rgba(216, 64, 64, 0.28)',
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
        sans: ['"Chakra Petch"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Orbitron"', '"Chakra Petch"', 'sans-serif'],
      },
      boxShadow: {
        'brand-glow': '0 0 24px -4px rgba(216, 64, 64, 0.35)',
        'tv-focus': '0 0 0 4px #D84040',
      },
    },
  },
  plugins: [],
};
