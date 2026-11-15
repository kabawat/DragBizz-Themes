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

export default {
  id: "temp_A",
  name: "Electronics & Gadgets",
  version: "1.0.0",
  settings: [],
  sectionGroups: ["header", "footer"],
  templates: ["home"],
  sections: Object.fromEntries(
    sections.map((section) => [section.type, section]),
  ),
  preset,
};
