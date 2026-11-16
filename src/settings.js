const SAFE_LINK = /^(\/|#|https?:\/\/|mailto:|tel:)/i;
const SAFE_IMAGE = /^https:\/\//i;
const HEX_COLOR = /^#[0-9a-f]{6}$/i;

const textCheck = (fallbackMax) => (value, def) =>
  typeof value === "string" && value.length <= (def.maxLength ?? fallbackMax)
    ? null
    : `must be text up to ${def.maxLength ?? fallbackMax} characters`;

const CHECKS = {
  text: textCheck(200),
  textarea: textCheck(1000),
  url: (value) =>
    typeof value === "string" &&
    value.length <= 500 &&
    (value === "" || SAFE_LINK.test(value))
      ? null
      : "must be a relative path, #anchor, http(s), mailto: or tel: link",
  image: (value) =>
    typeof value === "string" &&
    value.length <= 1000 &&
    (value === "" || SAFE_IMAGE.test(value))
      ? null
      : "must be an https image URL",
  // An empty colour keeps the store's own palette.
  color: (value) =>
    typeof value === "string" && (value === "" || HEX_COLOR.test(value))
      ? null
      : "must be a colour like #1d4ed8",
  // A category slug from the store's catalog; empty means none chosen.
  category: (value) =>
    typeof value === "string" && value.length <= 120
      ? null
      : "must be a category",
  // Product ids picked in the editor, in display order.
  products: (value, def) =>
    Array.isArray(value) &&
    value.length <= (def.max ?? 12) &&
    value.every((id) => typeof id === "string" && /^[a-f0-9]{24}$/i.test(id))
      ? null
      : `must be up to ${def.max ?? 12} products`,
  select: (value, def) =>
    def.options.includes(value)
      ? null
      : `must be one of: ${def.options.join(", ")}`,
  number: (value, def) =>
    Number.isFinite(value) && value >= def.min && value <= def.max
      ? null
      : `must be a number from ${def.min} to ${def.max}`,
  checkbox: (value) =>
    typeof value === "boolean" ? null : "must be true or false",
};

export const SETTING_TYPES = Object.freeze(Object.keys(CHECKS));

export function checkSetting(def, value) {
  return CHECKS[def.type](value, def);
}

export function withDefaults(defs, values = {}) {
  return Object.fromEntries(
    defs.map((def) => [def.id, values[def.id] ?? def.default]),
  );
}
