# @kabawat/store-themes

Framework-agnostic storefront theme documents, section schemas, presets, palettes, and validation SDK for **DragBizz**.

- Node.js 18+
- ESM only
- Zero runtime dependencies

---

## Install

```bash
npm install @kabawat/store-themes
```

```bash
yarn add @kabawat/store-themes
```

```bash
pnpm add @kabawat/store-themes
```

---

## Features

| Area | Support |
|------|---------|
| System themes | `temp_A`, `temp_B`, `temp_C`, `temp_D`, `temp_E`, `temp_F` |
| Section groups | `header`, `footer` |
| Templates | `home`, `category`, `search`, `product` (`PAGE_TEMPLATES`) |
| Setting types | `text`, `textarea`, `url`, `image`, `color`, `category`, `products`, `select`, `number`, `checkbox` |
| Theme settings & palettes | `THEME_SETTINGS`, `PALETTES`, `COLOR_TOKENS`, `DEFAULT_PALETTE`, `effectiveColors` |
| Validation & contracts | `validateDocument`, `checkSetting`, `missingAltText`, `checkPublicThemeResponse` |
| Resolution & upgrades | `resolveSections`, `withDefaults`, `withPresetTemplates` |

---

## Quick start

```js
import {
  getTheme,
  resolveSections,
  validateDocument,
} from "@kabawat/store-themes";

const theme = getTheme("temp_A");

const { valid, errors } = validateDocument(theme.preset, theme);
console.log(valid, errors);

const homeSections = resolveSections(theme, theme.preset.templates.home);
console.log(homeSections);
```

---

## Package entry points

| Import | Purpose |
|--------|---------|
| `@kabawat/store-themes` | Main API (themes, schemas, palettes, validation, contracts, resolution) |
| `@kabawat/store-themes/thumbnails/*` | Theme preview thumbnails (`temp_A.jpg` – `temp_F.jpg`) |

---

## Themes

| ID | Name | Industry |
|----|------|----------|
| `temp_A` | Electronics & Gadgets | Electronics |
| `temp_B` | Grocery & Supermarket | Grocery |
| `temp_C` | Pharmacy & Healthcare | Health & Pharmacy |
| `temp_D` | Fashion & Handloom | Fashion |
| `temp_E` | Computers & Electronics | Electronics |
| `temp_F` | Stationery & Office | Stationery & Office |

Every theme supports `sectionGroups` (`["header", "footer"]`) and `templates` (`["home", "category", "search", "product"]`), and exposes `THEME_SETTINGS` for colours, typography, buttons, layout spacing, brand assets, and light/dark colour schemes.

### `temp_A` sections

| Section type | Allowed in | Blocks (`limit`) | Max blocks |
|--------------|------------|------------------|------------|
| `header` | `header` | `nav_link` (8) | `8` |
| `footer` | `footer` | `link` (8), `assurance` (8), `legal_link` (5) | `21` |
| `hero` | `home` | `button` (2), `stat` (3), `offer_row` (4) | `9` |
| `category-list` | `home`, `category`, `search`, `product` | — | `0` |
| `featured-products` | `home`, `category`, `search`, `product` | — | `0` |
| `catalog-explorer` | `home`, `category`, `search` | — | `0` |
| `trust-banner` | `home` | `badge` (6) | `6` |
| `category-heading` | `category` | — | `0` |
| `search-heading` | `search` | — | `0` |
| `product-details` | `product` | `point` (6) | `6` |

---

## Document Format & Limits

```js
import { LIMITS, SCHEMA_VERSION } from "@kabawat/store-themes";
```

| Constant | Value | Description |
|----------|-------|-------------|
| `SCHEMA_VERSION` | `1` | Required `document.schemaVersion` |
| `LIMITS.sectionsPerTemplate` | `25` | Max sections per template or section group |
| `LIMITS.blocksPerSection` | `50` | Hard cap on blocks per section |
| `LIMITS.documentBytes` | `204800` (200 KB) | Max serialized JSON document length |

### Document shape

