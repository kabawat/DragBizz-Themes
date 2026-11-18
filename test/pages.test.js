import assert from "node:assert/strict";
import test from "node:test";
import {
  carryPages,
  createPage,
  isPageKey,
  LIMITS,
  missingAltText,
  PAGE_PRESETS,
  pageHandle,
  pageKeys,
  themes,
  validateDocument,
} from "../src/index.js";

const withPage = (theme, key, page) => ({
  ...structuredClone(theme.preset),
  templates: { ...structuredClone(theme.preset.templates), [key]: page },
});
const paths = (result) => result.errors.map((error) => error.path);

for (const theme of Object.values(themes)) {
  test(`${theme.id}: every page preset makes a valid page`, () => {
    for (const presetId of Object.keys(PAGE_PRESETS)) {
      const doc = withPage(theme, "page.x", createPage(theme, presetId));
      assert.deepEqual(validateDocument(doc, theme).errors, [], presetId);
    }
  });
}

test("page keys need a lowercase handle", () => {
  assert.equal(isPageKey("page.about-us"), true);
  assert.equal(isPageKey("page.About"), false);
  assert.equal(isPageKey("page."), false);
  assert.equal(isPageKey("page.a--b"), false);
  assert.equal(isPageKey(`page.${"a".repeat(61)}`), false);
  assert.equal(isPageKey("home"), false);
});

test("handles come from titles", () => {
  assert.equal(pageHandle("Shipping & Returns"), "shipping-returns");
  assert.equal(pageHandle("  About Us!  "), "about-us");
  assert.equal(pageHandle("कैसे"), "");
});

test("rejects bad page keys, missing titles and long search text", () => {
  const theme = themes.temp_A;
  const page = createPage(theme, "about");
  const bad = withPage(theme, "page.Bad", page);
  assert.deepEqual(paths(validateDocument(bad, theme)), ["templates.page.Bad"]);

  const untitled = withPage(theme, "page.about", { ...page, title: " " });
  assert.deepEqual(paths(validateDocument(untitled, theme)), [
    "templates.page.about.title",
  ]);

  const long = withPage(theme, "page.about", {
    ...page,
    seo_description: "x".repeat(161),
  });
  assert.deepEqual(paths(validateDocument(long, theme)), [
    "templates.page.about.seo_description",
  ]);
});

test("only page sections can go on a page, and page sections stay off product pages", () => {
  const theme = themes.temp_A;
  const doc = withPage(theme, "page.x", {
    title: "X",
    order: ["details"],
    sections: { details: { type: "product-details" } },
  });
  assert.deepEqual(paths(validateDocument(doc, theme)), [
    "templates.page.x.sections.details.type",
  ]);

  const category = structuredClone(theme.preset);
  category.templates.category = {
    order: ["faq"],
    sections: { faq: { type: "faq" } },
  };
  assert.deepEqual(paths(validateDocument(category, theme)), [
    "templates.category.sections.faq.type",
  ]);
});

test(`a document holds at most ${LIMITS.pages} pages`, () => {
  const theme = themes.temp_A;
  const doc = structuredClone(theme.preset);
  for (let i = 0; i <= LIMITS.pages; i += 1) {
    doc.templates[`page.p${i}`] = createPage(theme, "blank", `Page ${i}`);
  }
  assert.deepEqual(paths(validateDocument(doc, theme)), ["templates"]);
});

test("pages follow the store to another theme", () => {
  const from = themes.temp_A;
  const to = themes.temp_D;
  const doc = withPage(from, "page.offer", createPage(from, "landing"));
  doc.templates["page.offer"].sections.hero.settings.not_in_d = "x";
  doc.templates["page.faq"] = createPage(from, "faq");
  const carried = carryPages(doc, to);
  assert.deepEqual(Object.keys(carried).sort(), ["page.faq", "page.offer"]);
  const target = { ...structuredClone(to.preset) };
  target.templates = { ...target.templates, ...carried };
  assert.deepEqual(validateDocument(target, to).errors, []);
  assert.equal(carried["page.faq"].order.length, 1);
  assert.equal(carried["page.faq"].sections.faq.blockOrder.length, 3);
  assert.deepEqual(pageKeys(target).sort(), ["page.faq", "page.offer"]);
});

test("images on pages need a description too", () => {
  const theme = themes.temp_A;
  const page = createPage(theme, "about");
  page.sections.promise.settings = { image: "https://example.com/a.jpg" };
  const doc = withPage(theme, "page.about", page);
  assert.deepEqual(missingAltText(doc, theme), [
    { group: "page.about", section: "promise", name: "Image with text" },
  ]);
});
