/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "#FFC132",
        "primary-darker": "#FC9000",
        "dark-secondary": "#4E4E4E",
        "secondary": "#CCCCCC",
        "dark-selected": "#88918E",
        "selected": "#AAAAAA",
        "darker": "#111111",
        "dark": "#222222",
        "light": "#DDDDDD",
        "lighter": "#EEEEEE",
        "dark-text": "#C2D3CD",
        "text": "#333333"
      }
    },
  },
  plugins: [],
};
