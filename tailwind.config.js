/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // animation: {
      //   colorChange: {
      //     "0%": { filter: "hue-rotate(0deg)" },
      //     "100%": { filter: "hue-rotate(360deg)" },
      //   },
      // },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
