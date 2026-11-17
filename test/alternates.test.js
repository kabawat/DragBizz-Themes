import assert from "node:assert/strict";
import test from "node:test";
import {
  ALTERNATE_LIMITS,
  alternateKeys,
  carryPages,
  createAlternate,
  isAlternateKey,
  missingAltText,
  templateFor,
  templateType,
  themes,
  validateDocument,
} from "../src/index.js";

const theme = themes.temp_A;
const id1 = "6ad4b6206f4697221df5f87f";
const id2 = "6ad4b6206f4697221df5f880";
const paths = (doc, t = theme) =>
  validateDocument(doc, t).errors.map((error) => error.path);

function withAlternate(key, assign, doc = structuredClone(theme.preset)) {
  const type = templateType(key);
  doc.templates[key] = {
    ...createAlternate(doc, type, "Festive"),
    assign: { products: [], categories: [], ...assign },
  };
  return doc;
}

test("alternate keys name a product or category template", () => {
  assert.equal(isAlternateKey("product.festive"), true);
  assert.equal(isAlternateKey("category.sale-2026"), true);
  assert.equal(isAlternateKey("search.x"), false);
  assert.equal(isAlternateKey("product.Bad"), false);
  assert.equal(templateType("product.festive"), "product");
  assert.equal(templateType("category.sale"), "category");
  assert.equal(templateType("product"), "product");
});

for (const each of Object.values(themes)) {
  test(`${each.id}: a new alternate copies the main template and is valid`, () => {
    const doc = withAlternate(
      "product.festive",
      { products: [id1], categories: ["dairy"] },
      structuredClone(each.preset),
    );
    doc.templates["category.sale"] = createAlternate(doc, "category", "Sale");
    assert.deepEqual(validateDocument(doc, each).errors, []);
    assert.deepEqual(
      doc.templates["product.festive"].order,
      each.preset.templates.product.order,
    );
  });
}

test("rejects bad titles, ids, product assignments on category templates and doubles", () => {
  assert.deepEqual(
    paths(withAlternate("product.festive", { products: ["nope"] })),
    ["templates.product.festive.assign.products"],
  );
  assert.deepEqual(paths(withAlternate("category.sale", { products: [id1] })), [
    "templates.category.sale.assign.products",
  ]);
  const untitled = withAlternate("product.festive", {});
  untitled.templates["product.festive"].title = "";
  assert.deepEqual(paths(untitled), ["templates.product.festive.title"]);

  const twice = withAlternate("product.festive", { products: [id1] });
  withAlternate("product.diwali", { products: [id1, id2] }, twice);
  assert.deepEqual(paths(twice), ["templates.product.diwali.assign.products"]);

  const slugTwice = withAlternate("category.a", { categories: ["dairy"] });
  withAlternate("category.b", { categories: ["dairy"] }, slugTwice);
  assert.deepEqual(paths(slugTwice), [
    "templates.category.b.assign.categories",
  ]);
});

test(`allows at most ${ALTERNATE_LIMITS.perType} alternates per type`, () => {
  const doc = structuredClone(theme.preset);
  for (let i = 0; i <= ALTERNATE_LIMITS.perType; i += 1) {
    withAlternate(`product.p${i}`, {}, doc);
  }
  assert.deepEqual(paths(doc), ["templates"]);
  assert.equal(
    alternateKeys(doc, "product").length,
    ALTERNATE_LIMITS.perType + 1,
  );
  assert.deepEqual(alternateKeys(doc, "category"), []);
});

test("alternate templates only take sections of their kind", () => {
  const doc = withAlternate("product.festive", {});
  doc.templates["product.festive"].order.push("faq");
  doc.templates["product.festive"].sections.faq = { type: "faq" };
  assert.deepEqual(paths(doc), ["templates.product.festive.sections.faq.type"]);
});

test("a product uses the template it or its category is assigned to", () => {
  const doc = withAlternate("product.festive", { categories: ["dairy"] });
  withAlternate("product.gift", { products: [id1] }, doc);
  withAlternate("category.sale", { categories: ["dairy"] }, doc);

  assert.equal(templateFor(doc, "product", { productId: id1 }), "product.gift");
  assert.equal(
    templateFor(doc, "product", { productId: id1, categorySlugs: ["dairy"] }),
    "product.gift",
  );
  assert.equal(
    templateFor(doc, "product", { productId: id2, categorySlugs: ["dairy"] }),
    "product.festive",
  );
  assert.equal(templateFor(doc, "product", { productId: id2 }), "product");
  assert.equal(
    templateFor(doc, "category", { categorySlugs: ["dairy"] }),
    "category.sale",
  );
  assert.equal(
    templateFor(doc, "category", { categorySlugs: ["x"] }),
    "category",
  );
});

test("alternates follow the store to another theme with their assignment", () => {
  const doc = withAlternate("product.festive", { products: [id1] });
  const carried = carryPages(doc, themes.temp_C);
  const target = structuredClone(themes.temp_C.preset);
  target.templates = { ...target.templates, ...carried };
  assert.deepEqual(validateDocument(target, themes.temp_C).errors, []);
  assert.deepEqual(target.templates["product.festive"].assign.products, [id1]);
});

test("missing image descriptions are found on alternates too", () => {
  const doc = structuredClone(theme.preset);
  doc.templates["product.festive"] = {
    title: "Festive",
    assign: { products: [], categories: [] },
    order: ["promo"],
    sections: {
      promo: {
        type: "hero",
        settings: { image: "https://example.com/a.jpg", image_alt: "" },
      },
    },
  };
  // A hero is not allowed on product pages, so this checks the alt scan, not validity.
  assert.deepEqual(
    missingAltText(doc, theme).map((item) => item.group),
    ["product.festive"],
  );
});
