import { color, image, select } from "./fields.js";

// Theme-wide look, the same for every theme. Each value left empty or at "store"
// keeps the store's branding palette and font, so a new theme looks like the store.
const field = (group, def) => ({ ...def, group });

export const THEME_SETTINGS = [
  field("Colours", color("color_primary", "Primary (buttons, links)")),
  field("Colours", color("color_on_primary", "Text on primary")),
  field("Colours", color("color_secondary", "Secondary")),
  field("Colours", color("color_accent", "Accent (offers, badges)")),
  field("Colours", color("color_background", "Page background")),
  field("Colours", color("color_surface", "Cards and panels")),
  field("Colours", color("color_text", "Text")),
  field("Colours", color("color_text_muted", "Muted text")),
  field("Colours", color("color_border", "Borders")),
  field(
    "Typography",
    select(
      "font",
      "Font",
      ["store", "inter", "poppins", "roboto", "lato", "montserrat", "nunito"],
      "store",
      {
        store: "Store default",
        inter: "Inter",
        poppins: "Poppins",
        roboto: "Roboto",
        lato: "Lato",
        montserrat: "Montserrat",
        nunito: "Nunito",
      },
    ),
  ),
  field(
    "Typography",
    select(
      "font_style",
      "Font style",
      ["store", "modern", "classic", "rounded"],
      "store",
      {
        store: "Store default",
        modern: "Modern",
        classic: "Classic",
        rounded: "Rounded",
      },
    ),
  ),
  field(
    "Buttons",
    select(
      "button_shape",
      "Button shape",
      ["store", "square", "rounded", "pill"],
      "store",
      {
        store: "Store default",
        square: "Square",
        rounded: "Rounded",
        pill: "Pill",
      },
    ),
  ),
  field(
    "Layout",
    select(
      "section_spacing",
      "Space between sections",
      ["store", "compact", "comfortable", "spacious"],
      "store",
      {
        store: "Theme default",
        compact: "Compact",
        comfortable: "Comfortable",
        spacious: "Spacious",
      },
    ),
  ),
  field("Brand", image("logo", "Logo (replaces the store logo)", "")),
  field("Brand", image("favicon", "Favicon (square image)", "")),
  // Two extra colour sets a section can switch to (its "Colour scheme" setting).
  field("Colour schemes", {
    ...color("scheme_light_background", "Light accent: background"),
    default: "#eef2ff",
  }),
  field("Colour schemes", {
    ...color("scheme_light_text", "Light accent: text"),
    default: "#1e1b4b",
  }),
  field("Colour schemes", {
    ...color("scheme_light_primary", "Light accent: buttons and links"),
    default: "#4338ca",
  }),
  field("Colour schemes", {
    ...color("scheme_dark_background", "Dark: background"),
    default: "#0f172a",
  }),
  field("Colour schemes", {
    ...color("scheme_dark_text", "Dark: text"),
    default: "#f8fafc",
  }),
  field("Colour schemes", {
    ...color("scheme_dark_primary", "Dark: buttons and links"),
    default: "#60a5fa",
  }),
];
