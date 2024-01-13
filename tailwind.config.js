/** @type {import('tailwindcss').Config} */
import * as colors from "tailwindcss/colors";
import * as defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      blue: colors.blue,
      yellow: colors.yellow,
      rose: colors.rose,
      forrest: {
        200: "#82A6A3",
        500: "#38716C",
        700: "#064D47",
        900: "#043834",
      },
      green: {
        50: "#E5F2F1",
        100: "#C0E1DF",
        200: "#86CEC8",
        500: "#3DB1A7",
        700: "#0D9E91",
        900: "#046A61",
      },
      tan: {
        200: "#FBFCF7",
        500: "#F2F4E9",
        700: "#E7EBD5",
      },
      border: "#DAE0DF",
      lightborder: "#F2F4F4",
      textblack: "#123233",
      textgray: "#576969",
      softblue: "#CEE1F2",
    },
    extend: {
      fontFamily: {
        sans: ["Harmonia", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
