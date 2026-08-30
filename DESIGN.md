# Numa Design System

Numa uses shadcn/ui primitives and Vercel AI Elements as project-owned source code. This document defines the shared configuration and tokens that keep those components consistent.

## Source baseline

Manually copied shadcn source uses the `new-york` style, neutral semantic tokens, CSS variables, Lucide icons, TypeScript, client-side React, and Tailwind CSS 4 without a prefix or Tailwind config file.

The project does not keep shadcn CLI configuration. Place source at its current owner and import `cn` from `@/shared/lib/cn`.

## Tokens

### Colors

Components MUST use shadcn semantic color roles instead of Tailwind palette colors:

- `background` and `foreground`
- `card` and `card-foreground`
- `popover` and `popover-foreground`
- `primary` and `primary-foreground`
- `secondary` and `secondary-foreground`
- `muted` and `muted-foreground`
- `accent` and `accent-foreground`
- `destructive`
- `border`, `input`, and `ring`

Light and dark themes define these roles as CSS variables in `src/shared/styles/globals.css`. Components MUST NOT depend directly on palette names such as `neutral-900` or `blue-500`.

### Radius

The design system owns one base radius token:

```css
--radius: 0.5rem;
```

Use the standard shadcn and Tailwind radius utilities derived from this value. Do not introduce component-specific or arbitrary radius values. Use `rounded-full` only for circles and intentional pills.

### Other scales

Use Tailwind's standard typography, spacing, shadow, and motion scales. Add a project-specific token only after a concrete value is repeated and cannot be expressed by an existing semantic token or utility.

Avoid arbitrary values when a standard token or utility exists.

## Components

Organize components by current ownership and reuse, not by origin:

- Keep a component and its support graph with the Page, Feature, or runtime that solely owns it. The settings Sidebar and its sheet, tooltip, state, and responsive support are private to `pages/settings`.
- Promote a component to `src/shared/ui` only after it has a genuine independent consumer. Keep only the upstream support code required by current behavior rather than a speculative registry inventory.
- Give each Shared UI component one module directory, keep colocated files there, and expose named exports from an `index.ts` at the module root.
- Keep focused slice public APIs while leaving private UI modules unexported from the slice root.

Apply the same module structure to shared utilities: `lib/cn/cn.ts` is exported from `lib/cn/index.ts`. Do not add a global `src/shared/lib/index.ts` barrel.

Do not add redundant `ui`, vendor-specific, or nested `export` directories inside component modules. Do not add a global `src/shared/ui/index.ts` barrel.

Registry components are project-owned after installation. Copy shadcn source manually at the owning location; do not run the shadcn CLI in this project. Add the source URL and a concise list of adaptations to every copied file, including that it was adjusted to project formatting and lint rules. Do not suppress lint rules to preserve upstream formatting. Prune APIs and dependencies not required by current behavior, and keep product composition outside registry files. When refreshing source, compare deliberately with the recorded upstream source and preserve project formatting, accessibility, tokens, and architecture boundaries.

## Hooks

Copy generic hook source manually from SiberiaCanCode ReactUse only when there is an immediate use case. Start a single-owner hook in its owner's `lib` segment and move it to `src/shared/lib/<hook-name>/` with a focused `index.ts` only after an unrelated consumer appears.

Source-installed hooks are project-owned code. Every copied hook must record its source URL and project adaptations beside the source reference, including adjustment to project formatting and lint rules. Refresh hooks by comparing against the recorded upstream source rather than by running a registry CLI. Preserve project formatting and lint rules, and keep feature-specific orchestration hooks with their feature.

## Updating the system

When a change modifies shadcn configuration, shared tokens, or component-placement rules, update this document and the corresponding source files together.
