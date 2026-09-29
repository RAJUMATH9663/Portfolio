/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAFA",
        surface: "#FFFFFF",
        surfaceHover: "rgba(0, 0, 0, 0.03)",
        accent: "#F97316", // Vibrant Orange
        textMain: "#111111",
        textMuted: "#666666",
        textFaint: "#999999",
        border: "rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Inter", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      fontSize: {
        'display': ['clamp(4rem, 8vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '900' }],
        'section': ['clamp(3rem, 5vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'subheading': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '500' }],
        'body': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'detail': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      transitionTimingFunction: {
        'micro': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'normal': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'cinematic': 'cubic-bezier(0.8, 0, 0.2, 1)',
      },
      transitionDuration: {
        'micro': '200ms',
        'normal': '600ms',
        'cinematic': '1200ms',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
