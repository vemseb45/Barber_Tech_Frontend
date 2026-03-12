import formsPlugin from '@tailwindcss/forms';
import containerQueriesPlugin from '@tailwindcss/container-queries';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#7924c7",
        "primary-hover": "#5213fc",
        "background-light": "#f6f5f8",
        "background-dark": "#120f23",
      },
      fontFamily: { display: ["Manrope", "sans-serif"] },
    },
  },
  plugins: [
    formsPlugin,
    containerQueriesPlugin
  ],
}
