import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "error-bg": "#E42C2C",
        primary: "#5c4373",
        background: "#0C1110",
        accent: "#8A65AE",
        "exa-pink": "#D1BAA2",
        "pink-card": "#F0EAE3",
      },
      screens: {
        "4xl": "2560px",
        "3xl": "1920px",
        "2sm": "480px",
        "2.5sm": "587px",
        "3sm": "350px",
        "2lg": "940px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["print"],
    },
  },
  safelist: ["print-hidden"],
};
export default config;
