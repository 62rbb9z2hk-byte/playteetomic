/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black:  '#060e07',
          dark:   '#0a1a0f',
          deep:   '#1a3a20',
          field:  '#2d6a4f',
          green:  '#2ECC71',
          muted:  '#8BA888',
          cream:  '#f5f0e8',
          gold:   '#c9a84c',
          goldl:  '#e8c96a',
        },
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
        mono:   ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up':  'fadeUp 0.4s ease forwards',
        'fade-in':  'fadeIn 0.3s ease forwards',
        'slide-in': 'slideIn 0.35s ease forwards',
      },
      keyframes: {
        fadeUp:  { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideIn: { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
