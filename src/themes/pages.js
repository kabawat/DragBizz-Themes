import { checkbox, select, text, textarea } from "../fields.js";

// Category, search and product pages, added to every theme. Texts may use {category} or {query}.
export const PAGE_TEMPLATES = ["category", "search", "product"];

// Sections that also fit on these pages, besides their home page use.
const ALSO_ON = {
  "catalog-explorer": ["category", "search"],
  "featured-products": PAGE_TEMPLATES,
  "category-list": PAGE_TEMPLATES,
};

const categoryHeading = (values) => ({
  type: "category-heading",
  name: "Category heading",
  templates: ["category"],
  settings: [
    text("eyebrow", "Eyebrow", values.eyebrow, 40),
    textarea(
      "text",
      "Text when the category has no description",
      values.text,
      240,
    ),
  ],
});

const searchHeading = (values) => ({
  type: "search-heading",
  name: "Search heading",
  templates: ["search"],
  settings: [
    text("eyebrow", "Eyebrow", values.eyebrow, 40),
    text("heading", "Heading for a search", values.heading, 120),
    text(
      "heading_empty",
      "Heading without a search",
      values.heading_empty,
      120,
    ),
    textarea("text", "Text", values.text, 240),
  ],
});

const productDetails = (values) => ({
  type: "product-details",
  name: "Product details",
  templates: ["product"],
  settings: [
    checkbox("show_related", "Show related products", true),
    ...(values.related_eyebrow !== undefined
      ? [
          text(
            "related_eyebrow",
            "Related products eyebrow",
            values.related_eyebrow,
            40,
          ),
        ]
      : []),
    text(
      "related_heading",
      "Related products heading",
      values.related_heading,
      120,
    ),
  ],
});

const SPACING = ["default", "none", "small", "large"];
const SPACING_LABELS = {
  default: "Default",
  none: "None",
  small: "Small",
  large: "Large",
};

// Every section outside the header and footer can be shown per device and given extra space.
export const LAYOUT_SETTINGS = [
  {
    ...select("visibility", "Show on", ["all", "desktop", "mobile"], "all", {
      all: "Mobile and desktop",
      desktop: "Desktop only",
      mobile: "Mobile only",
    }),
    group: "Layout",
  },
  {
    ...select(
      "spacing_mobile",
      "Extra space on mobile",
      SPACING,
      "default",
      SPACING_LABELS,
    ),
    group: "Layout",
  },
  {
    ...select(
      "spacing_desktop",
      "Extra space on desktop",
      SPACING,
      "default",
      SPACING_LABELS,
    ),
    group: "Layout",
  },
];

const withLayout = (section) =>
  section.templates.some((key) => key === "header" || key === "footer")
    ? section
    : { ...section, settings: [...section.settings, ...LAYOUT_SETTINGS] };

function extend(section) {
  const extra = ALSO_ON[section.type];
  if (!extra) return section;
  const settings =
    section.type === "catalog-explorer"
      ? [
          ...section.settings,
          text("title_empty", "Title on search without text", "", 80),
        ]
      : section.settings;
  return { ...section, templates: [...section.templates, ...extra], settings };
}

const single = (type, settings = {}) => ({ type, settings });
const group = (entries) => ({
  order: entries.map(([id]) => id),
  sections: Object.fromEntries(entries),
});

// Returns the theme with the page templates, their sections and preset groups.
export function withPages(theme, texts) {
  const sections = Object.fromEntries(
    [
      ...Object.values(theme.sections).map(extend),
      categoryHeading(texts.category),
      searchHeading(texts.search),
      productDetails(texts.product),
    ]
      .map(withLayout)
      .map((section) => [section.type, section]),
  );

  return {
    ...theme,
    templates: [...theme.templates, ...PAGE_TEMPLATES],
    sections,
    preset: {
      ...theme.preset,
      templates: {
        ...theme.preset.templates,
        category: group([
          ["heading", single("category-heading")],
          [
            "catalog",
            single("catalog-explorer", { title: texts.category.title }),
          ],
        ]),
        search: group([
          ["heading", single("search-heading")],
          [
            "catalog",
            single("catalog-explorer", {
              title: texts.search.title,
              title_empty: texts.search.title_empty,
            }),
          ],
        ]),
        product: group([["details", single("product-details")]]),
      },
    },
  };
}

// Saved documents from before a template existed get it from the preset.
export function withPresetTemplates(document, theme) {
  const missing = theme.templates.filter((key) => !document.templates?.[key]);
  if (!missing.length) return document;
  return {
    ...document,
    templates: {
      ...document.templates,
      ...Object.fromEntries(
        missing.map((key) => [key, theme.preset.templates[key]]),
      ),
    },
  };
}
