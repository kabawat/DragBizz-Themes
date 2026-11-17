import { withBlocks } from "./utils/blocks.js";
import { LIMITS } from "./constants/document.js";
import { getTheme, themes } from "./themes/index.js";
import { fitSection, PAGE_PREFIX, pageHandle } from "./pages.js";
import { checkSetting } from "./validators/settings.js";
import { THEME_SETTINGS } from "./constants/themeSettings.js";

// The AI theme builder (DragBizz-Studio) fills a small "theme plan" instead of a whole document.
// `aiRegistry()` describes what it may use; `assembleAiTheme(plan)` turns a plan into a valid
// document on the chosen theme's preset. The model never writes code, CSS, HTML or image URLs.
export const AI_LIMITS = Object.freeze({
  homeSections: 12,
  pages: 5,
  sectionsPerPage: 6,
  menuLinks: 8,
  footerLinks: 8,
});

// Setting types the model may fill. Images, colours per section, product pickers and code are
// left to the merchant (or the theme's defaults).
const AI_SETTING_TYPES = new Set([
  "text",
  "textarea",
  "select",
  "checkbox",
  "number",
  "url",
]);
const AI_THEME_SETTINGS = new Set(["color", "select"]);
const LAYOUT_ONLY = new Set([
  "visibility",
  "spacing_mobile",
  "spacing_desktop",
  "source",
  "level",
]);
const NOT_FOR_AI = new Set([
  "html-embed",
  "product-details",
  "category-heading",
  "search-heading",
]);

function describeSetting(def) {
  return {
    id: def.id,
    type: def.type,
    label: def.label,
    ...(def.maxLength && { maxLength: def.maxLength }),
    ...(def.options && { options: def.options }),
    ...(def.min !== undefined && { min: def.min, max: def.max }),
  };
}

const aiSettings = (defs) =>
  defs
    .filter((def) => AI_SETTING_TYPES.has(def.type) && !LAYOUT_ONLY.has(def.id))
    .map(describeSetting);

function describeSection(section) {
  return {
    type: section.type,
    name: section.name,
    settings: aiSettings(section.settings),
    ...(section.blocks && {
      blocks: Object.fromEntries(
        Object.entries(section.blocks).map(([type, block]) => [
          type,
          {
            name: block.name,
            limit: block.limit,
            settings: aiSettings(block.settings),
          },
        ]),
      ),
      maxBlocks: section.maxBlocks,
    }),
  };
}

const sectionsFor = (theme, template) =>
  Object.values(theme.sections)
    .filter((s) => s.templates.includes(template) && !NOT_FOR_AI.has(s.type))
    .map(describeSection);

// Everything the builder may choose from, per theme.
export function aiRegistry() {
  return {
    limits: AI_LIMITS,
    themeSettings: THEME_SETTINGS.filter(
      (def) => AI_THEME_SETTINGS.has(def.type) && !def.id.startsWith("scheme_"),
    ).map(describeSetting),
    themes: Object.values(themes).map((theme) => ({
      id: theme.id,
      name: theme.name,
      industry: theme.industry,
      header: aiSettings(theme.sections.header.settings),
      footer: aiSettings(theme.sections.footer.settings),
      home: sectionsFor(theme, "home"),
      page: sectionsFor(theme, "page"),
    })),
  };
}

// Models write every value as text ("true", "8"); this gives it the setting's own type.
function coerce(def, value) {
  if (typeof value !== "string") return value;
  if (def.type === "checkbox" && (value === "true" || value === "false")) {
    return value === "true";
  }
  if (def.type === "number" && /^-?\d+(\.\d+)?$/.test(value.trim())) {
    return Number(value);
  }
  return value;
}

const keepValid = (defs, values = {}) =>
  Object.fromEntries(
    defs
      .filter((def) => AI_SETTING_TYPES.has(def.type) && def.id in values)
      .map((def) => [def, coerce(def, values[def.id])])
      .filter(([def, value]) => !checkSetting(def, value))
      .map(([def, value]) => [def.id, value]),
  );

// A model section { type, settings, blocks: [{ type, settings }] } fitted to the theme's schema.
function buildSection(theme, template, input) {
  const schema = theme.sections[input?.type];
  if (
    !schema ||
    NOT_FOR_AI.has(schema.type) ||
    !schema.templates.includes(template)
  )
    return null;
  const blocks = (Array.isArray(input.blocks) ? input.blocks : [])
    .filter((block) => schema.blocks?.[block?.type])
    .map((block) => [
      block.type,
      keepValid(schema.blocks[block.type].settings, block.settings),
    ]);
  return fitSection(schema, {
    type: schema.type,
    settings: keepValid(schema.settings, input.settings),
    ...withBlocks(blocks),
  });
}

