export default {
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
