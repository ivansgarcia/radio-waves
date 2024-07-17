/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "#FFC132",
        "primary-dark": "#FC9000",
        "secondary": "#4E4E4E",
        "selected": "#88918E",
        "darker": "#111111",
        "dark": "#222222",
        "text": "#C2D3CD"
      }
    },
  },
  plugins: [],
};
