# Numa Design System

Numa uses shadcn/ui primitives and Vercel AI Elements as project-owned source code. This document defines the shared configuration and tokens that keep those components consistent.

## shadcn Configuration

Use these settings in `components.json`:

| Setting                 | Value                                 |
| ----------------------- | ------------------------------------- |
| Style                   | `new-york`                            |
| Base color              | `neutral`                             |
| CSS variables           | enabled                               |
| Icon library            | `lucide`                              |
| TypeScript/TSX          | enabled                               |
| React Server Components | disabled                              |
| Tailwind prefix         | none                                  |
| Tailwind config         | none; the project uses Tailwind CSS 4 |

Both shadcn component aliases resolve to `@/shared/components`. The shadcn utility alias resolves directly to `@/shared/utils/cn`. The project does not use a generic `lib` alias.

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

Organize components by reuse, not by origin:

- Give every reusable UI component one module directory directly under `src/shared/components`, whether it comes from shadcn/ui, AI Elements, or project code.
- Keep the implementation and colocated files in that module, for example `Button/Button.tsx` and `Button/Button.test.tsx`.
- Use named exports and expose the module's public API from an `index.ts` at the module root.
- Keep a composition used by one feature or entrypoint with that feature or entrypoint.
- Move a component to shared components only when it has a genuine independent reuse case.

Apply the same module structure to shared utilities: `utils/cn/cn.ts` is exported from `utils/cn/index.ts`. Do not add a global `src/shared/utils/index.ts` barrel.

Do not add redundant `ui`, vendor-specific, or nested `export` directories. Do not add a global `src/shared/components/index.ts` barrel.

Registry components are project-owned after installation. Registry CLIs may generate flat files at the configured alias; move those files into the module structure immediately and adjust imports as needed.

## Hooks

Source-install generic reusable hooks through SiberiaCanCode useverse using `reactuse.json`. Add only hooks with an immediate use case, then organize each under `src/shared/hooks/<hook-name>/` with its own `index.ts`. Remove the generated global `src/shared/hooks/index.ts` barrel and import hooks from their module path, for example `@/shared/hooks/useDisclosure`.

Source-installed hooks are project-owned code. Refresh one deliberately with `pnpm dlx useverse@latest add <hook-name> --overwrite`, review the diff, and preserve project formatting and lint rules. Keep feature-specific orchestration hooks with their feature rather than moving them into shared.

## Updating the system

When a change modifies shadcn configuration, shared tokens, or component-placement rules, update this document and the corresponding source files together.
