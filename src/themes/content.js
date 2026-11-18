import {
  checkbox,
  image,
  number,
  select,
  text,
  textarea,
  url,
} from "../utils/fields.js";

// Sections for the store's own pages (About, Contact, FAQ, policies, landing pages) that can
// also build a home page from scratch. Every theme has them, so pages and patterns keep working
// when the store switches theme.

const richText = {
  type: "rich-text",
  name: "Text",
  templates: ["page", "home"],
  settings: [
    text("eyebrow", "Eyebrow", "", 40),
    text("heading", "Heading", "Our story", 120),
    textarea(
      "text",
      "Text (a blank line starts a new paragraph)",
      "Tell customers who you are, what you sell and why they can trust you.",
      5000,
    ),
    select("align", "Alignment", ["left", "center"], "left", {
      left: "Left",
      center: "Centre",
    }),
    select("width", "Width", ["narrow", "wide"], "narrow", {
      narrow: "Narrow (easier to read)",
      wide: "Wide",
    }),
  ],
};

const imageWithText = {
  type: "image-with-text",
  name: "Image with text",
  templates: ["page", "home"],
  settings: [
    image("image", "Image", ""),
    text("image_alt", "Image description", "", 120),
    select("image_position", "Image position", ["left", "right"], "left", {
      left: "Image on the left",
      right: "Image on the right",
    }),
    text("eyebrow", "Eyebrow", "", 40),
    text("heading", "Heading", "Made with care", 120),
    textarea(
      "text",
      "Text",
      "Share what makes your products or service special.",
      2000,
    ),
    text("button_label", "Button label", "", 40),
    url("button_link", "Button link", "/"),
  ],
};

const faq = {
  type: "faq",
  name: "Questions and answers",
  templates: ["page", "home"],
  settings: [
    text("eyebrow", "Eyebrow", "", 40),
    text("heading", "Heading", "Frequently asked questions", 120),
    textarea("text", "Text", "", 400),
  ],
  blocks: {
    question: {
      name: "Question",
      limit: 30,
      settings: [
        text("question", "Question", "", 200),
        textarea("answer", "Answer", "", 1000),
      ],
    },
  },
  maxBlocks: 30,
};

const contactInfo = {
  type: "contact-info",
  name: "Contact details",
  templates: ["page", "home"],
  settings: [
    text("eyebrow", "Eyebrow", "", 40),
    text("heading", "Heading", "Get in touch", 120),
    textarea(
      "text",
      "Text",
      "We are happy to help with orders, products and delivery.",
      400,
    ),
    checkbox("show_phone", "Show phone number", true),
    checkbox("show_email", "Show email", true),
    checkbox("show_whatsapp", "Show WhatsApp", true),
    textarea("address", "Address", "", 300),
    text("hours", "Opening hours", "", 120),
  ],
};

// Code from another service (a form, map, booking widget…). The storefront shows it in a
// sandboxed frame without access to the store's page, cookies or customers' data.
const htmlEmbed = {
  type: "html-embed",
  name: "HTML embed",
  templates: ["page", "home"],
  settings: [
    text("title", "What it shows (for screen readers)", "Embedded content", 80),
    {
      id: "html",
      type: "html",
      label: "HTML code",
      maxLength: 20000,
      default: "",
    },
    number("height", "Height in pixels", 400, 50, 2000),
  ],
};

export const CONTENT_SECTIONS = [
  richText,
  imageWithText,
  faq,
  contactInfo,
  htmlEmbed,
];