function group(theme, template, inputs, max) {
  const entries = (Array.isArray(inputs) ? inputs : [])
    .map((input) => buildSection(theme, template, input))
    .filter(Boolean)
    .slice(0, max)
    .map((section, index) => [`${section.type}-${index + 1}`, section]);
  return {
    order: entries.map(([id]) => id),
    sections: Object.fromEntries(entries),
  };
}

// Links the model may use: the store's own pages and categories, search and home.
function safeLink(link) {
  return typeof link === "string" &&
    /^\/(?:$|#[a-z0-9-]+$|search(?:\?q=[\w%+-]{1,60})?$|categories\/[a-z0-9-]{1,120}$|pages\/[a-z0-9-]{1,60}$)/.test(
      link,
    )
    ? link
    : null;
}

function linkBlocks(links, type, max, extra = {}) {
  return (Array.isArray(links) ? links : [])
    .map((item) => ({
      label: String(item?.label ?? "")
        .trim()
        .slice(0, 60),
      link: safeLink(item?.link),
    }))
    .filter((item) => item.label && item.link)
    .slice(0, max)
    .map((item) => [type, { label: item.label, link: item.link, ...extra }]);
}

// The plan the model returns:
// { theme, settings, header: { settings, links: [{ label, link }] }, footer: { settings, links },
//   home: [section], pages: [{ title, sections: [section] }] }
// Returns { document, theme } or { error }.
export function assembleAiTheme(plan) {
  const theme = getTheme(plan?.theme);
  if (!theme) return { error: "plan.theme must be one of the theme ids" };
  const document = structuredClone(theme.preset);

  const themeDefs = THEME_SETTINGS.filter((def) =>
    AI_THEME_SETTINGS.has(def.type),
  );
  document.settings = Object.fromEntries(
    themeDefs
      .filter(
        (def) =>
          def.id in (plan.settings ?? {}) &&
          !checkSetting(def, plan.settings[def.id]),
      )
      .map((def) => [def.id, plan.settings[def.id]]),
  );

  const header = document.sectionGroups.header.sections.header;
  header.settings = keepValid(
    theme.sections.header.settings,
    plan.header?.settings,
  );
  // The design's demo menu is replaced by the plan's links where the header has a menu.
  if (theme.sections.header.blocks?.nav_link) {
    Object.assign(
      header,
      withBlocks(
        linkBlocks(plan.header?.links, "nav_link", AI_LIMITS.menuLinks),
      ),
    );
  }

  const footer = document.sectionGroups.footer.sections.footer;
  footer.settings = keepValid(
    theme.sections.footer.settings,
    plan.footer?.settings,
  );
  const footerLinks = linkBlocks(
    plan.footer?.links,
    "link",
    AI_LIMITS.footerLinks,
  );
  if (footerLinks.length && theme.sections.footer.blocks?.link) {
    Object.assign(footer, withBlocks(footerLinks));
  } else {
    delete footer.blocks;
    delete footer.blockOrder;
  }

  const home = group(theme, "home", plan.home, AI_LIMITS.homeSections);
  if (home.order.length) document.templates.home = home;

  const handles = new Set();
  for (const page of (Array.isArray(plan.pages) ? plan.pages : []).slice(
    0,
    AI_LIMITS.pages,
  )) {
    const title = String(page?.title ?? "")
      .trim()
      .slice(0, 80);
    let handle = pageHandle(page?.handle || title);
    if (!title || !handle) continue;
    while (handles.has(handle)) handle = `${handle}-2`.slice(0, 60);
    handles.add(handle);
    const sections = group(
      theme,
      "page",
      page.sections,
      AI_LIMITS.sectionsPerPage,
    );
    if (!sections.order.length) continue;
    document.templates[`${PAGE_PREFIX}${handle}`] = {
      title,
      seo_title: String(page.seo_title ?? "").slice(0, 70),
      seo_description: String(page.seo_description ?? "").slice(0, 160),
      ...sections,
    };
  }
  if (JSON.stringify(document).length > LIMITS.documentBytes) {
    return { error: "the assembled theme is too large" };
  }
  return { document, theme };
}
