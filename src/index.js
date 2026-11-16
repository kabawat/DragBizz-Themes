import tempA from "./themes/temp_A/index.js";
import tempB from "./themes/temp_B/index.js";
import tempC from "./themes/temp_C/index.js";
import tempD from "./themes/temp_D/index.js";
import tempE from "./themes/temp_E/index.js";
import tempF from "./themes/temp_F/index.js";

export { missingAltText } from "./accessibility.js";
export { LIMITS, SCHEMA_VERSION } from "./document.js";
export { resolveSections } from "./resolve.js";
export { checkSetting, SETTING_TYPES, withDefaults } from "./settings.js";
export { THEME_SETTINGS } from "./themeSettings.js";
export { PAGE_TEMPLATES, withPresetTemplates } from "./themes/pages.js";
export { validateDocument } from "./validate.js";

export const themes = Object.freeze({
  [tempA.id]: tempA,
  [tempB.id]: tempB,
  [tempC.id]: tempC,
  [tempD.id]: tempD,
  [tempE.id]: tempE,
  [tempF.id]: tempF,
});

export function getTheme(id) {
  return themes[id] ?? null;
}
