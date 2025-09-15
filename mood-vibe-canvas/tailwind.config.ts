import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Mood-based colors
        happy: {
          primary: "hsl(var(--happy-primary))",
          secondary: "hsl(var(--happy-secondary))",
          accent: "hsl(var(--happy-accent))",
        },
        calm: {
          primary: "hsl(var(--calm-primary))",
          secondary: "hsl(var(--calm-secondary))",
          accent: "hsl(var(--calm-accent))",
        },
        energetic: {
          primary: "hsl(var(--energetic-primary))",
          secondary: "hsl(var(--energetic-secondary))",
          accent: "hsl(var(--energetic-accent))",
        },
        melancholy: {
          primary: "hsl(var(--melancholy-primary))",
          secondary: "hsl(var(--melancholy-secondary))",
          accent: "hsl(var(--melancholy-accent))",
        },
        excited: {
          primary: "hsl(var(--excited-primary))",
          secondary: "hsl(var(--excited-secondary))",
          accent: "hsl(var(--excited-accent))",
        },
        peaceful: {
          primary: "hsl(var(--peaceful-primary))",
          secondary: "hsl(var(--peaceful-secondary))",
          accent: "hsl(var(--peaceful-accent))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(180deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 255, 255, 0.6)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "0", transform: "scale(0) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(180deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "sparkle": "sparkle 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
