/**
 * Centralized Theme Configuration
 * Colors, fonts, and design tokens
 */

// ============ COLOR PALETTE ============
export const colors = {
  // Primary Colors
  primary: {
    50: "#e0e7ff",
    100: "#c7d2fe",
    200: "#a5b4fc",
    300: "#818cf8",
    400: "#6366f1", // Main - Indigo Soft
    500: "#4f46e5",
    600: "#4338ca",
    700: "#3730a3",
    800: "#312e81",
    900: "#1e1b4b",
  },

  // Secondary Colors
  secondary: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#67e8f9", // Cyan Muda - Light Cyan
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },

  // Neutral Colors
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // Status Colors
  status: {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  },

  // Background Colors
  bg: {
    light: "#f5f7fb",
    dark: "#0f172a",
    lightAlt: "#f8fafc",
    darkAlt: "#1e293b",
  },
};

// ============ FONT CONFIGURATION ============
export const fonts = {
  // Font Families
  sans: "var(--font-geist-sans)",
  mono: "var(--font-geist-mono)",

  // Font Sizes
  sizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
  },

  // Font Weights
  weights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line Heights
  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
};

// ============ TYPOGRAPHY PRESETS ============
export const typography = {
  heading: {
    h1: {
      size: fonts.sizes["7xl"],
      weight: fonts.weights.bold,
      lineHeight: fonts.lineHeights.tight,
      letterSpacing: fonts.letterSpacing.tighter,
    },
    h2: {
      size: fonts.sizes["5xl"],
      weight: fonts.weights.bold,
      lineHeight: fonts.lineHeights.tight,
      letterSpacing: fonts.letterSpacing.tighter,
    },
    h3: {
      size: fonts.sizes["4xl"],
      weight: fonts.weights.bold,
      lineHeight: fonts.lineHeights.snug,
      letterSpacing: fonts.letterSpacing.tight,
    },
    h4: {
      size: fonts.sizes["3xl"],
      weight: fonts.weights.semibold,
      lineHeight: fonts.lineHeights.snug,
    },
    h5: {
      size: fonts.sizes["2xl"],
      weight: fonts.weights.semibold,
      lineHeight: fonts.lineHeights.normal,
    },
    h6: {
      size: fonts.sizes.xl,
      weight: fonts.weights.semibold,
      lineHeight: fonts.lineHeights.normal,
    },
  },

  body: {
    large: {
      size: fonts.sizes.lg,
      weight: fonts.weights.normal,
      lineHeight: fonts.lineHeights.relaxed,
    },
    base: {
      size: fonts.sizes.base,
      weight: fonts.weights.normal,
      lineHeight: fonts.lineHeights.normal,
    },
    small: {
      size: fonts.sizes.sm,
      weight: fonts.weights.normal,
      lineHeight: fonts.lineHeights.snug,
    },
  },

  button: {
    size: fonts.sizes.base,
    weight: fonts.weights.semibold,
    lineHeight: fonts.lineHeights.tight,
    letterSpacing: fonts.letterSpacing.wide,
  },

  label: {
    size: fonts.sizes.sm,
    weight: fonts.weights.medium,
    lineHeight: fonts.lineHeights.snug,
    letterSpacing: fonts.letterSpacing.wide,
  },
};

// ============ SPACING ============
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
};

// ============ GRADIENTS ============
export const gradients = {
  primaryToCyan: `linear-gradient(to right, ${colors.primary[400]}, ${colors.secondary[400]})`,
  primaryToSecondary: `linear-gradient(to br, ${colors.primary[500]}, ${colors.secondary[500]})`,
  bgGradient: `linear-gradient(to br, ${colors.bg.light} 0%, ${colors.primary[50]} 100%)`,
  bgDarkGradient: `linear-gradient(to br, ${colors.bg.dark} 0%, ${colors.primary[900]} 100%)`,
};

// ============ SHADOWS ============
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  glow: `0 0 20px ${colors.primary[400]}80`,
  glowCyan: `0 0 20px ${colors.secondary[400]}80`,
};

// ============ BORDER RADIUS ============
export const borderRadius = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
};

// ============ Z-INDEX ============
export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  notification: 80,
  loader: 9999,
};
