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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle_at_center,_var(--tw-gradient-stops))",
      },
      animation: {
        "slow-pulse": "ambient-pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "ambient-pulse": {
          "50%": {
            opacity: ".5",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
