import type { Config } from "tailwindcss";

const config: Config = {
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
      screens: {
        'iphone-se': {'raw': '(max-width: 320px)'}, // iPhone SE (1st gen) - 320px width
        'iphone-xr': {'raw': '(max-width: 414px) and (min-height: 896px)'}, // iPhone XR - 414px width, 896px height
        'iphone-12pro': {'raw': '(max-width: 390px) and (min-height: 844px)'}, // iPhone 12 Pro - 390px width, 844px height
      },
    },
  },
  plugins: [],
};
export default config;
