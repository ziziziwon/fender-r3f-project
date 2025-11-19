/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0e0e0f",
        paper: "#f9f5e9",
        fenderRed: "#D21F1B",
        fenderGold: "#D8A019",
      },
      boxShadow: { soft: "0 8px 28px rgba(0,0,0,.16)" },
      borderRadius: { "2xl": "1.25rem" },
    },
  },
  plugins: [],
};
