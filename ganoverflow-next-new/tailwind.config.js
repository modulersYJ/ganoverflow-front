/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        morganBold: ["morganBold"],
      },
      boxShadow: {
        headerBox: "rgba(0, 0, 0, 0.4) 0px 0px 8px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "vert-dark-gradient":
          "linear-gradient(180deg, rgba(31, 41, 55, 0), rgba(31, 41, 55, 1) 58.85%)",
        "vert-light-gradient":
          "linear-gradient(180deg, hsla(0, 0%, 100%, 0) 13.94%, #fff 54.73%)",
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
