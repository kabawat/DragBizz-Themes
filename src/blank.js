// A theme to build from scratch: the chosen design with no menu, footer links or demo text, and a
// home page holding only a welcome text. Category, search and product pages keep the design's
// layout, since a store needs them to sell.
// The design's demo wording that a new store should not show until it writes its own.
const DEMO_TEXT = ["announcement", "about", "note"];

export function blankDocument(theme) {
  const preset = structuredClone(theme.preset);
  for (const group of Object.values(preset.sectionGroups)) {
    for (const section of Object.values(group.sections)) {
      const known = theme.sections[section.type].settings.map((def) => def.id);
      section.settings = Object.fromEntries(
        DEMO_TEXT.filter((id) => known.includes(id)).map((id) => [id, ""]),
      );
      delete section.blocks;
      delete section.blockOrder;
    }
  }
  preset.templates.home = {
    order: ["welcome"],
    sections: {
      welcome: {
        type: "rich-text",
        settings: {
          heading: "Welcome to our store",
          text: "This page is yours to build. Add sections from the editor: banners, products, categories, text and more.",
          align: "center",
        },
      },
    },
  };
  return preset;
}
