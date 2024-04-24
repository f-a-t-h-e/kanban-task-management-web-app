/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: "#635fc7ff",
        secondary: "#828fa3ff",
        accent: "#ffff",
        neutral: "#20212cff",
        "base-100": "#2b2c37ff",
      }
    },
  },
  plugins: [],
}

