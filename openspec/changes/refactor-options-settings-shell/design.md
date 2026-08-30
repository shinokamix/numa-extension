## Context

See `proposal.md` for motivation. The options runtime currently creates a code-based TanStack Router tree in one file and renders an entrypoint-local `OptionsLayout` backed by a broad Shared shadcn Sidebar module. WXT entrypoints act as application composition roots, while Steiger validates standard FSD layers but does not interpret `entrypoints/options` as a literal `app` directory. The project uses hash history, React 19, Tailwind CSS 4, project-owned shadcn source, and strict public-API/import checks.

The official shadcn `sidebar-08` uses an inset sidebar with off-canvas collapse. The desired UI keeps its inset shell but deliberately switches desktop behavior to icon collapse, removes breadcrumbs and multi-level dashboard content, and retains mobile sheet behavior.

## Goals / Non-Goals

**Goals:**

- Keep application bootstrap and route generation in the options entrypoint composition root.
- Give route-level layout and content to focused Page slices using conventional `ui`, `model`, and `lib` segments only when each segment has a present responsibility.
- Keep the settings-specific sidebar implementation with its sole owning Page and reduce Shared to modules with real independent consumers.
- Use TanStack's file-route generator while preserving injectable memory history for route tests and hash history in the extension.
- Source and adapt shadcn code manually rather than invoking the registry CLI.

**Non-Goals:**

- Implement product settings, persistence, provider credentials, authentication, or browser storage.
- Add more settings destinations than General.
- Persist sidebar expansion across page reloads.
- Add breadcrumbs, nested navigation, account controls, project menus, or automatic route code splitting.
- Generalize the settings shell or sidebar for hypothetical reuse.

## Decisions

### 1. Treat the WXT options entrypoint as the application composition root

`src/entrypoints/options/main.tsx` remains a thin DOM mount. Its local `router` segment owns router creation and generated file routes. No parallel `src/app` layer will be introduced.

This preserves WXT's runtime boundary and the project's chosen FSD adaptation. A separate App layer was rejected because it would duplicate the role already performed by the entrypoint.

### 2. Model the shell and General content as separate Page slices

The structure will be:

```text
src/pages/
├── settings/
│   ├── index.ts
│   ├── ui/
│   │   ├── Separator.tsx
│   │   ├── SettingsHeader.tsx
│   │   ├── SettingsLayout.tsx
│   │   ├── SettingsSidebar.tsx
│   │   ├── Sheet.tsx
│   │   ├── Sidebar.tsx
│   │   └── Tooltip.tsx
│   ├── model/
│   │   └── navigation.ts
│   └── lib/
│       └── useMediaQuery.ts
└── general-settings/
    ├── index.ts
    └── ui/
        └── GeneralSettingsPage.tsx
```

`pages/settings` owns only the route-level shell, header, navigation metadata, and sidebar mechanics. `pages/general-settings` owns the General destination. The two Page slices never import one another; entrypoint route files compose both through their public APIs.

A Widget was rejected because the shell is itself the parent route-level Settings activity rather than a reusable page block. Storing every settings destination in `pages/settings` was also rejected because future routes should be independently owned when they gain behavior.

### 3. Use conventional FSD segments and colocate UI-specific state

Settings uses `ui` for React presentation, `model` for navigation metadata, and `lib` only for a self-contained media-query utility. Its private Sidebar and source-installed support files stay flat in `ui`; a nested module directory would not provide a useful boundary for this single-owner graph.

The sidebar context and `useSidebar` remain in `Sidebar.tsx` because they have no meaning outside that component. The manually copied ReactUse `useMediaQuery` source lives in the Page's `lib` segment because it is independent of Sidebar presentation; it moves to Shared only after a real unrelated consumer appears. Its source URL, license attribution, and adaptations are recorded in the file.

The Page public API exports `SettingsLayout` only. Route files import Page public APIs, while files within each slice use relative imports.

### 4. Use file-based TanStack routing inside the options entrypoint

Add `@tanstack/router-plugin` as a development dependency and register its Vite plugin through `wxt.config.ts`, with explicit options-local paths:

```text
routesDirectory: src/entrypoints/options/router/routes
generatedRouteTree: src/entrypoints/options/router/routeTree.gen.ts
```

The initial files are:

```text
routes/
├── __root.tsx   -> pages/settings SettingsLayout
└── index.tsx    -> pages/general-settings GeneralSettingsPage
```

`router.ts` creates a router from the generated tree. Production uses hash history; tests can supply memory history. The router is registered with TanStack's TypeScript module augmentation so links remain route-typed without lower layers importing the entrypoint.

