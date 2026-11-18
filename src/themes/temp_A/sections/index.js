import catalogExplorer from "./catalog-explorer.js";
import categoryList from "./category-list.js";
import featuredProducts from "./featured-products.js";
import footer from "./footer.js";
import header from "./header.js";
import hero from "./hero.js";
import trustBanner from "./trust-banner.js";

const sectionList = [
  header,
  footer,
  hero,
  categoryList,
  featuredProducts,
  catalogExplorer,
  trustBanner,
];

export default Object.fromEntries(
  sectionList.map((section) => [section.type, section]),
);
