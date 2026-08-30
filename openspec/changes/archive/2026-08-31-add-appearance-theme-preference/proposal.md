## Why

Numa currently exposes light and dark design tokens but has no user-selectable appearance theme or persistent preference model. Adding the first preference now establishes a focused architecture for durable application-wide settings while letting the options page, popup, and operating-system theme remain consistent.

## What Changes

- Add an Appearance section to General settings with System, Light, and Dark theme choices; System is the default.
- Persist the selected theme in extension-local browser storage and synchronize changes across active extension contexts.
- Apply the effective theme to both the options page and popup, including live operating-system theme changes while System is selected.
- Introduce a `preferences` Entity slice as the owner of durable user preferences, with the appearance theme as its first independently stored preference.
- Add the extension `storage` permission.

## Capabilities

### New Capabilities

- `appearance-theme-preference`: Theme selection, persistence, cross-context synchronization, and system-theme behavior.

### Modified Capabilities

None.

## Impact

- Affects the General settings page, options and popup composition roots, shared theme styles, and WXT manifest configuration.
- Introduces a new `entities/preferences` public API and a manually adapted shadcn Select primitive owned by the General settings page.
- Uses WXT's built-in storage API; no new package dependency is required.
- Adds the `storage` extension permission but no host permissions or external services.
