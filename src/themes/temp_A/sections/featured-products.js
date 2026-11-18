export default {
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
