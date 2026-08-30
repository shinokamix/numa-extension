# Numa Architecture

Numa uses Feature-Sliced Design (FSD) within WXT's browser-extension structure. WXT runtime entrypoints are the App-level composition roots; there is no parallel `src/app` layer.

## Runtime boundaries

The current UI runtimes are the options page mounted by `src/entrypoints/options/main.tsx` and the popup mounted by `src/entrypoints/popup/main.tsx`. They own application composition only; product behavior, persistence, messaging, and provider integrations have not been implemented yet. The popup contains one action that opens the browser-managed options page.

## Current structure

```text
src/
├── entrypoints/
│   ├── options/
│   │   ├── router/ # Options-only route and section composition
│   │   └── ui/     # Options-only settings layout
│   └── popup/
│       ├── api/    # Popup-specific browser API adapters
│       └── ui/     # Popup root component
└── shared/         # Business-agnostic libraries, styles, and UI
```

Only create an FSD layer or slice when it has a current responsibility. The project intentionally has no empty Pages, Widgets, Features, or Entities layers.

## Dependency direction

The options entrypoint may import its local runtime modules and focused public APIs from Shared. Shared must remain independent of entrypoints and product-specific behavior.

Shared exposes focused module APIs such as `src/shared/ui/Button/index.ts` and `src/shared/lib/cn/index.ts`; it has no global layer barrel. Internal module files use relative imports and do not import back through their own barrel.

## Ownership

### Options entrypoint

- `src/entrypoints/options/main.tsx` mounts the router and loads global styles.
- `src/entrypoints/options/router/optionsRouter.tsx` creates the route tree.
- `src/entrypoints/options/router/settingsSections.ts` owns the visible section registry.
- `src/entrypoints/options/ui/OptionsLayout.tsx` owns the settings navigation shell and router outlet.

The current default route intentionally contains no product settings implementation.

### Popup entrypoint

- `src/entrypoints/popup/main.tsx` mounts the popup and loads global styles.
- `src/entrypoints/popup/ui/App.tsx` renders the popup root with one settings button.
- `src/entrypoints/popup/api/openOptionsPage.ts` adapts `browser.runtime.openOptionsPage()` for the UI.

### Shared

`src/shared` contains business-agnostic UI primitives, hooks, utilities, and global styles. UI entrypoints import global styles through `src/shared/styles/index.ts`. Shared UI and library modules expose local `index.ts` files and do not use global barrels.

## Architecture enforcement

Run `pnpm lint:arch` for FSD structure and public-API checks with Steiger. ESLint enforces import boundaries, browser-global restrictions, cycles, React, accessibility, and TypeScript quality. `pnpm check` runs formatting, ESLint, Steiger, TypeScript, and tests.
