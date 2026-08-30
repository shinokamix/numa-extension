## Context

The shared stylesheet already defines light semantic tokens on `:root`, dark tokens under `.dark`, and a Tailwind dark variant. Both WXT UI entrypoints import that stylesheet but neither initializes a theme. The General settings page is currently a placeholder, and the project has no persistence model or manifest storage permission.

WXT entrypoints fulfill App-layer composition responsibilities. The theme preference is durable user-controlled application data consumed by the General settings page, options runtime, and popup runtime, so it requires a lower reusable owner without allowing entrypoints or Page slices to import one another.

## Goals / Non-Goals

**Goals:**

- Establish a narrow `preferences` Entity boundary for durable user-controlled preferences.
- Keep persistence typed, independently watchable, and suitable for incremental preference additions.
- Apply one consistent effective theme across current extension UI contexts without displaying React content under a known-wrong theme.
- Keep the settings-specific UI composition with its owning Page and use the existing semantic token system.

**Non-Goals:**

- Build a generic application store, storage repository, schema registry, reset/export workflow, or migration framework before another preference requires it.
- Place credentials, authentication data, caches, transient UI state, or build configuration in `preferences`.
- Add theme choices beyond System, Light, and Dark or redesign the existing color tokens.
- Synchronize preferences between browser installations or devices.

## Decisions

### Model durable user choices as a Preferences Entity

Create `src/entities/preferences` with a focused public API. The slice owns the appearance theme union, runtime normalization, persistence item, React-facing state, and effective-theme behavior. General settings consumes this API to edit the preference, while WXT composition roots consume it to initialize and provide theme state.

`preferences` is chosen over `settings` because `pages/settings` already owns the settings shell and because “settings” can ambiguously include credentials and technical configuration. It is chosen over an `appearance` Entity because future durable preferences may cover language or feature behavior while still sharing the same clear lifecycle: user-controlled, persisted, application-consumed values.

The slice is not a container for every stored value. New data belongs here only when it is a durable user preference; feature state and security-sensitive credentials retain separate owners.

Alternatives considered:

- `shared/lib/theme`: rejected because the persisted selection is application domain state rather than a domain-independent utility.
- `entities/appearance`: rejected as unnecessarily tied to the first settings category.
- Page-local state: rejected because popup and options must consume the same preference and lower layers cannot import a Page.

### Store preferences as independent typed WXT storage items

Define the appearance theme as a WXT storage item in the local area with a stable namespaced key and `system` fallback. Normalize values read at runtime so unsupported or legacy values resolve safely to System despite compile-time typing.

Each future preference will receive its own item instead of extending one monolithic JSON object. This permits focused watchers, atomic writes, independent defaults and migrations, and storage-area choices without a custom wrapper. WXT's built-in storage API already provides the required browser-storage adaptation, so no dependency or generic storage manager is added.

Local storage is selected because the requested behavior is persistence in the current browser installation; cross-device sync is outside scope.

### Initialize theme at each WXT composition root and provide reactive state

The options and popup entrypoints will load and apply the initial effective theme before mounting their React trees, then compose an Appearance theme provider around existing content. Initialization must tolerate a missing or invalid value and fall back to System so storage errors do not prevent the extension UI from mounting.

The provider exposes the selected preference and a synchronous UI setter to higher layers; persistence remains internal and storage subscriptions publish successful changes. It uses ordinary React state and effects to watch the storage item for changes from other extension contexts, while the shared ReactUse `useMediaQuery` hook tracks `prefers-color-scheme`. Storage is the single source of theme-state updates, including writes from the current context. Listeners are removed when their owning React tree unmounts.

A single all-preferences React context is rejected because unrelated preference updates would couple consumers and trigger broad rerenders. Additional preferences should expose focused APIs based on their actual consumption patterns.

### Apply effective theme through the document root

Resolve the effective light/dark value from the stored choice and `matchMedia('(prefers-color-scheme: dark)')`. Toggle the existing `.dark` class on `document.documentElement` and set the root `color-scheme` property so native controls match. Explicit Light and Dark ignore subsequent system changes; System follows them live.

The existing semantic CSS variables remain the single color source. Components continue using semantic utilities and require no palette-specific dark overrides.

### Keep Appearance composition in General settings

Add a minimal page-local `AppearanceSettings` composition and manually adapt only the required shadcn Select source into the `general-settings` Page slice. A labeled Theme row presents System, Light, and Dark in a compact single-selection control while preserving one selected value.

The primitive remains with its sole current owner rather than being promoted to Shared. Its source file records the pinned upstream URL and concrete Numa adaptations required by `DESIGN.md`.

### Grant only extension storage permission

Add `storage` to the WXT manifest permissions. No host permission, external service, or additional build target is introduced.

## Risks / Trade-offs

- [Asynchronous storage could briefly expose the default theme] → Apply the loaded effective theme before mounting React content and always complete initialization with a System fallback.
- [A storage write can fail] → Keep the previous selected value active by publishing state only from successful storage changes instead of reporting an unsaved choice as persisted.
- [System listeners can leak] → Reuse the shared ReactUse `useMediaQuery` hook, which owns one media-query subscription with explicit cleanup, and apply its value only when resolving System.
- [The Preferences Entity can become a dumping ground] → Document and enforce the durable user-choice boundary; keep each preference in a domain-named model file and avoid a monolithic preferences object or context.
- [Adding `storage` changes extension permissions] → Limit the manifest change to the standard storage permission already approved for this feature.

## Migration Plan

1. Add the `storage` manifest permission and the Preferences Entity without changing existing stored data.
2. Treat absence of the new key as System, so existing installations require no data migration.
3. Mount theme initialization and providers in both UI entrypoints, then replace the General settings placeholder with the Appearance control.
4. Roll back by removing the UI/provider integration and permission; the unused local preference key is harmless and can remain without affecting prior behavior.
