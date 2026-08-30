## 1. File-Based Routing Foundation

- [x] 1.1 Add `@tanstack/router-plugin` as a development dependency with pnpm and verify the lockfile resolves without unrelated dependency changes
- [x] 1.2 Configure the TanStack Router Vite plugin in `wxt.config.ts` with options-local route and generated-tree paths, no automatic code splitting, and verify route generation runs during a WXT build
- [x] 1.3 Add `__root.tsx` and `index.tsx` file routes plus the router factory using generated routes, injectable history, hash history in the browser, and TanStack type registration; verify a memory-history router loads `/`
- [x] 1.4 Update generated-file hygiene and repository ignores only as needed, commit the generated route tree, and verify a fresh typecheck can resolve all route types

## 2. Settings Page Architecture

- [x] 2.1 Create the `pages/settings` slice with focused public API, conventional `ui`, `model`, and `lib` segments, and verify Steiger recognizes a valid Page slice without cross-imports
- [x] 2.2 Create the separate `pages/general-settings` slice and connect the root and index route files to the two Page public APIs; verify neither Page slice imports the other
- [x] 2.3 Define the single-level General navigation metadata in the Settings model without React components or imports from the options router, and verify model tests cover its identifier, title, destination, and icon key

## 3. Responsive Settings Shell

- [x] 3.1 Manually adapt and prune the reviewed shadcn Sidebar source into flat private `pages/settings/ui` files, retaining inset layout, desktop icon collapse, mobile sheet, tooltips, accessible focus behavior, and Ctrl/Command+B while verifying toggle semantics in the WXT development build
- [x] 3.2 Implement Numa branding, the active General destination, collapsed tooltips, and the isolated GitHub footer resource in `SettingsSidebar`; verify rendered markup has current-page and safe external-link attributes with no nested navigation
- [x] 3.3 Implement `SettingsLayout` and its compact header with an always-available trigger, current General title, and outlet; verify the rendered layout has inset main semantics and no breadcrumbs
- [x] 3.4 Implement the intentional initial General page presentation and verify it renders through the Settings layout
- [x] 3.5 Validate expanded, collapsed icon-rail, and mobile-sheet behavior in `pnpm dev`, including usable tooltips, keyboard toggle, responsive transitions, and focus return

## 4. Locality and Cleanup

- [x] 4.1 Switch `main.tsx` to the generated router and remove the old `OptionsLayout`, manual route assembly, section registry, and superseded tests; verify repository search finds no stale imports or duplicate route sources
- [x] 4.2 Recheck all Shared usages, move only required Sidebar support into the Settings Page, replace the mobile helper with attributed ReactUse `useMediaQuery` source, and remove unreferenced UI/hooks and unused CLI configuration rather than preserving speculative inventory; verify Shared retains only modules with current independent consumers
- [x] 4.3 Update `docs/architecture.md`, `DESIGN.md`, README architecture text, and shadcn placement guidance to document entrypoint composition, Page ownership, locality-first promotion, and manual source installation; verify documentation matches the resulting tree

## 5. Verification

- [x] 5.1 Validate the specified Settings Page navigation and accessibility scenarios through static review and WXT development behavior
- [x] 5.2 Run formatting, ESLint, Steiger, and TypeScript checks and resolve failures without disabling architecture rules
- [x] 5.3 Run `pnpm build` and verify the production options bundle includes the generated hash router and no removed Shared modules
