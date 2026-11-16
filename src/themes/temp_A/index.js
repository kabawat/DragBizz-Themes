import { THEME_SETTINGS } from "../../themeSettings.js";
import { withPages } from "../pages.js";
import preset from "./preset.js";
import footer from "./sections/footer.js";
import header from "./sections/header.js";
import hero from "./sections/hero.js";
import {
  catalogExplorer,
  categoryList,
  featuredProducts,
  trustBanner,
} from "./sections/home.js";

const sections = [
  header,
  footer,
  hero,
  categoryList,
  featuredProducts,
  catalogExplorer,
  trustBanner,
];

export default withPages(
  {
    id: "temp_A",
    name: "Electronics & Gadgets",
    version: "1.0.0",
    settings: THEME_SETTINGS,
    sectionGroups: ["header", "footer"],
    templates: ["home"],
    sections: Object.fromEntries(
      sections.map((section) => [section.type, section]),
    ),
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
      related_eyebrow: "Similar Tech",
    },
  },
);
