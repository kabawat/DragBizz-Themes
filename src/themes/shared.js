import { withBlocks } from "../blocks.js";
import { SCHEMA_VERSION } from "../document.js";
import {
  checkbox,
  image,
  linkFields,
  number,
  select,
  text,
  textarea,
  url,
} from "../fields.js";
import { THEME_SETTINGS } from "../themeSettings.js";
import { withPages } from "./pages.js";

// Keeps only the fields a theme gives a value for, with that value as the default.
function pick(fields, values) {
  return fields
    .filter((field) => field.id in values)
    .map((field) => ({ ...field, default: values[field.id] }));
}

function pickBlocks(blocks, types) {
  return Object.fromEntries(types.map((type) => [type, blocks[type]]));
}

const button = {
  name: "Button",
  limit: 2,
  settings: [
    text("label", "Label", "Shop now", 40),
    url("link", "Link", "/"),
    select("style", "Style", ["primary", "secondary"], "primary"),
  ],
};

const point = (name, limit) => ({
  name,
  limit,
  settings: [text("text", "Text", "", 80)],
});

const HEADER_FIELDS = [
  text("announcement", "Announcement bar", "", 200),
  text("helpline_label", "Helpline label", "", 60),
  text("helpline_fallback", "Text without a phone number", "", 60),
  text("search_placeholder", "Search placeholder", "", 80),
  text("cart_label", "Cart label", "", 20),
];

export function header(values) {
  return {
    type: "header",
    name: "Header",
    templates: ["header"],
    settings: pick(HEADER_FIELDS, values),
    blocks: {
      nav_link: {
        name: "Menu link",
        limit: 8,
        settings: [...linkFields, checkbox("highlight", "Highlight", false)],
      },
    },
    maxBlocks: 8,
  };
}

const FOOTER_FIELDS = [
  textarea("about", "About the store", ""),
  text("note", "Note under about", "", 120),
  text("phone_label", "Phone label", "", 40),
  text("email_label", "Email label", "", 40),
  text("whatsapp_label", "WhatsApp label", "", 40),
  text("links_heading", "Links heading", "", 60),
  text("promise_heading", "Promise heading", "", 60),
  text("help_heading", "Help heading", "", 60),
  textarea("help_text", "Help text", "", 240),
  checkbox("newsletter_enabled", "Show newsletter form", true),
  text("newsletter_heading", "Newsletter heading", "", 60),
  textarea("newsletter_text", "Newsletter text", "", 240),
  text("newsletter_placeholder", "Newsletter placeholder", "", 60),
  text("newsletter_button", "Newsletter button", "", 30),
  text("newsletter_success", "Newsletter thank-you text", "", 120),
  text("copyright", "Copyright text", "All rights reserved.", 80),
];

export function footer(values) {
  return {
    type: "footer",
    name: "Footer",
    templates: ["footer"],
    settings: pick(FOOTER_FIELDS, values),
    blocks: {
      link: { name: "Footer link", limit: 8, settings: linkFields },
      promise: point("Promise point", 8),
      legal_link: { name: "Bottom link", limit: 5, settings: linkFields },
    },
    maxBlocks: 21,
  };
}

const HERO_FIELDS = [
  text("badge", "Badge", "", 80),
  text("heading", "Heading", ""),
  text("heading_accent", "Heading second line", ""),
  textarea("text", "Text", ""),
  checkbox("card_enabled", "Show side card", true),
  image("image", "Side image (shown instead of the card)", ""),
  text("image_alt", "Side image description", "", 120),
  text("card_label", "Card label", "", 60),
  text("card_tag", "Card tag", "", 40),
  text("card_heading", "Card heading", "", 80),
  textarea("card_text", "Card text", "", 300),
  text("card_link_label", "Card link label", "", 60),
  url("card_link", "Card link", "/"),
];

const HERO_BLOCKS = {
  button,
  stat: {
    name: "Highlight",
    limit: 3,
    settings: [text("value", "Value", "", 30), text("label", "Label", "", 40)],
  },
  card_step: point("Card step", 4),
  card_row: {
    name: "Card row",
    limit: 4,
    settings: [
      text("label", "Label", "", 40),
      text("value", "Value", "", 40),
      select("tone", "Colour", ["default", "primary", "success"], "default"),
    ],
  },
};

export function hero(values, blockTypes) {
  const blocks = pickBlocks(HERO_BLOCKS, blockTypes);
  return {
    type: "hero",
    name: "Hero banner",
    templates: ["home"],
    settings: pick(HERO_FIELDS, values),
    blocks,
    maxBlocks: Object.values(blocks).reduce((sum, b) => sum + b.limit, 0),
  };
}

const CATEGORY_FIELDS = [
  text("eyebrow", "Eyebrow", "", 40),
  text("heading", "Heading", "", 80),
  text("link_label", "Link label", "", 40),
  url("link", "Link", "/"),
  text("count_label", "Item count label", "", 20),
  text("fallback_text", "Text for categories without a description", "", 80),
];

export function categoryList(values) {
  return {
    type: "category-list",
    name: "Category list",
    templates: ["home"],
    settings: pick(CATEGORY_FIELDS, values),
  };
}

const FEATURED_FIELDS = [
  text("eyebrow", "Eyebrow", "", 40),
  text("heading", "Heading", "", 80),
  text("link_label", "Link label", "", 40),
  url("link", "Link", "/"),
  number("limit", "Products to show", 4, 1, 15),
];

export function featuredProducts(values) {
  return {
    type: "featured-products",
    name: "Featured products",
    templates: ["home"],
    settings: pick(FEATURED_FIELDS, values),
  };
}

const EXPLORER_FIELDS = [
  text("eyebrow", "Eyebrow", "", 40),
  text("title", "Title", "", 80),
  text("count_label", "Result count label", "", 40),
  text("search_placeholder", "Search placeholder", "", 80),
  text("empty_title", "No results title", "", 80),
  text("empty_text", "No results text", "", 160),
];

export function catalogExplorer(values) {
  return {
    type: "catalog-explorer",
    name: "Product catalog",
    templates: ["home"],
    settings: pick(EXPLORER_FIELDS, values),
  };
}

// Builds a theme whose preset home page is hero, categories, featured products and catalog.
export function buildTheme({ id, name, industry, sections, blocks, pages }) {
  const group = (type, entries) => ({
    order: [type],
    sections: { [type]: { type, settings: {}, ...withBlocks(entries) } },
  });

  return withPages(
    {
      id,
      name,
      industry,
      version: "1.0.0",
      settings: THEME_SETTINGS,
      sectionGroups: ["header", "footer"],
      templates: ["home"],
      sections: Object.fromEntries(
        sections.map((section) => [section.type, section]),
      ),
      preset: {
        schemaVersion: SCHEMA_VERSION,
        theme: id,
        settings: {},
        sectionGroups: {
          header: group("header", blocks.header),
          footer: group("footer", blocks.footer),
        },
        templates: {
          home: {
            order: ["hero", "categories", "featured", "catalog"],
            sections: {
              hero: { type: "hero", settings: {}, ...withBlocks(blocks.hero) },
              categories: { type: "category-list", settings: {} },
              featured: { type: "featured-products", settings: {} },
              catalog: { type: "catalog-explorer", settings: {} },
            },
          },
        },
      },
    },
    pages,
  );
}
