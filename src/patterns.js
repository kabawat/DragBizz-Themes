import { getTheme } from "./themes/index.js";
import { fitSection, templateType } from "./pages.js";
import { validateSection } from "./validators/validate.js";

// A pattern is a few sections a merchant saved to reuse: { name, theme, sections: [section] }.
// `theme` is the theme they came from; inserting into another theme keeps what fits.
export const PATTERN_LIMITS = Object.freeze({
  name: 60,
  sections: 10,
  bytes: 64 * 1024,
  perCatalog: 50,
});

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

// Header and footer sections belong to the layout, not to a page, so they are not patterns.
export function isPatternSection(theme, type) {
  const schema = theme.sections[type];
  return Boolean(
    schema?.templates.some((key) => !theme.sectionGroups.includes(key)),
  );
}

export function validatePattern(pattern) {
  if (!isObject(pattern)) return [{ path: "", message: "must be an object" }];
  const errors = [];
  const { name, theme: themeId, sections } = pattern;
  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.length > PATTERN_LIMITS.name
  ) {
    errors.push({
      path: "name",
      message: `must be text of 1 to ${PATTERN_LIMITS.name} characters`,
    });
  }
  const theme = typeof themeId === "string" ? getTheme(themeId) : null;
  if (!theme) {
    errors.push({ path: "theme", message: "must name a known theme" });
    return errors;
  }
  if (
    !Array.isArray(sections) ||
    !sections.length ||
    sections.length > PATTERN_LIMITS.sections
  ) {
    errors.push({
      path: "sections",
      message: `must hold 1 to ${PATTERN_LIMITS.sections} sections`,
    });
    return errors;
  }
  if (JSON.stringify(sections).length > PATTERN_LIMITS.bytes) {
    errors.push({
      path: "sections",
      message: `must be smaller than ${PATTERN_LIMITS.bytes} bytes`,
    });
  }
  sections.forEach((section, index) => {
    if (isObject(section) && !isPatternSection(theme, section.type)) {
      errors.push({
        path: `sections.${index}.type`,
        message: "is a header or footer section",
      });
      return;
    }
    errors.push(...validateSection(theme, section, `sections.${index}`));
  });
  return errors;
}

// The pattern's sections that a template of `toTheme` accepts, made to fit that theme.
export function patternSections(pattern, toTheme, templateKey) {
  const type = templateType(templateKey);
  return pattern.sections
    .filter((section) =>
      toTheme.sections[section.type]?.templates.includes(type),
    )
    .map((section) => fitSection(toTheme.sections[section.type], section));
}
