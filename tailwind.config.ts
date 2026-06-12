import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:       '#E8481C',
          'orange-hover': '#D03D14',
          'orange-light': '#F26B42',
          'orange-subtle': 'rgba(232,72,28,0.10)',
          crimson:      '#921B1B',
          maroon:       '#5C1010',
        },
        cb9: {
          black:  '#000000',
          white:  '#FFFFFF',
          50:     '#F9F9F9',
          100:    '#F2F2F2',
          200:    '#E5E5E5',
          300:    '#D4D4D4',
          400:    '#A3A3A3',
          500:    '#737373',
          600:    '#525252',
          700:    '#404040',
          800:    '#262626',
          900:    '#171717',
          950:    '#0d0d0d',
        },
      },
      fontFamily: {
        sans: ['var(--font-stack)', 'system-ui', 'sans-serif'],
        brand: ['var(--font-stack)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,8vw,6rem)',   { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.4rem,6vw,4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.8rem,4vw,3rem)',  { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.4rem,3vw,2.2rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '42': '10.5rem',
      },
      transitionTimingFunction: {
        'cb9-ease':   'cubic-bezier(0.4,0,0.2,1)',
        'cb9-spring': 'cubic-bezier(0.34,1.56,0.64,1)',
        'cb9-out':    'cubic-bezier(0,0,0.2,1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      animation: {
        'slide-up':   'slideUp 0.7s cubic-bezier(0,0,0.2,1) forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'bar-grow':   'barGrow 1.2s cubic-bezier(0.4,0,0.2,1) forwards',
      },
      keyframes: {
        slideUp:  { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        barGrow:  { from: { width: '0%' }, to: { width: '100%' } },
      },
      backgroundImage: {
        'gradient-dark-up': 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}

export default config
