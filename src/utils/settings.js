export function withDefaults(defs, values = {}) {
  return Object.fromEntries(
    defs.map((def) => [def.id, values[def.id] ?? def.default]),
  );
}
