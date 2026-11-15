# DragBizz Themes

`@kabawat/storefront-themes`: storefront theme documents for DragBizz. It holds the theme document format, section schemas, system theme presets and `validateDocument`. It has no React code, so the Catalog storefront, the Store editor and Core validation all share the same definitions.

## Use

```js
import { getTheme, resolveSections, validateDocument } from "@kabawat/storefront-themes";

const theme = getTheme("temp_A");
const { valid, errors } = validateDocument(theme.preset, theme);
const sections = resolveSections(theme, theme.preset.templates.home);
```

## Develop

```bash
npm test
npm run lint
```

## Publish

The package is published publicly to npm by `.github/workflows/publish-npm.yml`, like `@kabawat/tax-engine`. Bump `version` in `package.json` and merge to `main`; the workflow skips versions that are already on npm, runs the tests and lint, and publishes with the repository's `NPM_TOKEN` secret. Installing needs no token.
