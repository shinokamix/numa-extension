## Why

The options page currently couples route construction, navigation metadata, and the settings shell in one entrypoint-local layout while keeping its single-use sidebar dependency graph in Shared. Refactoring now establishes a locality-first FSD structure and a clean routing foundation before additional settings pages and behavior are added.

## What Changes

- Replace the current options layout with an inset settings shell based on the shadcn `sidebar-08` source, adapted for single-level settings navigation.
- Allow the desktop sidebar to collapse to an icon rail and use a mobile sheet, with an always-available trigger in a compact header and no breadcrumbs.
- Introduce a Settings layout Page slice and a separate General settings Page slice.
- Replace the manually assembled TanStack route tree with options-local file-based routing and hash history.
- Add `@tanstack/router-plugin` as a development dependency and integrate it with WXT's Vite configuration without using the shadcn CLI.
- Keep settings navigation metadata in the Settings Page model and render one active `General` destination plus the existing GitHub resource.
- Move the options-only sidebar implementation and support code out of Shared, prune unused sidebar capabilities, and remove other unused Shared UI and hook modules.
- Update architecture and design-system documentation to describe the WXT entrypoint composition root, Pages ownership, locality-first placement, and manually sourced shadcn code.

## Capabilities

### New Capabilities

- `options-settings-navigation`: Responsive options settings shell, navigation behavior, and General route presentation.

### Modified Capabilities

None.

## Impact

- Affects the options entrypoint, TanStack Router setup, WXT Vite configuration, options tests, Pages structure, Shared UI/lib contents, and architecture/design documentation.
- Adds the `@tanstack/router-plugin` development dependency and a generated route tree managed by that plugin.
- Does not change extension permissions, host permissions, external services, authentication, or build targets.
