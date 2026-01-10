import scrollbarHidePlugin from 'tailwind-scrollbar-hide'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  plugins: [scrollbarHidePlugin],
  theme: {
    extend: {
      animation: {
        'tooltip-in': 'tooltipIn 0.15s ease-out',
        'tooltip-out': 'tooltipOut 0.1s ease-in',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        hazard: {
          1: '#6AC828',
          2: '#F4E04D',
          3: '#F88F2C',
          4: '#EB450B',
          5: '#1B1A1E',
        },
        primary: '#FF6F00',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        scaleIn: {
          from: { transform: 'scale(0.95)' },
          to: { transform: 'scale(1)' },
        },
        scaleOut: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0.95)' },
        },
        tooltipIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        tooltipOut: {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.96)' },
        },
      },
    },
  },
} satisfies Config
