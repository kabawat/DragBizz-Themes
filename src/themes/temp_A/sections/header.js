export default {
  type: "header",
  name: "Header",
  templates: ["header"],
  settings: [
    {
      id: "announcement",
      type: "text",
      label: "Announcement bar",
      default:
        "⚡ 5G Smartphone Festival — Flat ₹5,000 Exchange Bonus + No Cost EMI on All Cards",
    },
    {
      id: "search_placeholder",
      type: "text",
      label: "Search placeholder",
      maxLength: 80,
      default: "Search iPhone, Galaxy, OnePlus, Snapdragon...",
    },
    {
      id: "mobile_search_placeholder",
      type: "text",
      label: "Mobile search placeholder",
      maxLength: 80,
      default: "Search smartphones...",
    },
    {
      id: "cart_label",
      type: "text",
      label: "Cart label",
      maxLength: 30,
      default: "Cart",
    },
  ],
  blocks: {
    nav_link: {
      name: "Menu link",
      limit: 8,
      settings: [
        {
          id: "label",
          type: "text",
          label: "Label",
          maxLength: 40,
          default: "Link",
        },
        {
          id: "mobile_label",
          type: "text",
          label: "Mobile label (optional)",
          maxLength: 40,
          default: "",
        },
        { id: "link", type: "url", label: "Link", default: "/" },
      ],
    },
  },
  maxBlocks: 8,
};
