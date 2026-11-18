// Template keys beyond a theme's own ("home", "product"…): the store's pages ("page.about")
// and alternate product or category templates ("product.festive"). The part after the dot
// is a handle: lowercase letters and numbers with single hyphens.
export const PAGE_PREFIX = "page.";
export const ALTERNATE_TYPES = Object.freeze(["product", "category"]);
export const HANDLE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const HANDLE_MAX = 60;

function hasHandle(key, prefix) {
  if (!key.startsWith(prefix)) return false;
  const handle = key.slice(prefix.length);
  return handle.length <= HANDLE_MAX && HANDLE.test(handle);
}

export const isPageKey = (key) => hasHandle(key, PAGE_PREFIX);

export const isAlternateKey = (key) =>
  ALTERNATE_TYPES.some((type) => hasHandle(key, `${type}.`));

// "page.about" is a page, "product.festive" a product template; any other key names itself.
export function templateType(key) {
  const type = key.split(".")[0];
  return key.includes(".") &&
    (type === "page" || ALTERNATE_TYPES.includes(type))
    ? type
    : key;
}
