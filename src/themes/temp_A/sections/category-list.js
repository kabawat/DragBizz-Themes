export default {
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
