import { SCHEMA_VERSION } from "../../constants/document.js";
import { withBlocks } from "../../utils/blocks.js";

const navLink = (label, link, mobileLabel = "") => [
  "nav_link",
  { label, link, mobile_label: mobileLabel },
];

export default {
  schemaVersion: SCHEMA_VERSION,
  theme: "temp_A",
  settings: {},
  sectionGroups: {
    header: {
      order: ["header"],
      sections: {
        header: {
          type: "header",
          settings: {},
          ...withBlocks([
            navLink("All Phones", "/#catalog", "All Smartphones"),
            navLink("Flagships", "/categories/flagships", "Ultra Flagships"),
            navLink("Performance", "/categories/mid-range", "Performance 5G"),
            navLink("Foldables", "/categories/foldables"),
            navLink("Budget 5G", "/categories/budget"),
          ]),
        },
      },
    },
    footer: {
      order: ["footer"],
      sections: {
        footer: {
          type: "footer",
          settings: {},
          ...withBlocks([
            ["link", { label: "Apple iPhone Series", link: "/search?q=Apple" }],
            [
              "link",
              {
                label: "Samsung Galaxy S & Z Series",
                link: "/search?q=Samsung",
              },
            ],
            [
              "link",
              { label: "OnePlus Flagship Series", link: "/search?q=OnePlus" },
            ],
            [
              "link",
              { label: "Google Pixel AI Phones", link: "/search?q=Google" },
            ],
            [
              "link",
              { label: "Xiaomi & Redmi Series", link: "/search?q=Xiaomi" },
            ],
            ["assurance", { text: "100% Brand Sealed Original Units" }],
            ["assurance", { text: "7-Day Easy Hardware Replacement" }],
            ["assurance", { text: "GST Invoicing with Input Credit" }],
            ["assurance", { text: "Free Express Transit Insurance" }],
            ["assurance", { text: "200+ Authorized Service Centers" }],
            ["legal_link", { label: "Privacy Policy", link: "/" }],
            ["legal_link", { label: "Warranty Terms", link: "/" }],
            ["legal_link", { label: "Trade-In Guidelines", link: "/" }],
          ]),
        },
      },
    },
  },
  templates: {
    home: {
      order: ["hero", "categories", "featured", "catalog", "pledge"],
      sections: {
        hero: {
          type: "hero",
          settings: {},
          ...withBlocks([
            [
              "button",
              {
                label: "Explore 5G Phones",
                link: "/#catalog",
                style: "primary",
              },
            ],
            [
              "button",
              {
                label: "Ultra Flagships",
                link: "/categories/flagships",
                style: "secondary",
              },
            ],
            ["stat", { value: "120W", label: "HyperCharge Speeds" }],
            ["stat", { value: "200 MP", label: "OIS Sensor Clarity" }],
            ["stat", { value: "No Cost EMI", label: "On All Major Banks" }],
            [
              "offer_row",
              {
                label: "Exchange Bonus:",
                value: "Up to ₹8,000",
                highlight: true,
              },
            ],
            [
              "offer_row",
              {
                label: "Bank Instant Cashback:",
                value: "Flat ₹4,000",
                highlight: true,
              },
            ],
            [
              "offer_row",
              {
                label: "Zero Down Payment:",
                value: "Available",
                highlight: false,
              },
            ],
          ]),
        },
        categories: { type: "category-list", settings: {} },
        featured: { type: "featured-products", settings: {} },
        catalog: { type: "catalog-explorer", settings: {} },
        pledge: {
          type: "trust-banner",
          settings: {},
          ...withBlocks([
            ["badge", { text: "100% Brand Sealed" }],
            ["badge", { text: "GST Input Tax Credit" }],
            ["badge", { text: "Instant Exchange Bonus" }],
          ]),
        },
      },
    },
  },
};