The generated tree is committed so a fresh typecheck does not depend on running a dev server first, but it is treated as generated source and excluded from manual editing and formatting where necessary. Automatic code splitting is omitted because one small options route does not justify another transformation and WXT integration risk.

Multi-file code-based routing was considered, but file routing removes manual parent/child assembly and gives the intended scalable route convention. Route UI remains in Pages rather than being hidden in excluded folders under the router.

### 5. Adapt the official Sidebar source locally

The existing project-owned Sidebar and official current shadcn source provide the baseline. No shadcn CLI command will run. The Settings Page retains only the primitives needed for:

- provider/context and Ctrl/Command+B toggling;
- inset shell and desktop icon collapse;
- mobile accessible sheet;
- trigger, header, content, footer, groups, menu items, active state, and collapsed tooltips.

It removes unused input, skeleton, rail, badge, submenu, group-action, projects, user-menu, breadcrumb, and nested-navigation surfaces. A single local Separator primitive renders header and sidebar boundaries. The product composition contains Numa branding, one General item, and the GitHub resource. `Button` and `cn` remain Shared because they have independent consumers; local Sidebar support must not import through the Settings Page public API.

Copying the complete registry dependency graph was rejected because it would retain unused modules solely to satisfy unused exports. Reimplementing the interaction from scratch was rejected because the reviewed source already handles responsive positioning, focus management, accessibility, and collapse styling.

### 6. Reduce Shared based on current ownership

After imports are migrated, remove Shared modules with no remaining consumer. Expected removals include the current Sidebar support graph (`Sidebar`, `Sheet`, `Tooltip`, `Separator`, `Skeleton`, `Input`, and `useMediaQuery`) and currently unused foundations (`AlertDialog`, `Card`, `Dialog`, `Label`, and `useDisclosure`) when repository-wide usage confirms they are unreferenced.

Shared retains global semantic styles/tokens, `cn`, `Button`, and any module that still has an actual independent consumer. Sidebar color tokens remain global design tokens because the Tailwind theme and options shell consume them globally; locality does not require fragmenting the global theme.

Keeping an inventory of speculative shadcn primitives was rejected. Future features can manually source a component at its owning slice and promote it only after real reuse appears. CLI configuration files are omitted because shadcn and ReactUse source is copied and adapted manually with source and adaptation comments.

### 7. Preserve accessible navigation behavior

The compact header always exposes the trigger and current title, with no breadcrumb. Desktop collapse leaves an icon rail and tooltips; mobile renders full navigation in a modal sheet. General receives an active style and `aria-current="page"`. GitHub retains new-tab isolation attributes and an accessible external-link label.

Active/current semantics, expanded and collapsed controls, breadcrumb absence, external-link safety, and responsive behavior are validated through static checks and the WXT development build. UI tests are deferred until the settings behavior grows beyond this initial shell.

## Risks / Trade-offs

- **[TanStack's Vite plugin may interact unexpectedly with WXT's plugin orchestration]** → Configure explicit paths, avoid auto code splitting, and validate both `pnpm dev` and `pnpm build`; fall back to split code-based routes if generation cannot run reliably.
- **[A committed generated route tree can become stale]** → Regenerate through the configured plugin whenever route files change and verify the generated diff plus typecheck in normal checks.
- **[Pruning the stock Sidebar increases divergence from upstream]** → Preserve source attribution where present, keep only behavior required by the specification, and compare deliberately when refreshing rather than treating the registry as an update mechanism.
- **[Deleting unused Shared modules may conflict with near-term planned work]** → Follow current-use locality; reintroducing manually sourced primitives later is cheaper than maintaining unused code now.
- **[Icon-only navigation can be ambiguous]** → Require stable icons, accessible labels, and visible tooltips in the collapsed desktop state.

## Migration Plan

1. Add and configure the route generator, create file routes, and keep the existing code-based router available until generated routing passes tests.
2. Add the Settings and General Page slices and compose them from generated root/index routes.
3. Move and adapt Sidebar source into the Settings Page, then switch the options entrypoint to the new router and shell.
4. Remove the old `OptionsLayout`, manual settings registry, code-based route assembly, and unreferenced Shared modules after repository-wide usage checks.
5. Update architecture/design documentation and validate formatting, linting, Steiger, types, WXT development behavior, and the production build.

Rollback is a source revert: restore the code-based route tree, old layout, and Shared modules, then remove the router plugin and generated tree. No persisted user data or manifest migration is involved.
