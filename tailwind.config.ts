import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dubai Luxury Theme - Black & Gold
        primary: {
          DEFAULT: '#0A0A0A', // Deep Black
          dark: '#000000',
          light: '#1E1E1E', // Charcoal Gray
        },
        secondary: {
          DEFAULT: '#D4AF37', // Rich Gold
          light: '#F4E5B5',
          dark: '#B8941F',
        },
        accent: {
          DEFAULT: '#1E1E1E',
          light: '#2C2C2C',
        },
        background: {
          DEFAULT: '#FAFAFA',
          dark: '#0A0A0A',
        },
        text: {
          DEFAULT: '#2C2C2C',
          light: '#6B7280',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'], // Headings
        montserrat: ['Montserrat', 'sans-serif'], // Subheadings
        inter: ['Inter', 'sans-serif'], // Body
        orbitron: ['Orbitron', 'monospace'], // Prices/Numbers
        italiana: ['Italiana', 'serif'], // Luxury accents
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #0A0A0A 0%, #1E1E1E 100%)',
        'gradient-gold': 'linear-gradient(90deg, #D4AF37 0%, #F4E5B5 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        luxury: '0 4px 20px rgba(0, 0, 0, 0.15)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 8px 32px rgba(212, 175, 55, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
