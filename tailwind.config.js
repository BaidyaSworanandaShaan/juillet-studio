/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["var(--font-raleway)"],
        lora: ["var(--font-lora)"],
      },
      container: {
        center: true,
        padding: "7rem",
      },
      colors: {
        primary: {
          light: "#F9B7B2", // Soft Coral Pink
          DEFAULT: "#F27C6B", // Warm Coral
          dark: "#C75A4A", // Deep Coral Red
        },
        secondary: {
          light: "#B3C9B0", // Soft Sage Green
          DEFAULT: "#8DAA91", // Calm Sage
          dark: "#6B8B70", // Deep Sage
        },
        accent: {
          light: "#D8C4E3", // Pastel Lavender
          DEFAULT: "#C3AED6", // Soft Lavender
          dark: "#9B8BC0", // Rich Lavender
        },
        background: {
          light: "#FFF9F4", // Ivory Cream
          DEFAULT: "#F6F1ED", // Light Warm Gray
          dark: "#E0DAD2", // Muted Beige
        },
        text: {
          light: "#6B6B6B", // Medium Gray
          DEFAULT: "#2E2E2E", // Deep Charcoal
          dark: "#1A1A1A", // Almost Black
        },
      },
    },
  },
  plugins: [],
};
