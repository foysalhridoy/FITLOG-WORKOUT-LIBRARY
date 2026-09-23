/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-oswald)", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        fitlog: {
          "primary": "#c4f000",
          "primary-content": "#0f1115",
          "secondary": "#2a2e38",
          "secondary-content": "#e8eaef",
          "accent": "#c4f000",
          "accent-content": "#0f1115",
          "neutral": "#12141a",
          "neutral-content": "#e8eaef",
          "base-100": "#0f1115",
          "base-200": "#1a1d23",
          "base-300": "#252830",
          "base-content": "#e8eaef",
          "info": "#7dd3fc",
          "info-content": "#0f1115",
          "success": "#86efac",
          "success-content": "#0f1115",
          "warning": "#fbbf24",
          "warning-content": "#0f1115",
          "error": "#f87171",
          "error-content": "#0f1115",
          "--rounded-box": "1rem",
          "--rounded-btn": "1rem",
          "--rounded-badge": "1rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.75rem",
        },
      },
    ],
    darkTheme: "fitlog",
  },
};
