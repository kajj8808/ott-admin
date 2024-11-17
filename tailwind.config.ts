import type { Config } from "tailwindcss";

import tailwindcssAnimated from "tailwindcss-animated";

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
      scale: {
        "175": "1.75",
        "200": "2.00",
      },
      clipPath: {
        "half-circle-bottom": "ellipse(50% 100% at 50% 100%)",
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
  plugins: [tailwindcssAnimated],
};
export default config;
