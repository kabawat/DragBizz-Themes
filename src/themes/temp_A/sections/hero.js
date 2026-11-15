export default {
  type: "hero",
  name: "Hero banner",
  templates: ["home"],
  settings: [
    {
      id: "badge",
      type: "text",
      label: "Badge",
      maxLength: 60,
      default: "Next-Gen 5G Smartphone Festival",
    },
    {
      id: "heading",
      type: "text",
      label: "Heading",
      maxLength: 120,
      default: "Speed, AI & Flagship Precision.",
    },
    {
      id: "text",
      type: "textarea",
      label: "Text",
      maxLength: 400,
      default:
        "Experience titanium builds, 200MP periscope zoom cameras, Snapdragon 8 Gen 3 silicon, and lightning-fast 120W charging. Official brand warranties and guaranteed exchange bonuses.",
    },
    {
      id: "offer_enabled",
      type: "checkbox",
      label: "Show offer card",
      default: true,
    },
    {
      id: "offer_label",
      type: "text",
      label: "Offer label",
      maxLength: 40,
      default: "Hot Launch Offer",
    },
    {
      id: "offer_badge",
      type: "text",
      label: "Offer badge",
      maxLength: 40,
      default: "Save Up to ₹15,000",
    },
    {
      id: "offer_heading",
      type: "text",
      label: "Offer heading",
      maxLength: 80,
      default: "Flagship Trade-In & Upgrade",
    },
    {
      id: "offer_text",
      type: "textarea",
      label: "Offer text",
      maxLength: 300,
      default:
        "Upgrade your old smartphone to any 5G flagship today and receive an instant exchange valuation plus an additional ₹5,000 festival bonus.",
    },
    {
      id: "offer_button_label",
      type: "text",
      label: "Offer button label",
      maxLength: 40,
      default: "Check Eligible Devices",
    },
    {
      id: "offer_button_link",
      type: "url",
      label: "Offer button link",
      default: "/#catalog",
    },
  ],
  blocks: {
    button: {
      name: "Button",
      limit: 2,
      settings: [
        {
          id: "label",
          type: "text",
          label: "Label",
          maxLength: 40,
          default: "Shop now",
        },
        { id: "link", type: "url", label: "Link", default: "/#catalog" },
        {
          id: "style",
          type: "select",
          label: "Style",
          options: ["primary", "secondary"],
          default: "primary",
        },
      ],
    },
    stat: {
      name: "Highlight",
      limit: 3,
      settings: [
        {
          id: "value",
          type: "text",
          label: "Value",
          maxLength: 30,
          default: "",
        },
        {
          id: "label",
          type: "text",
          label: "Label",
          maxLength: 40,
          default: "",
        },
      ],
    },
    offer_row: {
      name: "Offer detail",
      limit: 4,
      settings: [
        {
          id: "label",
          type: "text",
          label: "Label",
          maxLength: 40,
          default: "",
        },
        {
          id: "value",
          type: "text",
          label: "Value",
          maxLength: 40,
          default: "",
        },
        {
          id: "highlight",
          type: "checkbox",
          label: "Highlight value",
          default: true,
        },
      ],
    },
  },
  maxBlocks: 9,
};
