/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent-color)',
        defaultbg: 'var(--bg-color)',
        textcl: 'var(--text-color)',
        mutedcl: 'var(--muted-color)'
      },
      keyframes: {
        shadow: {
          '0%': { 'box-shadow': '-3px 0 5px var(--accent-color)' },
          '10%': { 'box-shadow': '-2px -2px 5px var(--accent-color)' },
          '20%': { 'box-shadow': '-1px -3px 5px var(--accent-color)' },
          '30%': { 'box-shadow': '0 -3px 5px var(--accent-color)' },
          '40%': { 'box-shadow': '1px -3px 5px var(--accent-color)' },
          '50%': { 'box-shadow': '2px -2px 5px var(--accent-color)' },
          '60%': { 'box-shadow': '3px 0 5px var(--accent-color)' },
          '70%': { 'box-shadow': '2px 2px 5px var(--accent-color)' },
          '80%': { 'box-shadow': '1px 3px 5px var(--accent-color)' },
          '90%': { 'box-shadow': '0 3px 5px var(--accent-color)' },
          '100%': { 'box-shadow': '-3px 0 5px var(--accent-color)' }
        }
      },
      animation: {
        shadow: 'shadow 8s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
