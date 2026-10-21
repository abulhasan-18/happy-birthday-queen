import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        romantic: {
          coral: "#ff4d6d",
          deepRose: "#c9184a",
          blush: "#fff0f3",
          gold: "#f59e0b",
          lightBeige: "#fbf8f3",
          warmSand: "#f5ede3"
        }
      },
      fontFamily: {
        cursive: ["var(--font-cursive)", "cursive", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 15px rgba(255, 77, 109, 0.6))",
            transform: "scale(1)",
          },
          "50%": {
            filter: "drop-shadow(0 0 35px rgba(255, 77, 109, 0.95))",
            transform: "scale(1.06)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
