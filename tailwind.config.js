/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        saffron: "0 0 12px rgba(255,153,0,0.9)",   // saffron inner glow
        golden: "0 0 20px rgba(255,215,0,0.8)",    // golden outer ring
      },
    },
  },
  plugins: [],
};
