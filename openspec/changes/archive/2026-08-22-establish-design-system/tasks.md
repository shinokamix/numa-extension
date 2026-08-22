## 1. Design-System Documentation

- [x] 1.1 Create root-level `DESIGN.md` with the agreed shadcn configuration, semantic color-token policy, standard Tailwind scale policy, single `--radius: 0.5rem` token, and per-component module placement rules under `src/shared/components`; verify the document contains each decision and no redundant `ui` or `export` directories.
- [x] 1.2 Add a clear reference to `DESIGN.md` in root `AGENTS.md` and verify the relative link resolves to the new document.

## 2. shadcn Foundation

- [x] 2.1 Add `components.json` for the client-only TypeScript and Tailwind CSS 4 setup, with component aliases targeting `@/shared/components`, the utility alias targeting `@/shared/utils/cn`, and no generic `lib` alias; verify the shadcn CLI resolves all configured aliases inside the repository.
- [x] 2.2 Create `src/shared/styles/globals.css` with Tailwind imports, light and dark shadcn semantic tokens, theme mappings, base styles, and `--radius: 0.5rem`; replace the popup's local global-style import and verify there is a single active token source.
- [x] 2.3 Add the shared `cn` utility at `src/shared/utils/cn`, expose it through that module's local `index.ts` without a global utils barrel, and verify it typechecks with the existing `clsx` and `tailwind-merge` dependencies.

## 3. Initial Component

- [x] 3.1 Install the shadcn `Button` at `src/shared/components/Button/Button.tsx`, expose it through `src/shared/components/Button/index.ts`, and verify it typechecks without being rendered by the current popup or leaving a redundant `ui` directory.

## 4. Verification

- [x] 4.1 Run `pnpm check` and `pnpm build`, then inspect the final diff to verify the documented tokens and component structure match the actual configuration, no component beyond `Button` was installed, and the current UI composition was not changed.
