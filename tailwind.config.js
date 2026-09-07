/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0F172A",
        bgAlt: "#1E293B",
        surface: "#1E293B",
        surfaceHover: "#334155",
        accent: "#22C55E",
        accentLight: "#4ADE80",
        accentDark: "#16A34A",
        cyan: "#38bdf8",
        rose: "#fb7185",
        gold: "#fbbf24",
        textMain: "#F8FAFC",
        textMuted: "#94A3B8",
        textFaint: "#475569",
        border: "#334155",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "sans-serif"],
        heading: ["'Archivo'", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse at 60% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
      },
      boxShadow: {
        "glow-accent": "0 0 40px rgba(255,255,255,0.15)",
        "glow-cyan": "0 0 40px rgba(255,255,255,0.1)",
        "card": "0 10px 30px -10px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.5)",
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
