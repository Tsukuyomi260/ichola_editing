import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Ichola palette — override par --green pour changer le thème */
        bg: '#FCFCFA',
        'bg-2': '#F1F6EF',
        surface: '#FFFFFF',
        ink: '#101812',
        'ink-soft': '#33413A',
        muted: '#6A756E',
        line: '#E4E8E0',
        'line-soft': '#EEF2EA',
        green: {
          pop: '#35D07E',
          DEFAULT: '#12B76A',
          deep: '#0E9558',
          dark: '#0A7A45',
          wash: '#DDF3E7',
        },
        btn: '#15211B',
        'btn-hover': '#0B120E',
      },
      fontFamily: {
        sans: ['var(--font-instrument)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bricolage)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      borderRadius: {
        lg: '18px',
        md: '11px',
      },
      maxWidth: {
        container: '1180px',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(.22,.61,.36,1) infinite',
        drift: 'drift 9s cubic-bezier(.22,.61,.36,1) infinite',
        reveal: 'reveal .7s cubic-bezier(.22,.61,.36,1) forwards',
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(.7)', opacity: '0.5' },
          '70%': { transform: 'scale(1.8)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        drift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        sm: '4px',
        DEFAULT: '14px',
      },
    },
  },
  plugins: [],
};

export default config;
