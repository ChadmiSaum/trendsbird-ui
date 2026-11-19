import type { Config } from "tailwindcss";

const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        surface: token("surface"),
        card: token("card"),
        muted: { DEFAULT: token("muted"), foreground: token("muted-foreground") },
        border: token("border"),
        ring: token("ring"),
        primary: { DEFAULT: token("primary"), foreground: token("primary-foreground"), soft: token("primary-soft") },
        // The fixed brand blue: the active sidebar item, the account card and the
        // sign-in banner. Unlike `primary` it does not lighten in dark mode, so
        // white text on it keeps its contrast in both themes.
        brand: { DEFAULT: token("brand"), foreground: token("brand-foreground"), orange: token("brand-orange") },
        // The short bar on the left edge of section and page headers.
        accent: token("accent"),
        "sidebar-icon": { DEFAULT: token("sidebar-icon"), foreground: token("sidebar-icon-foreground") },
        success: { DEFAULT: token("success"), soft: token("success-soft") },
        warning: { DEFAULT: token("warning"), soft: token("warning-soft") },
        danger: { DEFAULT: token("danger"), soft: token("danger-soft") },
      },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
      boxShadow: {
        card: "0 1px 2px hsl(var(--shadow) / 0.04), 0 1px 1px hsl(var(--shadow) / 0.03)",
        pop: "0 12px 32px -8px hsl(var(--shadow) / 0.18), 0 2px 6px hsl(var(--shadow) / 0.06)",
        // The sidebar's drop shadow and the icon tiles inside it.
        sidebar: "0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)",
        tile: "0 6px 18px rgb(17 33 51 / 0.08)",
        topbar: "0 4px 18px rgb(39 59 82 / 0.04)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0", transform: "translateY(4px)" }, to: { opacity: "1", transform: "none" } },
        "pulse-ring": { "0%": { transform: "scale(1)", opacity: "0.6" }, "100%": { transform: "scale(2.4)", opacity: "0" } },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out both",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
