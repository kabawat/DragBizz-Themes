import assert from "node:assert/strict";
import test from "node:test";
import {
  AI_LIMITS,
  aiRegistry,
  assembleAiTheme,
  pageKeys,
  themes,
  validateDocument,
} from "../src/index.js";

const plan = (overrides = {}) => ({
  theme: "temp_B",
  settings: {
    color_primary: "#0f766e",
    font: "poppins",
    button_shape: "pill",
    color_text: "red",
  },
  header: {
    settings: { announcement: "Free delivery above ₹499" },
    links: [
      { label: "Fruits", link: "/categories/fruits" },
      { label: "About", link: "/pages/about-us" },
      { label: "Evil", link: "javascript:alert(1)" },
      { label: "Elsewhere", link: "https://evil.example" },
    ],
  },
  footer: {
    settings: { about: "Fresh groceries from local farms." },
    links: [{ label: "FAQ", link: "/pages/faq" }],
  },
  home: [
    {
      type: "hero",
      settings: {
        heading: "Fresh every morning",
        image: "https://evil.example/x.jpg",
        unknown: 1,
      },
      blocks: [
        {
          type: "button",
          settings: { label: "Shop now", link: "/categories/fruits" },
        },
        { type: "nope" },
      ],
    },
    {
      type: "rich-text",
      settings: {
        heading: "Our promise",
        text: "Picked today.",
        align: "diagonal",
      },
    },
    { type: "html-embed", settings: { html: "<script>x</script>" } },
    { type: "product-details" },
    {
      type: "featured-products",
      settings: { heading: "Bestsellers", limit: 8 },
    },
  ],
  pages: [
    {
      title: "About us",
      sections: [
        {
          type: "rich-text",
          settings: { heading: "Our story", text: "Since 1999." },
        },
      ],
    },
    {
      title: "About us",
      sections: [
        {
          type: "faq",
          blocks: [
            {
              type: "question",
              settings: { question: "Delivery?", answer: "Same day." },
            },
          ],
        },
      ],
    },
    { title: "Empty", sections: [{ type: "hero-nope" }] },
  ],
  ...overrides,
});

test("the registry lists every theme with the sections and settings a model may fill", () => {
  const registry = aiRegistry();
  assert.equal(registry.themes.length, Object.keys(themes).length);
  const b = registry.themes.find((t) => t.id === "temp_B");
  const types = b.home.map((s) => s.type);
  assert.ok(types.includes("hero") && types.includes("rich-text"));
  assert.ok(!types.includes("html-embed"));
  const hero = b.home.find((s) => s.type === "hero");
  assert.ok(
    hero.settings.every((s) => s.type !== "image" && s.id !== "visibility"),
  );
  assert.ok(
    registry.themeSettings.every((s) => ["color", "select"].includes(s.type)),
  );
  assert.ok(!registry.themeSettings.some((s) => s.id === "custom_css"));
});

for (const theme of Object.values(themes)) {
  test(`${theme.id}: an assembled plan is a valid document`, () => {
    const { document, error } = assembleAiTheme(plan({ theme: theme.id }));
    assert.equal(error, undefined);
    assert.deepEqual(validateDocument(document, theme).errors, []);
  });
}

test("keeps only valid values, safe links and allowed sections", () => {
  const { document } = assembleAiTheme(plan({ theme: "temp_A" }));
  assert.deepEqual(document.settings, {
    color_primary: "#0f766e",
    font: "poppins",
    button_shape: "pill",
  });
  const header = document.sectionGroups.header.sections.header;
  assert.deepEqual(
    header.blockOrder.map((id) => header.blocks[id].settings.link),
    ["/categories/fruits", "/pages/about-us"],
  );
  const home = document.templates.home;
  assert.deepEqual(
    home.order.map((id) => home.sections[id].type),
    ["hero", "rich-text", "featured-products"],
  );
  const hero = home.sections[home.order[0]];
  assert.equal(hero.settings.heading, "Fresh every morning");
  assert.equal("image" in hero.settings, false);
  assert.equal("unknown" in hero.settings, false);
  assert.equal(hero.blockOrder.length, 1);
  assert.equal("align" in home.sections[home.order[1]].settings, false);
  assert.deepEqual(pageKeys(document), ["page.about-us", "page.about-us-2"]);
});

test("rejects unknown themes and caps sections and pages", () => {
  assert.ok(assembleAiTheme({ theme: "nope" }).error);
  const many = Array.from({ length: 30 }, () => ({
    type: "rich-text",
    settings: { heading: "x" },
  }));
  const pages = Array.from({ length: 9 }, (_, i) => ({
    title: `Page ${i}`,
    sections: many,
  }));
  const { document } = assembleAiTheme(plan({ home: many, pages }));
  assert.equal(document.templates.home.order.length, AI_LIMITS.homeSections);
  assert.equal(pageKeys(document).length, AI_LIMITS.pages);
  assert.equal(
    document.templates["page.page-0"].order.length,
    AI_LIMITS.sectionsPerPage,
  );
});

test("a plan without home sections keeps the theme's own home page", () => {
  const { document } = assembleAiTheme(plan({ home: [] }));
  assert.deepEqual(
    document.templates.home,
    themes.temp_B.preset.templates.home,
  );
});

test("text values from a model get the setting's own type", () => {
  const { document, theme } = assembleAiTheme(
    plan({
      home: [
        { type: "featured-products", settings: { heading: "Top", limit: "6" } },
        {
          type: "contact-info",
          settings: { show_phone: "false", show_email: "maybe" },
        },
      ],
    }),
  );
  const home = document.templates.home;
  const [featured, contact] = home.order.map((id) => home.sections[id]);
  assert.equal(featured.settings.limit, 6);
  assert.equal(contact.settings.show_phone, false);
  assert.equal("show_email" in contact.settings, false);
  assert.deepEqual(validateDocument(document, theme).errors, []);
});
