import { withBlocks } from "./utils/blocks.js";
import {
  isAlternateKey,
  isPageKey,
  HANDLE as PAGE_HANDLE,
  HANDLE_MAX as PAGE_HANDLE_MAX,
  PAGE_PREFIX,
  templateType,
} from "./keys.js";
import { checkSetting } from "./validators/settings.js";

// A store's own pages live in the theme document as templates named "page.<handle>",
// shown at /pages/<handle>. Each one also carries its title and search-engine text.
export { isPageKey, PAGE_HANDLE, PAGE_HANDLE_MAX, PAGE_PREFIX, templateType };

export const PAGE_FIELDS = Object.freeze({
  title: 80,
  seo_title: 70,
  seo_description: 160,
});

export const pageKeys = (document) =>
  Object.keys(document?.templates ?? {}).filter(isPageKey);

// A URL handle from a page title: "Shipping & Returns" → "shipping-returns".
export function pageHandle(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, PAGE_HANDLE_MAX)
    .replace(/-+$/, "");
}

const section = (type, settings = {}, blocks) => ({
  type,
  settings,
  ...(blocks && withBlocks(blocks)),
});

const policy = (title, text) => ({
  name: title,
  title,
  sections: [["policy", section("rich-text", { heading: title, text })]],
});

// Starting points offered when a page is added. Texts are placeholders the merchant replaces.
export const PAGE_PRESETS = Object.freeze({
  about: {
    name: "About us",
    title: "About us",
    sections: [
      ["story", section("rich-text", { eyebrow: "Our story" })],
      ["promise", section("image-with-text")],
    ],
  },
  contact: {
    name: "Contact",
    title: "Contact us",
    sections: [["contact", section("contact-info")]],
  },
  faq: {
    name: "FAQ",
    title: "FAQ",
    sections: [
      [
        "faq",
        section("faq", {}, [
          [
            "question",
            {
              question: "How long does delivery take?",
              answer: "Most orders arrive within 2 to 5 working days.",
            },
          ],
          [
            "question",
            {
              question: "Can I return a product?",
              answer: "Yes. See our return policy for the details.",
            },
          ],
          [
            "question",
            {
              question: "How can I pay?",
              answer: "We accept UPI, cards and cash on delivery.",
            },
          ],
        ]),
      ],
    ],
  },
  privacy: policy(
    "Privacy policy",
    "Explain what customer information you collect, why you need it and how you keep it safe.",
  ),
  returns: policy(
    "Return and refund policy",
    "Explain which products can be returned, within how many days, and how refunds are paid.",
  ),
  shipping: policy(
    "Shipping policy",
    "Explain where you deliver, how long delivery takes and what it costs.",
  ),
  terms: policy(
    "Terms and conditions",
    "Set out the terms that apply when customers buy from your store.",
  ),
  landing: {
    name: "Landing page",
    title: "Special offer",
    sections: "landing",
  },
  blank: { name: "Blank page", title: "New page", sections: [] },
});

// The theme's own hero (from its demo home page) and a product grid make a landing page.
function landingSections(theme) {
  const home = theme.preset.templates.home;
  const heroId = home.order.find((id) => home.sections[id].type === "hero");
  const entries = [];
  if (heroId) entries.push(["hero", structuredClone(home.sections[heroId])]);
  entries.push(["products", section("featured-products")]);
  return entries;
}

// A new page template from a preset; `title` replaces the preset's own title.
export function createPage(theme, presetId, title) {
  const preset = PAGE_PRESETS[presetId] ?? PAGE_PRESETS.blank;
  const entries =
    preset.sections === "landing"
      ? landingSections(theme)
      : structuredClone(preset.sections);
  return {
    title: (title ?? preset.title).slice(0, PAGE_FIELDS.title),
    seo_title: "",
    seo_description: "",
    order: entries.map(([id]) => id),
    sections: Object.fromEntries(entries),
  };
}

// Keeps the settings another theme knows and accepts; the rest fall back to its defaults.
function fitSettings(defs, values = {}) {
  return Object.fromEntries(
    defs
      .filter((def) => def.id in values && !checkSetting(def, values[def.id]))
      .map((def) => [def.id, values[def.id]]),
  );
}

export function fitSection(schema, source) {
  const counts = {};
  const blockOrder = (source.blockOrder ?? []).filter((id) => {
    const type = source.blocks?.[id]?.type;
    const blockSchema = schema.blocks?.[type];
    if (!blockSchema) return false;
    counts[type] = (counts[type] ?? 0) + 1;
    return counts[type] <= (blockSchema.limit ?? Infinity);
  });
  const kept = blockOrder.slice(0, schema.maxBlocks ?? 0);
  return {
    type: source.type,
    settings: fitSettings(schema.settings, source.settings),
    ...(source.disabled && { disabled: true }),
    ...(kept.length && {
      blocks: Object.fromEntries(
        kept.map((id) => {
          const block = source.blocks[id];
          const defs = schema.blocks[block.type].settings;
          return [
            id,
            { type: block.type, settings: fitSettings(defs, block.settings) },
          ];
        }),
      ),
      blockOrder: kept,
    }),
  };
}

// The store's pages and alternate templates made to fit another theme, used when the store
// switches theme: sections the theme lacks are dropped and settings it does not know fall back
// to its defaults. Titles, search texts and assignments are kept.
export function carryPages(fromDocument, toTheme) {
  const keys = Object.keys(fromDocument?.templates ?? {}).filter(
    (key) => isPageKey(key) || isAlternateKey(key),
  );
  return Object.fromEntries(
    keys.map((key) => {
      const {
        order: from = [],
        sections = {},
        ...meta
      } = fromDocument.templates[key];
      const type = templateType(key);
      const order = from.filter((id) =>
        toTheme.sections[sections[id]?.type]?.templates.includes(type),
      );
      return [
        key,
        {
          ...structuredClone(meta),
          order,
          sections: Object.fromEntries(
            order.map((id) => [
              id,
              fitSection(toTheme.sections[sections[id].type], sections[id]),
            ]),
          ),
        },
      ];
    }),
  );
}
