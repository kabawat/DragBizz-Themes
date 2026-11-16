import { withBlocks } from "../../blocks.js";
import { SCHEMA_VERSION } from "../../document.js";
import { THEME_SETTINGS } from "../../themeSettings.js";
import { withPages } from "../pages.js";
import {
  catalogExplorer,
  categoryList,
  featuredProducts,
  footer,
  header,
  hero,
} from "./sections.js";

const sections = [
  header,
  footer,
  hero,
  categoryList,
  featuredProducts,
  catalogExplorer,
];

const preset = {
  schemaVersion: SCHEMA_VERSION,
  theme: "temp_B",
  settings: {},
  sectionGroups: {
    header: {
      order: ["header"],
      sections: { header: { type: "header", settings: {} } },
    },
    footer: {
      order: ["footer"],
      sections: {
        footer: {
          type: "footer",
          settings: {},
          ...withBlocks([
            [
              "link",
              {
                label: "Farm-Fresh Fruits & Veggies",
                link: "/categories/fruits-veg",
              },
            ],
            [
              "link",
              { label: "Dairy, Bread & Eggs", link: "/categories/dairy-bread" },
            ],
            [
              "link",
              { label: "Atta, Rice & Pulses", link: "/categories/staples" },
            ],
            [
              "link",
              {
                label: "Roasted Nuts & Munchies",
                link: "/categories/snacks-dryfruits",
              },
            ],
            ["promise", { text: "Daily Morning Harvest at 5 AM" }],
            ["promise", { text: "Chilled Insulated Cold Chain" }],
            ["promise", { text: "No-Questions-Asked Instant Refund" }],
            ["promise", { text: "Zero Preservatives or Chemicals" }],
            ["legal_link", { label: "Terms of Service", link: "/" }],
            ["legal_link", { label: "Refund Policy", link: "/" }],
            ["legal_link", { label: "Food Safety Compliance", link: "/" }],
          ]),
        },
      },
    },
  },
  templates: {
    home: {
      order: ["hero", "categories", "featured", "catalog"],
      sections: {
        hero: {
          type: "hero",
          settings: {},
          ...withBlocks([
            [
              "button",
              {
                label: "Shop Daily Essentials",
                link: "/#grocery-catalog",
                style: "primary",
              },
            ],
            [
              "button",
              {
                label: "Fresh Fruits & Veggies",
                link: "/categories/fruits-veg",
                style: "secondary",
              },
            ],
            ["stat", { value: "15 Mins", label: "Guaranteed Express" }],
            [
              "stat",
              { value: "Zero Preservatives", label: "100% Verified Pure" },
            ],
            ["stat", { value: "Free Delivery", label: "On Orders Above ₹199" }],
            [
              "offer_point",
              { text: "Free chilled thermal bag with milk & dairy" },
            ],
            [
              "offer_point",
              { text: "Instant no-questions-asked refund if unsatisfied" },
            ],
          ]),
        },
        categories: { type: "category-list", settings: {} },
        featured: { type: "featured-products", settings: {} },
        catalog: { type: "catalog-explorer", settings: {} },
      },
    },
  },
};

export default withPages(
  {
    id: "temp_B",
    name: "Grocery & Supermarket",
    industry: "Grocery",
    version: "1.0.0",
    settings: THEME_SETTINGS,
    sectionGroups: ["header", "footer"],
    templates: ["home"],
    sections: Object.fromEntries(
      sections.map((section) => [section.type, section]),
    ),
    preset,
  },
  {
    category: {
      eyebrow: "Grocery Department",
      text: "Fresh essentials and {category}.",
      title: "{category} Section",
    },
    search: {
      eyebrow: "Fast Grocery Search",
      heading: 'Search Results for "{query}"',
      heading_empty: "Search Groceries",
      text: "Showing 15-minute express delivery grocery items matching your query.",
      title: 'Results for "{query}"',
      title_empty: "All Grocery Items",
    },
    product: {
      related_heading: "More Fresh Picks in {category}",
      labels: [
        [
          "fetching_fresh_grocery_product",
          "Fetching fresh grocery product details...",
        ],
        ["t_15minute_delivery", "⚡ 15-Minute Delivery"],
        ["shelf_life", "Shelf Life:"],
        ["mrp_inclusive_of_all", "(MRP inclusive of all taxes)"],
        ["select_pack_quantity", "Select Pack / Quantity"],
        ["item_added_in_basket", "Item added in basket"],
        ["added_to_your_instant", "Added to your instant grocery basket!"],
        ["why_order_from_freshmart", "Why order from FRESHMART?"],
        ["nutritional_values", "Nutritional Values"],
      ],
      points: [
        ["Quality inspected twice daily directly from farm mandis", "check"],
        ["Delivered in food-grade eco-friendly insulated pouches", "check"],
      ],
    },
  },
);
