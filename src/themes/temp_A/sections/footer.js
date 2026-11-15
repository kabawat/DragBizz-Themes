const linkSettings = [
  { id: "label", type: "text", label: "Label", maxLength: 60, default: "Link" },
  { id: "link", type: "url", label: "Link", default: "/" },
];

export default {
  type: "footer",
  name: "Footer",
  templates: ["footer"],
  settings: [
    {
      id: "about",
      type: "textarea",
      label: "About the store",
      maxLength: 400,
      default:
        "India's premier verified retailer for genuine smartphones, tablets, and accessories. 100% brand warranty with dedicated customer support.",
    },
    {
      id: "links_heading",
      type: "text",
      label: "Links heading",
      maxLength: 60,
      default: "Smartphone Brands",
    },
    {
      id: "assurance_heading",
      type: "text",
      label: "Assurance heading",
      maxLength: 60,
      default: "Customer Assurance",
    },
    {
      id: "show_newsletter",
      type: "checkbox",
      label: "Show newsletter signup",
      default: true,
    },
    {
      id: "newsletter_heading",
      type: "text",
      label: "Newsletter heading",
      maxLength: 60,
      default: "Tech Updates & Flash Sales",
    },
    {
      id: "newsletter_text",
      type: "textarea",
      label: "Newsletter text",
      maxLength: 240,
      default:
        "Subscribe to get notified before flash sales, price drops, and flagship pre-orders.",
    },
    {
      id: "newsletter_placeholder",
      type: "text",
      label: "Email placeholder",
      maxLength: 60,
      default: "Enter your email",
    },
    {
      id: "newsletter_button",
      type: "text",
      label: "Button label",
      maxLength: 30,
      default: "Subscribe",
    },
    {
      id: "newsletter_success",
      type: "text",
      label: "Success message",
      maxLength: 120,
      default: "You are subscribed to TechPulse smartphone alerts!",
    },
  ],
  blocks: {
    link: { name: "Footer link", limit: 8, settings: linkSettings },
    assurance: {
      name: "Assurance point",
      limit: 8,
      settings: [
        { id: "text", type: "text", label: "Text", maxLength: 80, default: "" },
      ],
    },
    legal_link: { name: "Bottom link", limit: 5, settings: linkSettings },
  },
  maxBlocks: 21,
};
