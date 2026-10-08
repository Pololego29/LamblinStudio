/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Barlow Condensed"', '"Arial Narrow"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: {
          950: '#0b0f10',
          900: '#111618',
          800: '#182023',
          700: '#232c30',
        },
        line: '#2a3337',
        bone: '#e8e2d4',
        muted: '#a3abad',
        gold: {
          DEFAULT: '#c9a55a',
          bright: '#e0b45c',
          deep: '#8a6a2c',
        },
        steel: '#4d6a86',
        oxblood: '#9a4434',
      },
      maxWidth: {
        page: '76rem',
      },
    },
  },
  plugins: [],
}
