/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ceramic: {
          DEFAULT: '#F5F7F8',
          50: '#FAFBFC',
          100: '#F5F7F8',
          200: '#EEF2F4',
          300: '#E2E8EB',
          400: '#D1D9E0',
        },
        slate: {
          DEFAULT: '#1C2733',
          900: '#0F171F',
          800: '#1C2733',
          700: '#2A3844',
          600: '#3D4D5C',
          500: '#66717E',
          400: '#87A7C4',
          300: '#A8C0D4',
          200: '#C8D8E6',
        },
        accent: {
          DEFAULT: '#5D7897',
          hover: '#87A7C4',
          muted: '#5D789730',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(90, 105, 120, 0.12)',
          'border-light': 'rgba(209, 217, 224, 0.2)',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Geist"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '400' }],
        'display-lg': ['64px', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-md': ['48px', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '400' }],
        'headline-lg': ['40px', { lineHeight: '1.15', fontWeight: '400' }],
        'headline-md': ['28px', { lineHeight: '1.25', fontWeight: '400' }],
        'headline-sm': ['22px', { lineHeight: '1.3', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.65', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.55', fontWeight: '400' }],
        'label-lg': ['16px', { lineHeight: '1.2', letterSpacing: '0.04em', fontWeight: '500' }],
        'label-md': ['14px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '500' }],
        'label-sm': ['12px', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '600' }],
        'label-xs': ['10px', { lineHeight: '1.2', letterSpacing: '0.12em', fontWeight: '600' }],
      },
      spacing: {
        'gutter': '32px',
        'margin-desktop': '64px',
        'margin-mobile': '20px',
        'section': '160px',
        'section-mobile': '96px',
      },
      maxWidth: {
        'container': '1280px',
        'narrow': '720px',
        'wide': '1440px',
      },
      borderRadius: {
        DEFAULT: '2px',
        lg: '4px',
        xl: '8px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scroll-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
        'scroll-line': 'scroll-line 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
