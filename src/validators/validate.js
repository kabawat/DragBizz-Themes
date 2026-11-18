import { checkAlternates } from "../alternates.js";
import { LIMITS, SCHEMA_VERSION } from "../constants/document.js";
import { isAlternateKey } from "../keys.js";
import { isPageKey, PAGE_FIELDS, pageKeys, templateType } from "../pages.js";
import { checkSetting } from "./settings.js";

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

function checkSettings(defs, values, path, errors) {
  if (!isObject(values)) {
    errors.push({ path, message: "must be an object" });
    return;
  }
  const byId = new Map(defs.map((def) => [def.id, def]));
  for (const [id, value] of Object.entries(values)) {
    const def = byId.get(id);
    const message = def ? checkSetting(def, value) : "is not a known setting";
    if (message) errors.push({ path: `${path}.${id}`, message });
  }
}

// order and the keyed map must describe exactly the same ids.
function checkOrder(order, items, path, errors) {
  if (!Array.isArray(order) || !isObject(items)) {
    errors.push({
      path,
      message: "needs an order array and an object of items",
    });
    return false;
  }
  const ids = Object.keys(items);
  if (
    new Set(order).size !== order.length ||
    order.length !== ids.length ||
    !order.every((id) => id in items)
  ) {
    errors.push({ path, message: "order must list every item exactly once" });
    return false;
  }
  return true;
}

function checkBlocks(schema, section, path, errors) {
  const blocks = section.blocks ?? {};
  const order = section.blockOrder ?? [];
  if (!checkOrder(order, blocks, `${path}.blocks`, errors)) return;

  const max = Math.min(schema.maxBlocks ?? 0, LIMITS.blocksPerSection);
  if (order.length > max) {
    errors.push({
      path: `${path}.blocks`,
      message: `allows at most ${max} blocks`,
    });
  }
  const counts = {};
  for (const id of order) {
    const block = blocks[id];
    const blockSchema = schema.blocks?.[block?.type];
    if (!blockSchema) {
      errors.push({
        path: `${path}.blocks.${id}.type`,
        message: "is not a block type of this section",
      });
      continue;
    }
    counts[block.type] = (counts[block.type] ?? 0) + 1;
    if (blockSchema.limit && counts[block.type] > blockSchema.limit) {
      errors.push({
        path: `${path}.blocks.${id}`,
        message: `${block.type} allows at most ${blockSchema.limit}`,
      });
    }
    checkSettings(
      blockSchema.settings,
      block.settings ?? {},
      `${path}.blocks.${id}.settings`,
      errors,
    );
  }
}

function checkGroup(theme, key, group, path, errors) {
  if (
    !isObject(group) ||
    !checkOrder(group.order, group.sections, path, errors)
  )
    return;
  if (group.order.length > LIMITS.sectionsPerTemplate) {
    errors.push({
      path,
      message: `allows at most ${LIMITS.sectionsPerTemplate} sections`,
    });
  }
  for (const id of group.order) {
    const section = group.sections[id];
    const sectionPath = `${path}.sections.${id}`;
    const schema = theme.sections[section?.type];
    if (!schema) {
      errors.push({
        path: `${sectionPath}.type`,
        message: "is not a section of this theme",
      });
      continue;
    }
    if (!schema.templates.includes(templateType(key))) {
      errors.push({
        path: `${sectionPath}.type`,
        message: `cannot be used in ${key}`,
      });
      continue;
    }
    if (
      section.disabled !== undefined &&
      typeof section.disabled !== "boolean"
    ) {
      errors.push({
        path: `${sectionPath}.disabled`,
        message: "must be true or false",
      });
    }
    checkSettings(
      schema.settings,
      section.settings ?? {},
      `${sectionPath}.settings`,
      errors,
    );
    checkBlocks(schema, section, sectionPath, errors);
  }
}

// One section on its own (a saved pattern), checked against its theme without a placement.
export function validateSection(theme, section, path = "") {
  const errors = [];
  const schema = theme.sections[section?.type];
  if (!isObject(section) || !schema) {
    return [
      { path: `${path}.type`, message: "is not a section of this theme" },
    ];
  }
  if (section.disabled !== undefined && typeof section.disabled !== "boolean") {
    errors.push({ path: `${path}.disabled`, message: "must be true or false" });
  }
  checkSettings(
    schema.settings,
    section.settings ?? {},
    `${path}.settings`,
    errors,
  );
  checkBlocks(schema, section, path, errors);
  return errors;
}

// A page's title is required; its search-engine texts may be empty.
function checkPageFields(page, path, errors) {
  if (!isObject(page)) return;
  for (const [id, max] of Object.entries(PAGE_FIELDS)) {
    const value = page[id];
    const required = id === "title";
    if (
      (value === undefined && !required) ||
      (typeof value === "string" &&
        value.length <= max &&
        (!required || value.trim()))
    )
      continue;
    errors.push({
      path: `${path}.${id}`,
      message: required
        ? `must be text of 1 to ${max} characters`
        : `must be text up to ${max} characters`,
    });
  }
}

function checkKeyed(theme, allowed, value, path, errors, pages = false) {
  if (!isObject(value)) {
    errors.push({ path, message: "must be an object" });
    return;
  }
  for (const [key, group] of Object.entries(value)) {
    if (pages && isPageKey(key)) {
      checkPageFields(group, `${path}.${key}`, errors);
      checkGroup(theme, key, group, `${path}.${key}`, errors);
    } else if (pages && isAlternateKey(key)) {
      // Title and assignment are checked with the other alternates (checkAlternates).
      checkGroup(theme, key, group, `${path}.${key}`, errors);
    } else if (allowed.includes(key))
      checkGroup(theme, key, group, `${path}.${key}`, errors);
    else
      errors.push({
        path: `${path}.${key}`,
        message: "is not supported by this theme",
      });
  }
}

export function validateDocument(document, theme) {
  const errors = [];
  if (!isObject(document))
    return {
      valid: false,
      errors: [{ path: "", message: "must be an object" }],
    };

  if (document.schemaVersion !== SCHEMA_VERSION) {
    errors.push({
      path: "schemaVersion",
      message: `must be ${SCHEMA_VERSION}`,
    });
  }
  if (document.theme !== theme.id) {
    errors.push({ path: "theme", message: `must be ${theme.id}` });
  }
  if (JSON.stringify(document).length > LIMITS.documentBytes) {
    errors.push({
      path: "",
      message: `must be smaller than ${LIMITS.documentBytes} bytes`,
    });
  }
  checkSettings(theme.settings, document.settings ?? {}, "settings", errors);
  checkKeyed(
    theme,
    theme.sectionGroups,
    document.sectionGroups,
    "sectionGroups",
    errors,
  );
  checkKeyed(
    theme,
    theme.templates,
    document.templates,
    "templates",
    errors,
    true,
  );
  if (isObject(document.templates)) errors.push(...checkAlternates(document));
  if (pageKeys(document).length > LIMITS.pages) {
    errors.push({
      path: "templates",
      message: `allows at most ${LIMITS.pages} pages`,
    });
  }

  return { valid: errors.length === 0, errors };
}
