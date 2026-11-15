// Builds { blocks, blockOrder } from [type, settings] pairs with stable ids such as "button-1".
export function withBlocks(entries) {
  const counts = {};
  const blocks = {};
  const blockOrder = entries.map(([type, settings]) => {
    counts[type] = (counts[type] ?? 0) + 1;
    const id = `${type}-${counts[type]}`;
    blocks[id] = { type, settings };
    return id;
  });
  return { blocks, blockOrder };
}
