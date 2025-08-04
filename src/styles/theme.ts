export const theme = {
  colors: {
    primaryGlow: "#00f5ff",
    secondaryGlow: "#ff00ff",
    accentGlow: "#00ff88",
    surfaceGlass: "rgba(255, 255, 255, 0.05)",
    surfaceGlassBorder: "rgba(255, 255, 255, 0.15)",
    textPrimary: "#ffffff",
    textSecondary: "#b8c5d6",
    textGlow: "#00f5ff",
  },
  gradients: {
    background: "linear-gradient(135deg, #182016 24%, rgb(72, 49, 101) 100%)",
    backgroundOriginal:
      "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 35%, #16213e 100%)",
    primaryButton:
      "linear-gradient(135deg, var(--primary-glow), var(--secondary-glow))",
    hoverButton:
      "linear-gradient(135deg, var(--accent-glow), var(--primary-glow))",
    textGradient:
      "linear-gradient(135deg, var(--primary-glow), var(--secondary-glow), var(--accent-glow))",
    rangeTrack:
      "linear-gradient(90deg, rgba(0, 245, 255, 0.2), rgba(255, 0, 255, 0.2), rgba(0, 255, 136, 0.2))",
    rangeThumb:
      "linear-gradient(135deg, var(--primary-glow), var(--secondary-glow))",
  },
  fonts: {
    family:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    sizes: {
      h1: "3.2em",
      h2: "2rem",
      form: "1rem",
      body: "0.95rem",
      label: "0.9rem",
    },
    weights: {
      thin: "100",
      light: "300",
      normal: "400",
      medium: "500",
    },
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  transitions: {
    default: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fast: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  shadows: {
    glass:
      "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    glassHover:
      "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 245, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
    button:
      "0 8px 25px rgba(0, 245, 255, 0.3), 0 0 20px rgba(0, 245, 255, 0.2)",
    textGlow: "0 0 30px rgba(0, 245, 255, 0.5)",
    rangeThumb: "0 0 15px rgba(0, 245, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)",
    rangeThumbHover:
      "0 0 20px rgba(0, 245, 255, 0.7), 0 6px 12px rgba(0, 0, 0, 0.4)",
  },
} as const;

export type Theme = typeof theme;
