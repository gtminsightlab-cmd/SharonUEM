/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        uem: {
          void:    '#06090F',
          navy:    '#0A1628',
          slate:   '#0F1E35',
          card:    '#111D30',
          border:  '#1C2E47',
          gold:    '#B8952A',
          'gold-light': '#D4AA3A',
          'gold-dim':   '#7A621C',
          mist:    '#8496AF',
          silver:  '#C4D0DE',
          white:   '#EEF3F9',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(184,149,42,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(184,149,42,0.04) 1px, transparent 1px)
        `,
        'radial-gold': 'radial-gradient(ellipse at 50% 0%, rgba(184,149,42,0.12) 0%, transparent 70%)',
        'radial-gold-sm': 'radial-gradient(ellipse at 50% 0%, rgba(184,149,42,0.08) 0%, transparent 50%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'line-draw':  'lineDraw 1.2s ease forwards',
        'shimmer':    'shimmer 2.5s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineDraw: {
          '0%':   { width: '0%' },
          '100%': { width: '100%' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}
