export const SCHEMA_VERSION = 1;

export const LIMITS = Object.freeze({
  sectionsPerTemplate: 25,
  blocksPerSection: 50,
  // Room for the store's own pages next to the theme's templates.
  documentBytes: 400 * 1024,
  pages: 25,
});
