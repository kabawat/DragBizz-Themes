export default {
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
