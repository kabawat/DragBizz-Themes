import { alternateKeys } from "../alternates.js";
import { pageKeys } from "../pages.js";

// Images shown without a description, so they can be fixed before publishing. An image setting
// "x" is described by "x_alt" when its section has one; hidden sections are skipped.
export function missingAltText(document, theme) {
  const missing = [];
  const groups = [
    ...theme.sectionGroups.map((key) => [key, document.sectionGroups?.[key]]),
    ...[
      ...theme.templates,
      ...pageKeys(document),
      ...alternateKeys(document),
    ].map((key) => [key, document.templates?.[key]]),
  ];
  for (const [key, group] of groups) {
    for (const id of group?.order ?? []) {
      const section = group.sections[id];
      if (section.disabled) continue;
      const settings = theme.sections[section.type]?.settings ?? [];
      for (const def of settings) {
        if (def.type !== "image") continue;
        const altDef = settings.find((d) => d.id === `${def.id}_alt`);
        const image = section.settings?.[def.id] ?? def.default;
        const alt = section.settings?.[altDef?.id] ?? altDef?.default;
        if (altDef && image && !alt?.trim()) {
          missing.push({
            group: key,
            section: id,
            name: theme.sections[section.type].name,
          });
        }
      }
    }
  }
  return missing;
}
