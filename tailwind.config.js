/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      "valantis-primary": "#F2EFE5",
      "valantis-secondary": "#808080",
      "valantis-accent": "#B4B4B8",
      "valantis-accent-dark": "#191919",
    },
    boxShadow: {
      "valantis-shadow":
        "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    },
  },
  plugins: [],
};
