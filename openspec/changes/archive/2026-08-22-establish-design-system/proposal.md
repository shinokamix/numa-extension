## Why

The project needs a small, explicit design-system reference before shadcn/ui and AI Elements components are introduced. A single source of truth will keep generated and custom UI consistent without prematurely building a large component taxonomy.

## What Changes

- Add a concise root-level `DESIGN.md` documenting the project's design tokens and shadcn/ui configuration.
- Add `components.json` configured for the existing React, TypeScript, and Tailwind CSS 4 project.
- Add shared global theme CSS with standard shadcn semantic color tokens and one base radius token, `--radius: 0.5rem`.
- Add the shared `cn` utility required by generated shadcn components and wire the popup to the shared global stylesheet.
- Establish that every reusable UI component has its own module under `src/shared/components`, regardless of whether it originates from shadcn/ui, AI Elements, or project code.
- Establish that one-off compositions remain in the relevant feature or entrypoint.
- Install the shadcn `Button` component in `src/shared/components/Button` as the initial component and configuration smoke test, without rendering it in the current UI.
- Add a link to `DESIGN.md` from `AGENTS.md`.

## Capabilities

### New Capabilities

None. This change documents project conventions and does not introduce user-facing behavior.

### Modified Capabilities

None.

## Impact

The change affects project documentation, shadcn configuration, shared theme CSS and utilities, the popup's global-style import, and the initial reusable `Button` source. Existing dependencies already provide the expected shadcn utility packages. It does not change extension permissions, APIs, or the current rendered UI.
