/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: "var(--background)",
        bgCard: "var(--color-surface)",
        borderMain: "var(--color-border)",
        textMain: "var(--foreground)",
        textMuted: "var(--color-muted)",
        accent: "var(--color-accent)",
        error: "var(--color-error)",
        navbarBg: "var(--navbar-bg)",
        navbarText: "var(--navbar-text)",
      },
    },
  },
  plugins: [],
};
