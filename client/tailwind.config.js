/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',       // #003c90
          dark: 'var(--color-primary-dark)',      // #002966
          light: 'var(--color-primary-light)',    // #d9e2ff
          container: 'var(--color-primary-container)', // #0f52ba
        },
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        surface: {
          bright: 'var(--color-surface-bright)',
          dim: 'var(--color-surface-dim)',
          container: 'var(--color-surface-container)',
          'container-low': 'var(--color-surface-container-low)',
          'container-high': 'var(--color-surface-container-high)',
          'container-highest': 'var(--color-surface-container-highest)',
          'container-lowest': 'var(--color-surface-container-lowest)',
        },
        outline: {
          DEFAULT: 'var(--color-outline)',
          variant: 'var(--color-outline-variant)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          container: 'var(--color-error-container)',
        },
      },
      fontFamily: {
        display: ['"Hanken Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

