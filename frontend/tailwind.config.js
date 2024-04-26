/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oxygen: ["Oxygen", "san-serif"],
        exo2: ['"Exo 2"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
