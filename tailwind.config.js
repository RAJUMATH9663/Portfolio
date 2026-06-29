/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        bgAlt: "#0a0f1e",
        surface: "#111827",
        surfaceHover: "#1a2236",
        accent: "#6366f1",
        accentLight: "#818cf8",
        accentDark: "#4f46e5",
        cyan: "#22d3ee",
        rose: "#f43f5e",
        gold: "#f59e0b",
        textMain: "#f1f5f9",
        textMuted: "#94a3b8",
        textFaint: "#475569",
        border: "#1e293b",
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.15) 0%, transparent 70%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
      },
      boxShadow: {
        "glow-accent": "0 0 40px rgba(99,102,241,0.35)",
        "glow-cyan": "0 0 40px rgba(34,211,238,0.3)",
        "card": "0 4px 32px rgba(0,0,0,0.4)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
}
