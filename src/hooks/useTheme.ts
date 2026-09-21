/**
 * useTheme Hook
 * Easy access to theme configuration throughout the app
 */

import { colors, fonts, gradients, shadows, typography, spacing, borderRadius, zIndex } from "@/src/config/theme";

export function useTheme() {
  return {
    colors,
    fonts,
    gradients,
    shadows,
    typography,
    spacing,
    borderRadius,
    zIndex,


    getColor: (palette: keyof typeof colors, shade: string | number) => {
      const colorPalette = colors[palette];
      return colorPalette?.[shade as keyof typeof colorPalette] || "";
    },

    getPrimaryColor: () => colors.primary[400],
    getSecondaryColor: () => colors.secondary[400],

    getGradient: (type: keyof typeof gradients) => gradients[type],
  };
}
