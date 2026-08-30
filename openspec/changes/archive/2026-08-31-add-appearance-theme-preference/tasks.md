## 1. Preference Model and Storage

- [x] 1.1 Add the WXT `storage` manifest permission and create the `entities/preferences` slice with a typed local appearance-theme item, System fallback, runtime normalization, and a focused public API; verify TypeScript accepts the storage integration
- [x] 1.2 Implement effective-theme resolution and document-root application for System, Light, and Dark, including native `color-scheme`
- [x] 1.3 Implement initial theme loading plus a focused React state/effect provider using the shared ReactUse media-query hook, storage subscriptions as the single source of state updates, cleanup, and failed-write behavior

## 2. Runtime Integration

- [x] 2.1 Initialize and apply the appearance theme before mounting React content in the options entrypoint, then compose its router under the provider; verify an options development build starts successfully with System as the missing-value fallback
- [x] 2.2 Initialize and apply the appearance theme before mounting React content in the popup entrypoint, then compose its App under the provider; verify the popup development build shares the same explicit and System theme behavior

## 3. General Settings UI

- [x] 3.1 Review the current shadcn Select documentation and source, manually add only the required page-owned primitive with pinned provenance and Numa adaptations, and verify formatting, accessibility, and existing dependency compatibility
- [x] 3.2 Replace the General settings placeholder with a minimal Appearance section containing a labeled, keyboard-operable Theme select with System, Light, and Dark options wired to the Preferences Entity; verify the selected value remains visible, persists after reopening, and does not claim a failed save succeeded

## 4. Integrated Verification

- [x] 4.1 Verify options and popup update across active contexts, System follows live operating-system changes, and explicit themes ignore them using the WXT development build
- [x] 4.2 Run `pnpm check` and `pnpm build`, fix any source, architecture, test, or production packaging failures, and confirm the generated manifest contains only the newly approved `storage` permission
