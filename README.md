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

The package is published to GitHub Packages by `.github/workflows/publish.yml`. Bump `version` in `package.json`, commit, then push a matching tag (`v0.1.0`). The workflow checks the tag, runs the tests and lint, and publishes with the repository's `GITHUB_TOKEN`.

Installing needs a token with `read:packages`, configured for the `@kabawat` scope with the registry `https://npm.pkg.github.com`.
