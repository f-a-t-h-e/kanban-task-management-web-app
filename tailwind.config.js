/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary,99 95 199) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary,130 143 163) / <alpha-value>)",
        accent: "rgb(var(--color-accent,255 255 255) / <alpha-value>)",
        neutral: "rgb(var(--color-neutral,32 33 44) / <alpha-value>)",
        "base-100": "rgb(var(--color-base-100,43 44 55) / <alpha-value>)",
      }
    },
  },
  plugins: [],
}

