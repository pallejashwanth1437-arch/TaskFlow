/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0C10',
        surface: '#12151C',
        surface2: '#171B24',
        surface3: '#1D212C',
        borderLight: '#2C3140',
        text: '#EDEFF4',
        muted: '#9096AA',
        faint: '#5D6376',
        brand: '#5B5FEF',
        brandLight: '#8B8EF5',
        brandDim: '#3A3DAA',
        amber: '#F0A93A',
        high: '#F0464B',
        medium: '#F0A93A',
        low: '#45D8E0',
        pending: '#8790A8',
        progress: '#4C8DFF',
        completed: '#34D399',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
