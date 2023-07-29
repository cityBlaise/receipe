/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange_light: "#ffa600a4",
        orange_dark: "#ffb012",
        my_gray: "#ececec44",
      },
      fontFamily: {
        biber: "Jaya",
        roboto: "Inter",
      },
      height: {
        "h-2-full": "200%",
      },
      translate: {
        "2-full": "200%",
      },
      transitionDuration: {
        2000: "900ms",
      },
      borderRadius: {
        65: "65px",
      },
    },
  },
  plugins: [],
};
