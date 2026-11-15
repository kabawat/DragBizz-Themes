import assert from "node:assert/strict";
import test from "node:test";
import { resolveSections, themes, validateDocument } from "../src/index.js";

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
