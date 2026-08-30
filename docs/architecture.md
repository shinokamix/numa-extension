# Numa Architecture

Numa follows Feature-Sliced Design (FSD) 2.1 within WXT's browser-extension structure.

## Layers and dependency direction

The canonical lower layers, from highest to lowest, are Pages, Widgets, Features, Entities, and Shared. Code may import only from layers below it. Slices on the same layer are isolated from one another.

Create a layer, slice, or segment only for a current responsibility. Place code in the lowest layer that accurately reflects its owner:

- Pages own route- or screen-level composition.
- Widgets own independently meaningful, reusable UI blocks.
- Features own user interactions that deliver product value.
- Entities own domain concepts.
- Shared owns domain-independent UI, libraries, configuration, APIs, and styles with genuine independent reuse.

Single-owner code stays with that owner. Promote code to Shared only when it has an independent reuse case. Generated source remains at the framework-prescribed location and must not be edited manually.

## WXT composition roots

There is no physical `src/app` layer. WXT requires runtime entrypoints under `src/entrypoints`, so those entrypoints fulfill App-layer responsibilities as framework-owned composition roots.

An entrypoint may:

- mount a runtime or register framework listeners;
- initialize providers, routing, and global styles;
- adapt browser-extension lifecycle APIs at the runtime boundary;
- compose public APIs from any lower FSD layer.

Entrypoint-local code is allowed when it exists only to configure or mount that runtime. Reusable UI, domain behavior, and generic integration logic belong in the narrowest lower layer with a current owner. Lower FSD layers must never import an entrypoint.

## Public APIs and imports

Pages, Widgets, Features, and Entities expose a focused public API from each slice root. Other slices and higher layers import that public API rather than deep-importing segments or implementation files. Shared exposes focused module public APIs; it does not have a global layer barrel.

Within a slice or Shared module, use relative imports for private implementation. Do not import back through the module's own public API. Keep private support files unexported.

## Enforcement

Steiger uses the official recommended Feature-Sliced Design configuration to enforce canonical layer direction, slice isolation, naming, and public APIs. It does not model `src/entrypoints` as a custom layer.

ESLint complements Steiger at the WXT boundary: entrypoints may consume lower-layer public APIs but not deep implementation paths, and lower layers may not import entrypoints through aliases or relative paths. ESLint also enforces the project's general TypeScript, React, accessibility, cycle, and runtime-boundary rules.

Run `pnpm lint:arch` for focused FSD validation and `pnpm check` for the complete project checks.
