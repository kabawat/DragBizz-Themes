// Store branding colour palettes (the dashboard's "Active Color Palette"). A theme's own colour
// settings override them token by token; empty settings keep the palette.
export const PALETTES = {
  "royal-blue": {
    id: "royal-blue",
    name: "Royal Blue",
    tokens: {
      primary: "#1d4ed8",
      primaryHover: "#1e40af",
      secondary: "#3b82f6",
      accent: "#f59e0b",
      background: "#f8fafc",
      surface: "#ffffff",
      text: "#0f172a",
      textMuted: "#64748b",
      border: "#e2e8f0",
      onPrimary: "#ffffff",
    },
  },
  "emerald-green": {
    id: "emerald-green",
    name: "Emerald Green",
    tokens: {
      primary: "#047857",
      primaryHover: "#065f46",
      secondary: "#10b981",
      accent: "#d97706",
      background: "#f0fdf4",
      surface: "#ffffff",
      text: "#064e3b",
      textMuted: "#4b7c6f",
      border: "#d1fae5",
      onPrimary: "#ffffff",
    },
  },
  "sunset-orange": {
    id: "sunset-orange",
    name: "Sunset Orange",
    tokens: {
      primary: "#ea580c",
      primaryHover: "#c2410c",
      secondary: "#f97316",
      accent: "#0284c7",
      background: "#fff7ed",
      surface: "#ffffff",
      text: "#431407",
      textMuted: "#9a3412",
      border: "#fed7aa",
      onPrimary: "#ffffff",
    },
  },
  "elegant-violet": {
    id: "elegant-violet",
    name: "Elegant Violet",
    tokens: {
      primary: "#6d28d9",
      primaryHover: "#5b21b6",
      secondary: "#8b5cf6",
      accent: "#f43f5e",
      background: "#faf5ff",
      surface: "#ffffff",
      text: "#2e1065",
      textMuted: "#6b7280",
      border: "#ede9fe",
      onPrimary: "#ffffff",
    },
  },
  "rose-pink": {
    id: "rose-pink",
    name: "Rose Pink",
    tokens: {
      primary: "#be123c",
      primaryHover: "#9f1239",
      secondary: "#f43f5e",
      accent: "#059669",
      background: "#fff1f2",
      surface: "#ffffff",
      text: "#4c0519",
      textMuted: "#9f1239",
      border: "#fecdd3",
      onPrimary: "#ffffff",
    },
  },
  "midnight-dark": {
    id: "midnight-dark",
    name: "Midnight Dark",
    tokens: {
      primary: "#38bdf8",
      primaryHover: "#7dd3fc",
      secondary: "#818cf8",
      accent: "#34d399",
      background: "#09090b",
      surface: "#18181b",
      text: "#f4f4f5",
      textMuted: "#a1a1aa",
      border: "#27272a",
      onPrimary: "#09090b",
    },
  },
};

export const DEFAULT_PALETTE = "royal-blue";

// Theme colour settings and the palette token each one replaces.
export const COLOR_TOKENS = {
  color_primary: "primary",
  color_on_primary: "onPrimary",
  color_secondary: "secondary",
  color_accent: "accent",
  color_background: "background",
  color_surface: "surface",
  color_text: "text",
  color_text_muted: "textMuted",
  color_border: "border",
};

// The colours a store shows: its palette with the theme's own colour settings on top.
export function effectiveColors(paletteId, settings = {}) {
  const palette = PALETTES[paletteId] ?? PALETTES[DEFAULT_PALETTE];
  return Object.fromEntries(
    Object.entries(COLOR_TOKENS).map(([id, token]) => [
      id,
      settings[id] || palette.tokens[token],
    ]),
  );
}
