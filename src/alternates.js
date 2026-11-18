import { ALTERNATE_TYPES, isAlternateKey } from "./keys.js";

// Alternate product and category templates ("product.festive"): another layout the merchant
// assigns to chosen products or categories. Everything else keeps the main template.
//   { title, assign: { products: [productId], categories: [categorySlug] }, order, sections }
// Product templates may be assigned to products and to categories (their products use it);
// category templates only to categories.
export const ALTERNATE_LIMITS = Object.freeze({
  title: 80,
  perType: 10,
  products: 200,
  categories: 50,
});

const PRODUCT_ID = /^[a-f0-9]{24}$/i;
const SLUG = /^[a-z0-9][a-z0-9-]{0,119}$/;

export const alternateKeys = (document, type) =>
  Object.keys(document?.templates ?? {}).filter(
    (key) => isAlternateKey(key) && (!type || key.startsWith(`${type}.`)),
  );

// A new alternate starts as a copy of the main template, so it looks the same until edited.
export function createAlternate(document, type, title) {
  const { order, sections } = structuredClone(document.templates[type]);
  return {
    title: title.slice(0, ALTERNATE_LIMITS.title),
    assign: { products: [], categories: [] },
    order,
    sections,
  };
}

function checkList(list, max, pattern, label) {
  return Array.isArray(list) &&
    list.length <= max &&
    new Set(list).size === list.length &&
    list.every((item) => typeof item === "string" && pattern.test(item))
    ? null
    : `must be up to ${max} different ${label}`;
}

// Title and assignment of each alternate, the per-type limit, and that a product or category
// is assigned to one alternate only.
export function checkAlternates(document) {
  const errors = [];
  for (const type of ALTERNATE_TYPES) {
    const keys = alternateKeys(document, type);
    if (keys.length > ALTERNATE_LIMITS.perType) {
      errors.push({
        path: "templates",
        message: `allows at most ${ALTERNATE_LIMITS.perType} ${type} templates`,
      });
    }
    const taken = { products: new Map(), categories: new Map() };
    for (const key of keys) {
      const path = `templates.${key}`;
      const { title, assign } = document.templates[key] ?? {};
      if (
        typeof title !== "string" ||
        !title.trim() ||
        title.length > ALTERNATE_LIMITS.title
      ) {
        errors.push({
          path: `${path}.title`,
          message: `must be text of 1 to ${ALTERNATE_LIMITS.title} characters`,
        });
      }
      if (assign === null || typeof assign !== "object") {
        errors.push({ path: `${path}.assign`, message: "must be an object" });
        continue;
      }
      const lists = {
        products:
          type === "product"
            ? checkList(
                assign.products ?? [],
                ALTERNATE_LIMITS.products,
                PRODUCT_ID,
                "products",
              )
            : (assign.products ?? []).length
              ? "only product templates can be assigned to products"
              : null,
        categories: checkList(
          assign.categories ?? [],
          ALTERNATE_LIMITS.categories,
          SLUG,
          "categories",
        ),
      };
      for (const [field, message] of Object.entries(lists)) {
        if (message) {
          errors.push({ path: `${path}.assign.${field}`, message });
          continue;
        }
        for (const item of assign[field] ?? []) {
          if (taken[field].has(item)) {
            errors.push({
              path: `${path}.assign.${field}`,
              message: `${item} already uses ${taken[field].get(item)}`,
            });
          } else taken[field].set(item, key);
        }
      }
    }
  }
  return errors;
}

// The template a product or category page uses: an alternate the product (by id) or one of
// its categories is assigned to, else the main template.
export function templateFor(
  document,
  type,
  { productId, categorySlugs = [] } = {},
) {
  const keys = alternateKeys(document, type);
  const assigned = (key, field, value) =>
    document.templates[key].assign?.[field]?.includes(value);
  if (productId) {
    const byProduct = keys.find((key) => assigned(key, "products", productId));
    if (byProduct) return byProduct;
  }
  for (const slug of categorySlugs) {
    const byCategory = keys.find((key) => assigned(key, "categories", slug));
    if (byCategory) return byCategory;
  }
  return type;
}
