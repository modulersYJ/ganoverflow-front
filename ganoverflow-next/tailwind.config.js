/** @type {import('tailwindcss').Config} */
const { createThemes } = require("./src/styles/createThemes"); // 색변형 lib

const colors = {
  primary: "#42c83c",
  secondary: "#12D761",
  light: "#f5f5f7",
};
const themes = createThemes(colors);

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: themes.primary,
        secondary: themes.secondary,
        black: "#000",
        white: "#fff",
      },
      colors: {
        ...themes,
      },
      fontFamily: {
        morganBold: ["morganBold", "sans-serif"],
        notoSansKR: ["Noto Sans KR", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      boxShadow: {
        headerBox: "rgba(0, 0, 0, 0.4) 0px 0px 8px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "vert-dark-gradient":
          "linear-gradient(180deg, rgba(25, 22, 20, 0), rgba(25, 22, 20, 1) 58.85%)",
        "vert-light-gradient":
          "linear-gradient(180deg, rgba(25, 22, 20, 0), rgba(200, 200, 200, 1) 95%)",
      },
      borderRadius: {
        "chat-question": "20px 20px 0px 20px",
        "chat-answer": "20px 20px 20px 0px",
      },
    },
    plugins: [],
    variants: {
      extend: {
        backgroundImage: ["dark", "responsive"],
      },
    },
  },
};
