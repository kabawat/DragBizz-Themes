import assert from "node:assert/strict";
import test from "node:test";
import {
  blankDocument,
  createPage,
  PATTERN_LIMITS,
  patternSections,
  themes,
  validateDocument,
  validatePattern,
} from "../src/index.js";

const paths = (errors) => errors.map((error) => error.path);

for (const theme of Object.values(themes)) {
  test(`${theme.id}: a blank theme is a valid document with an empty menu`, () => {
    const doc = blankDocument(theme);
    assert.deepEqual(validateDocument(doc, theme).errors, []);
    assert.deepEqual(doc.templates.home.order, ["welcome"]);
    for (const group of Object.values(doc.sectionGroups)) {
      for (const section of Object.values(group.sections)) {
        assert.equal(section.blockOrder, undefined);
      }
    }
    assert.deepEqual(doc.templates.product, theme.preset.templates.product);
  });
}

test("a blank theme leaves the preset untouched", () => {
  const before = JSON.stringify(themes.temp_A.preset);
  blankDocument(themes.temp_A);
  assert.equal(JSON.stringify(themes.temp_A.preset), before);
});

const about = createPage(themes.temp_A, "about");
const pattern = (overrides = {}) => ({
  name: "Our story block",
  theme: "temp_A",
  sections: [about.sections.story, about.sections.promise],
  ...overrides,
});

test("accepts a pattern of valid page sections", () => {
  assert.deepEqual(validatePattern(pattern()), []);
  const hero = themes.temp_A.preset.templates.home.sections.hero;
  assert.deepEqual(validatePattern(pattern({ sections: [hero] })), []);
});

test("rejects bad names, unknown themes, layout sections and bad settings", () => {
  assert.deepEqual(paths(validatePattern(pattern({ name: " " }))), ["name"]);
  assert.deepEqual(paths(validatePattern(pattern({ theme: "nope" }))), [
    "theme",
  ]);
  assert.deepEqual(paths(validatePattern(pattern({ sections: [] }))), [
    "sections",
  ]);
  const many = Array.from(
    { length: PATTERN_LIMITS.sections + 1 },
    () => about.sections.story,
  );
  assert.deepEqual(paths(validatePattern(pattern({ sections: many }))), [
    "sections",
  ]);
  const header = themes.temp_A.preset.sectionGroups.header.sections.header;
  assert.deepEqual(paths(validatePattern(pattern({ sections: [header] }))), [
    "sections.0.type",
  ]);
  assert.deepEqual(
    paths(
      validatePattern(
        pattern({
          sections: [{ type: "rich-text", settings: { align: "diagonal" } }],
        }),
      ),
    ),
    ["sections.0.settings.align"],
  );
  assert.deepEqual(
    paths(validatePattern(pattern({ sections: [{ type: "nope" }] }))),
    ["sections.0.type"],
  );
});

test("inserting a pattern keeps what the target template and theme accept", () => {
  const hero = structuredClone(
    themes.temp_A.preset.templates.home.sections.hero,
  );
  hero.settings.not_in_theme = "x";
  const saved = pattern({ sections: [hero, about.sections.story] });

  const onHome = patternSections(saved, themes.temp_D, "home");
  assert.deepEqual(
    onHome.map((section) => section.type),
    ["hero", "rich-text"],
  );
  assert.equal("not_in_theme" in onHome[0].settings, false);

  const onCategory = patternSections(saved, themes.temp_D, "category");
  assert.deepEqual(onCategory, []);

  const onPage = patternSections(saved, themes.temp_D, "page.about");
  const doc = structuredClone(themes.temp_D.preset);
  doc.templates["page.about"] = {
    title: "About",
    order: onPage.map((_, i) => `s${i}`),
    sections: Object.fromEntries(onPage.map((s, i) => [`s${i}`, s])),
  };
  assert.deepEqual(validateDocument(doc, themes.temp_D).errors, []);
});
