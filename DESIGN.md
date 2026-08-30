# Numa Design System

Numa uses semantic design tokens and project-owned source adapted from shadcn/ui and SiberiaCanCode ReactUse. This document defines stable sourcing, ownership, and placement rules; the source tree is the inventory of current components and hooks.

## Stable baseline and tokens

Manually sourced shadcn/ui primitives use the `new-york` style, neutral semantic tokens, CSS variables, Lucide icons, TypeScript, client-side React, and Tailwind CSS 4 without a prefix or Tailwind configuration file. Numa does not keep shadcn CLI configuration or use the CLI to install source.

Components MUST use semantic color roles such as `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, and `ring`, including their foreground counterparts where defined. They MUST NOT depend directly on palette colors.

The base radius is `--radius: 0.5rem`. Use radius utilities derived from it; use `rounded-full` only for circles and intentional pills. Use Tailwind's standard typography, spacing, shadow, and motion scales. Add a project token only when a repeated value cannot be expressed by an existing semantic token or utility, and avoid arbitrary values when a standard choice exists.

## Ownership and placement

Place UI and hooks according to their current FSD owner, not their upstream registry path:

- Keep single-owner source with its Page, Widget, Feature, Entity, or entrypoint.
- Promote domain-independent source to Shared only after an unrelated reuse case exists.
- Give Shared UI components and libraries focused module directories and public `index.ts` APIs; do not add global layer barrels.
- Keep private support code out of slice public APIs.

Product-specific components, layouts, and compositions are explicitly permitted as local project code. They do not need shadcn/ui provenance. Keep product composition outside copied primitive files.

## shadcn/ui primitives

Prefer shadcn/ui when it provides an appropriate primitive. Copy only the source and support graph needed by current behavior, manually place it with its owner, and treat it as project-owned code. Do not initialize shadcn/ui, run its generator, or preserve unused APIs and dependencies.

Adapt copied source to Numa's semantic tokens, accessibility requirements, architecture boundaries, formatting, and lint rules. Do not suppress project rules merely to preserve upstream formatting. Refresh source by comparing deliberately with its recorded upstream source.

## ReactUse hooks

For a generic hook need, prefer manually sourcing an appropriate hook from SiberiaCanCode ReactUse when it fits the immediate use case. Start it with its sole owner and promote it to Shared only after independent reuse. Feature-specific orchestration hooks remain with their feature rather than being treated as generic ReactUse utilities.

Copied hooks are project-owned. Copy only required behavior, avoid new dependencies unless explicitly approved, adapt the source to project formatting and lint rules, and refresh it by comparison with the recorded upstream source. Do not run a registry installer or generator.

## Source provenance

Every copied TypeScript or TSX source file MUST begin with an identifiable upstream URL and concrete project adaptations in this format:

```ts
// Source code: https://...
// Adaptations:
// 1. First concrete project change.
// 2. Second concrete project change.
```

Each numbered item records a concrete placement, API, dependency, behavior, styling, accessibility, formatting, or lint adaptation. Source attribution does not replace preservation of applicable upstream licensing. When source is refreshed, update the URL or adaptation list when necessary.
