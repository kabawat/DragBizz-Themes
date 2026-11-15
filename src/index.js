import tempA from "./themes/temp_A/index.js";

export { LIMITS, SCHEMA_VERSION } from "./document.js";
export { resolveSections } from "./resolve.js";
export { checkSetting, SETTING_TYPES, withDefaults } from "./settings.js";
export { validateDocument } from "./validate.js";

export const themes = Object.freeze({ [tempA.id]: tempA });

export function getTheme(id) {
  return themes[id] ?? null;
}
