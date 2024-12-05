import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B3C5D", // Deep Enterprise Blue
          light: "#1D5B7B",
          dark: "#082C44",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F16522", // Vibrant Orange
          light: "#F48B54",
          dark: "#D54E0F",
          foreground: "#FFFFFF",
        },
        background: "#F8FAFC",
        neutral: {
          100: "#FFFFFF",
          200: "#F1F5F9",
          300: "#E2E8F0",
          400: "#CBD5E1",
          500: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
        arabic: ["IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;