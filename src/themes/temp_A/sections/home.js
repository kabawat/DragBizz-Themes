export const categoryList = {
  type: "category-list",
  name: "Category list",
  templates: ["home"],
  settings: [
    {
      id: "eyebrow",
      type: "text",
      label: "Eyebrow",
      maxLength: 40,
      default: "Categories",
    },
    {
      id: "heading",
      type: "text",
      label: "Heading",
      maxLength: 80,
      default: "Explore by Smartphone Category",
    },
    {
      id: "count_label",
      type: "text",
      label: "Item count label",
      maxLength: 20,
      default: "Devices",
    },
  ],
};

export const featuredProducts = {
  type: "featured-products",
  name: "Featured products",
  templates: ["home"],
  settings: [
    {
      id: "eyebrow",
      type: "text",
      label: "Eyebrow",
      maxLength: 40,
      default: "Top Rated Picks",
    },
    {
      id: "heading",
      type: "text",
      label: "Heading",
      maxLength: 80,
      default: "Trending 5G Flagships",
    },
    {
      id: "link_label",
      type: "text",
      label: "Link label",
      maxLength: 40,
      default: "View All Smartphones",
    },
    { id: "link", type: "url", label: "Link", default: "#catalog" },
    {
      id: "limit",
      type: "number",
      label: "Products to show",
      min: 1,
      max: 12,
      default: 4,
    },
  ],
};

export const catalogExplorer = {
  type: "catalog-explorer",
  name: "Product catalog",
  templates: ["home"],
  settings: [
    {
      id: "title",
      type: "text",
      label: "Title",
      maxLength: 80,
      default: "5G Smartphone Catalog",
    },
    {
      id: "search_placeholder",
      type: "text",
      label: "Search placeholder",
      maxLength: 80,
      default: "Search model, chipset, or camera...",
    },
    {
      id: "empty_title",
      type: "text",
      label: "No results title",
      maxLength: 80,
      default: "No smartphones found",
    },
    {
      id: "empty_text",
      type: "text",
      label: "No results text",
      maxLength: 160,
      default: "Try adjusting your brand, price range, or search criteria.",
    },
  ],
};

export const trustBanner = {
  type: "trust-banner",
  name: "Trust banner",
  templates: ["home"],
  settings: [
    {
      id: "eyebrow",
      type: "text",
      label: "Eyebrow",
      maxLength: 60,
      default: "TECHPULSE Quality Pledge",
    },
    {
      id: "heading",
      type: "text",
      label: "Heading",
      maxLength: 120,
      default: "Official Indian Retail Warranty & Zero Counterfeits.",
    },
    {
      id: "text",
      type: "textarea",
      label: "Text",
      maxLength: 400,
      default:
        "Every device comes factory sealed directly from Apple India, Samsung India, OnePlus, and authorized brand distributors. Enjoy official on-site and walk-in service center support across India.",
    },
  ],
  blocks: {
    badge: {
      name: "Badge",
      limit: 6,
      settings: [
        { id: "text", type: "text", label: "Text", maxLength: 40, default: "" },
      ],
    },
  },
  maxBlocks: 6,
};
