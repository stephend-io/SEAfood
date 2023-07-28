const scrollbarHide = require('./scrollbarHide')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        secondary2: 'var(--secondary2)',
        secondary3: 'var(--secondary3)',
        accent: 'var(--accent)',
        accentTwo: 'var(--accentTwo)',
        accent3: 'var(--accent3)',
      },
      fontFamily: {
        primaryFont: 'var(--primaryFont)',
        secondaryFont: 'var(--secondaryFont)',
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss', scrollbarHide],
}
