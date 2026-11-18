// Header menu links as a tree: a "sub" link belongs to the main link before it and appears
// in its dropdown. A sub link with no main link before it is shown as a main link.
export function menuTree(blocks) {
  const tree = [];
  for (const block of blocks) {
    const parent = tree.at(-1);
    if (block.settings?.level === "sub" && parent) {
      parent.children.push(block);
    } else {
      tree.push({ ...block, children: [] });
    }
  }
  return tree;
}