```js
{
  schemaVersion: 1,
  theme: "temp_A",
  settings: {},
  sectionGroups: {
    header: {
      order: ["header"],
      sections: {
        header: {
          type: "header",
          settings: {},
          blocks: { "nav_link-1": { type: "nav_link", settings: { ... } } },
          blockOrder: ["nav_link-1"],
        },
      },
    },
    footer: { ... },
  },
  templates: {
    home: {
      order: ["hero", "categories", "featured", "catalog", "pledge"],
      sections: { ... },
    },
    category: { ... },
    search: { ... },
    product: { ... },
  },
}
```

---

## Settings, Palettes & Validation

### Setting types (`SETTING_TYPES`)

| Type | Validation rule |
|------|-----------------|
| `text` | String up to `def.maxLength ?? 200` characters |
| `textarea` | String up to `def.maxLength ?? 1000` characters |
| `url` | Empty string or relative `/`, `#anchor`, `http(s)://`, `mailto:`, `tel:` up to 500 characters |
| `image` | Empty string or `https://` URL up to 1000 characters |
| `color` | Empty string or 6-digit hex colour (`#rrggbb`) |
| `category` | Category slug string up to 120 characters |
| `products` | Array of up to `def.max ?? 12` 24-hex product IDs |
| `select` | Value included in `def.options` |
| `number` | Finite number between `def.min` and `def.max` |
| `checkbox` | Boolean (`true` or `false`) |

### Helpers

```js
import {
  checkPublicThemeResponse,
  checkSetting,
  effectiveColors,
  missingAltText,
  validateDocument,
  withDefaults,
  withPresetTemplates,
} from "@kabawat/store-themes";

// Validate a single setting value against its schema definition (returns null or error message)
const error = checkSetting(
  { id: "heading", type: "text", maxLength: 80, default: "Hello" },
  "Custom Heading",
);

// Fill missing setting values from schema defaults
const resolved = withDefaults(theme.sections.hero.settings, {
  heading: "Custom Heading",
});

// Resolve branding palette merged with theme colour overrides
const colors = effectiveColors("emerald-green", document.settings);

// Validate a full theme document
const result = validateDocument(document, theme);
// { valid: boolean, errors: Array<{ path: string, message: string }> }

// Upgrade older documents with missing page templates from the theme preset
const upgraded = withPresetTemplates(document, theme);

// Find enabled image settings missing alt text descriptions
const missing = missingAltText(document, theme);

// Validate the shared GET /public/theme response contract
const problems = checkPublicThemeResponse(apiResponse);
```

---

## Section Resolution (`resolveSections`)

Resolves an ordered template or section group by filtering out `disabled: true` sections and filling default values for all section and block settings:

```js
import { getTheme, resolveSections } from "@kabawat/store-themes";

const theme = getTheme("temp_A");
const sections = resolveSections(theme, theme.preset.templates.home);
```

### Result shape

```ts
Array<{
  id: string
  type: string
  settings: Record<string, unknown>
  blocks: Array<{
    id: string
    type: string
    settings: Record<string, unknown>
  }>
}>
```

---

## Main exports (reference)

```js
import {
  // Constants & Palettes
  LIMITS,
  SCHEMA_VERSION,
  SETTING_TYPES,
  PALETTES,
  DEFAULT_PALETTE,
  COLOR_TOKENS,
  THEME_SETTINGS,
  effectiveColors,

  // Themes & Pages
  themes,
  getTheme,
  PAGE_TEMPLATES,
  withPresetTemplates,

  // Resolution & defaults
  resolveSections,
  withDefaults,

  // Validators & Contracts
  checkSetting,
  validateDocument,
  missingAltText,
  checkPublicThemeResponse,
} from "@kabawat/store-themes";
```

---

## Scripts (repo)

```bash
npm test                 # node --test
npm run lint             # biome check
npm run build            # copy src -> dist + obfuscate
npm run verify           # test + build + pack dry-run
```

---

## Keywords

`dragbizz`, `store-themes`, `storefront`, `themes`, `templates`, `ecommerce`, `schema`, `javascript`

## License

MIT
