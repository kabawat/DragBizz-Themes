import assert from "node:assert/strict";
import test from "node:test";
import {
  checkPublicThemeResponse,
  effectiveColors,
  missingAltText,
  resolveSections,
  themes,
  validateDocument,
  withPresetTemplates,
} from "../src/index.js";

const clone = (value) => structuredClone(value);
const paths = (result) => result.errors.map((error) => error.path);

for (const theme of Object.values(themes)) {
  test(`${theme.id} preset is a valid document`, () => {
    assert.deepEqual(validateDocument(theme.preset, theme), {
      valid: true,
      errors: [],
    });
  });

  test(`${theme.id} schemas use known settings with valid defaults`, () => {
    for (const section of Object.values(theme.sections)) {
      const empty = { order: ["s"], sections: { s: { type: section.type } } };
      const key = section.templates[0];
      const doc = clone(theme.preset);
      (theme.sectionGroups.includes(key) ? doc.sectionGroups : doc.templates)[
        key
      ] = empty;
      assert.equal(validateDocument(doc, theme).valid, true, section.type);
    }
  });
}

const theme = themes.temp_A;

test("rejects unknown sections, settings and unsafe links", () => {
  const doc = clone(theme.preset);
  const home = doc.templates.home;
  home.sections.hero.settings.heading = 42;
  home.sections.hero.settings.colour = "red";
  home.sections.hero.blocks["button-1"].settings.link = "javascript:alert(1)";
  home.sections.extra = { type: "slideshow" };
  home.order.push("extra");

  assert.deepEqual(paths(validateDocument(doc, theme)).sort(), [
    "templates.home.sections.extra.type",
    "templates.home.sections.hero.blocks.button-1.settings.link",
    "templates.home.sections.hero.settings.colour",
    "templates.home.sections.hero.settings.heading",
  ]);
});

test("rejects block limits and wrong placement", () => {
  const doc = clone(theme.preset);
  const hero = doc.templates.home.sections.hero;
  hero.blocks["button-3"] = { type: "button", settings: {} };
  hero.blockOrder.push("button-3");
  doc.sectionGroups.footer.sections.footer.type = "hero";

  assert.deepEqual(paths(validateDocument(doc, theme)).sort(), [
    "sectionGroups.footer.sections.footer.type",
    "templates.home.sections.hero.blocks.button-3",
  ]);
});

test("rejects an order that does not match the sections", () => {
  const doc = clone(theme.preset);
  doc.templates.home.order.pop();
  doc.sectionGroups.header.order.push("header");

  assert.deepEqual(paths(validateDocument(doc, theme)).sort(), [
    "sectionGroups.header",
    "templates.home",
  ]);
});

test("resolveSections fills defaults and skips disabled sections", () => {
  const doc = clone(theme.preset);
  doc.templates.home.sections.pledge.disabled = true;
  doc.templates.home.sections.hero.settings.heading = "Fresh groceries";

  const sections = resolveSections(theme, doc.templates.home);
  assert.deepEqual(
    sections.map((section) => section.id),
    ["hero", "categories", "featured", "catalog"],
  );
  assert.equal(sections[0].settings.heading, "Fresh groceries");
  assert.equal(sections[0].settings.badge, "Next-Gen 5G Smartphone Festival");
  assert.deepEqual(sections[0].blocks[0], {
    id: "button-1",
    type: "button",
    settings: {
      label: "Explore 5G Phones",
      link: "/#catalog",
      style: "primary",
    },
  });
});

test("checks theme-wide colours and fonts", () => {
  const doc = clone(theme.preset);
  doc.settings = { color_primary: "#0f766e", color_text: "", font: "poppins" };
  assert.equal(validateDocument(doc, theme).valid, true);

  doc.settings = { color_primary: "teal", font: "comic-sans" };
  assert.deepEqual(paths(validateDocument(doc, theme)).sort(), [
    "settings.color_primary",
    "settings.font",
  ]);
});

test("documents saved before page templates get them from the preset", () => {
  const doc = clone(theme.preset);
  delete doc.templates.category;
  delete doc.templates.product;

  const upgraded = withPresetTemplates(doc, theme);
  assert.deepEqual(
    upgraded.templates.category,
    theme.preset.templates.category,
  );
  assert.deepEqual(upgraded.templates.product, theme.preset.templates.product);
  assert.equal(upgraded.templates.home, doc.templates.home);
  assert.equal(validateDocument(upgraded, theme).valid, true);
  assert.equal(withPresetTemplates(upgraded, theme), upgraded);
});

test("finds images without a description, skipping hidden sections", () => {
  const fashion = themes.temp_D;
  const doc = clone(fashion.preset);
  assert.deepEqual(missingAltText(doc, fashion), []);

  doc.templates.home.sections.hero.settings = { image_alt: " " };
  assert.deepEqual(missingAltText(doc, fashion), [
    { group: "home", section: "hero", name: "Hero banner" },
  ]);

  doc.templates.home.sections.hero.disabled = true;
  assert.deepEqual(missingAltText(doc, fashion), []);
});

test("every theme names its industry for the library filter", () => {
  for (const theme of Object.values(themes)) {
    assert.equal(typeof theme.industry, "string", theme.id);
    assert.ok(theme.industry.length > 0, theme.id);
  }
});

test("featured products can show a category or picked products", () => {
  const doc = clone(theme.preset);
  doc.templates.home.sections.featured.settings = {
    source: "picked",
    products: ["6ad4b6206f4697221df5f87f", "6ad4b6206f4697221df5f87c"],
    category: "dairy-bakery",
  };
  assert.equal(validateDocument(doc, theme).valid, true);

  doc.templates.home.sections.featured.settings = {
    products: ["x"],
    source: "all",
  };
  assert.deepEqual(paths(validateDocument(doc, theme)).sort(), [
    "templates.home.sections.featured.settings.products",
    "templates.home.sections.featured.settings.source",
  ]);
});

test("sections can switch to a colour scheme", () => {
  const doc = clone(theme.preset);
  doc.templates.home.sections.hero.settings = { color_scheme: "dark" };
  doc.settings = { scheme_dark_background: "#111111" };
  assert.equal(validateDocument(doc, theme).valid, true);
  doc.templates.home.sections.hero.settings = { color_scheme: "neon" };
  assert.equal(validateDocument(doc, theme).valid, false);
});

test("effective colours fall back to the store palette", () => {
  const colors = effectiveColors("emerald-green", { color_text: "#111111" });
  assert.equal(colors.color_text, "#111111");
  assert.equal(colors.color_primary, "#047857");
  assert.equal(effectiveColors("unknown").color_primary, "#1d4ed8");
});

test("public theme responses follow the shared contract", () => {
  assert.deepEqual(
    checkPublicThemeResponse({
      data: { document: theme.preset, preview: null },
    }),
    [],
  );
  assert.deepEqual(
    checkPublicThemeResponse({
      data: { document: theme.preset, preview: { name: "Mine" } },
    }),
    [],
  );
  assert.deepEqual(checkPublicThemeResponse({ data: { document: null } }), [
    "preview must be null or { name }",
    "document.theme must name a known theme",
  ]);
});
