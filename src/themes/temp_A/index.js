import { THEME_SETTINGS } from "../../constants/themeSettings.js";
import { withPages } from "../pages.js";
import preset from "./preset.js";
import sections from "./sections/index.js";

export default withPages(
  {
    id: "temp_A",
    name: "Electronics & Gadgets",
    industry: "Electronics",
    version: "1.0.0",
    settings: THEME_SETTINGS,
    sectionGroups: ["header", "footer"],
    templates: ["home"],
    sections,
    preset,
  },
  {
    category: {
      eyebrow: "Category Collection",
      text: "Browse our complete lineup of {category}.",
      title: "{category} Lineup",
    },
    search: {
      eyebrow: "Smart Search",
      heading: 'Search Results for "{query}"',
      heading_empty: "Search Smartphones",
      text: "Search across 5G models, processors (Snapdragon, Tensor, Bionic), periscope cameras, and RAM/storage variants.",
      title: 'Matching "{query}"',
      title_empty: "All Smartphone Models",
    },
    product: {
      related_heading: "Compare with Similar Smartphones",
      labels: [
        [
          "loading_smartphone_specifications",
          "Loading smartphone specifications...",
        ],
        ["t_5g_enabled", "5G Enabled"],
        ["out_of_stock", "Out of Stock"],
        ["inclusive_of_all_taxes", "Inclusive of all taxes"],
        ["or_pay", "Or pay"],
        ["configuration_storage", "Configuration / Storage:"],
        ["color_finish", "Color Finish:"],
        ["key_highlights", "Key Highlights"],
        ["full_technical_specifications", "Full Technical Specifications"],
        ["view_all", "View All"],
      ],
      points: [
        [
          "1 Year Manufacturer Warranty on Device & 6 Months for In-Box Accessories",
          "shield",
        ],
        ["7 Days Replacement Policy for Hardware Defect", "refresh"],
        ["Express Insured Delivery with Free Transit Insurance", "zap"],
      ],
      related_eyebrow: "Similar Tech",
    },
  },
);
