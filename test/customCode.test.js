import assert from "node:assert/strict";
import test from "node:test";
import {
  checkSetting,
  menuTree,
  THEME_SETTINGS,
  themes,
  validateDocument,
} from "../src/index.js";

const css = THEME_SETTINGS.find((def) => def.id === "custom_css");

test("custom CSS allows nestable rules and blocks ways out of the style element", () => {
  for (const ok of [
    "",
    "h1 { color: red; }",
    ".card > img { border-radius: 0 }",
    "@media (max-width: 600px) { .hero { display: none } }",
    "@supports (display: grid) { main { display: grid } }",
    "a { background: url(https://example.com/a.png) }",
  ]) {
    assert.equal(checkSetting(css, ok), null, ok);
  }
  for (const bad of [
    "</style><script>alert(1)</script>",
    "@import url(https://evil.example/x.css);",
    "@font-face { font-family: x }",
    "@keyframes spin { to { rotate: 1turn } }",
    "div { width: expression(alert(1)) }",
    "a { background: url(javascript:alert(1)) }",
    "h1 { color: red",
    "h1 } color: red {",
    "x".repeat(10001),
    42,
  ]) {
    assert.notEqual(checkSetting(css, bad), null, String(bad).slice(0, 40));
  }
});

test("an HTML embed is a valid page and home section with a bounded height", () => {
  const theme = themes.temp_A;
  const doc = structuredClone(theme.preset);
  doc.templates.home.order.push("map");
  doc.templates.home.sections.map = {
    type: "html-embed",
    settings: {
      html: "<iframe src='https://maps.example'></iframe>",
      height: 300,
    },
  };
  assert.deepEqual(validateDocument(doc, theme).errors, []);

  doc.templates.home.sections.map.settings.height = 5000;
  doc.templates.home.sections.map.settings.html = "x".repeat(20001);
  assert.deepEqual(
    validateDocument(doc, theme).errors.map((e) => e.path),
    [
      "templates.home.sections.map.settings.html",
      "templates.home.sections.map.settings.height",
    ],
  );
});

test("sub links go into the dropdown of the main link before them", () => {
  const link = (id, level) => ({ id, settings: { label: id, level } });
  const tree = menuTree([
    link("orphan", "sub"),
    link("phones", "main"),
    link("android", "sub"),
    link("ios", "sub"),
    link("deals"),
  ]);
  assert.deepEqual(
    tree.map((item) => [item.id, item.children.map((child) => child.id)]),
    [
      ["orphan", []],
      ["phones", ["android", "ios"]],
      ["deals", []],
    ],
  );
});

test("every theme's header accepts dropdown links", () => {
  for (const theme of Object.values(themes)) {
    const doc = structuredClone(theme.preset);
    const header = Object.values(doc.sectionGroups.header.sections)[0];
    const first = header.blockOrder?.[0];
    if (!first) continue;
    header.blocks[first].settings = {
      ...header.blocks[first].settings,
      level: "sub",
    };
    assert.deepEqual(validateDocument(doc, theme).errors, [], theme.id);
  }
});
