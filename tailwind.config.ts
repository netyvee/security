import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a1628',
        'navy-mid': '#0f1f3d',
        'navy-light': '#162849',
        accent: '#4ecdc4',
        'accent-dark': '#3dbdb4',
        gold: '#c9a84c',
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      fontSize: {
        "section-tag": ["11px", { letterSpacing: "0.1em", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};

export default config;
