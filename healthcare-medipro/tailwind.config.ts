import type { Config } from "tailwindcss"

const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        green: {
          400: '#24AE7C',
          500: '#0D2A1F',
          600: '#22c55e'
        },
        blue: {
          600: '#1975DC',
          700: '#152432'
        },
        red: {
          500: '#F37877',
          600: '#3E1716',
          700: '#F24E43'
        },
        light: {
          200: '#f1f5f9',
          300: '#ecefff'
        },
        dark: {
          200: '#1F2937',
          300: '#131619',
          400: '#1A1D21',
          500: '#363A3D',
          600: '#76828D',
          700: '#ABB8C4'
        },
        white: {
          200: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config