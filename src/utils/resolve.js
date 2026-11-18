import { withDefaults } from "./settings.js";

// Returns the enabled sections of a template or section group with every setting filled in.
export function resolveSections(theme, group) {
  return (group?.order ?? [])
    .map((id) => ({ id, ...group.sections[id] }))
    .filter((section) => !section.disabled)
    .map(({ id, type, settings, blocks = {}, blockOrder = [] }) => {
      const schema = theme.sections[type];
      return {
        id,
        type,
        settings: withDefaults(schema.settings, settings),
        blocks: blockOrder.map((blockId) => {
          const block = blocks[blockId];
          return {
            id: blockId,
            type: block.type,
            settings: withDefaults(
              schema.blocks[block.type].settings,
              block.settings,
            ),
          };
        }),
      };
    });
}
