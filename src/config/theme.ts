// ─── Design Tokens ────────────────────────────────────────────────────────────

export const colors = {
  // Accent gray
  accent: {
    default: '#6E6E6E',
    hover: '#4A4A4A',
    ring: '#333333',
  },
  // Black
  black: {
    DEFAULT: '#0A0A0A',
    soft: '#1A1A1A',
  },
  // Gray scale
  gray: {
    100: '#F8F8F8',
    200: '#F5F5F5',
    300: '#F0F0F0',
    400: '#E5E5E5',
    500: '#E0E0E0',
    600: '#D5D5D5',
    700: '#C0C0C0',
    800: '#BBBBBB',
    900: '#999999',
  },
  // Text colors
  text: {
    primary: '#0A0A0A',
    secondary: '#555555',
    tertiary: '#666666',
    quaternary: '#888888',
  },
} as const;

// Backwards compatibility exports
export const AC = colors.accent.default;
export const ACH = colors.accent.hover;
export const ACR = colors.accent.ring;
