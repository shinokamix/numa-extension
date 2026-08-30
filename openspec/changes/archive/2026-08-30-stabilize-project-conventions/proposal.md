## Why

The project conventions currently mix stable architectural decisions with descriptions of the present file tree, making documentation costly to maintain and leaving the WXT adaptation of FSD only partially enforceable. The project also needs task-specific agent guidance for FSD, shadcn/ui, and ReactUse without loading a broad, duplicative Numa skill for routine work.

## What Changes

- Reduce `docs/architecture.md` to stable FSD 2.1 invariants, defining WXT `src/entrypoints` as composition roots that fulfill App-layer responsibilities without introducing `src/app`.
- Reduce `DESIGN.md` to stable token, ownership, shadcn/ui primitive, ReactUse hook, and copied-source provenance conventions.
- Enforce the WXT-to-FSD boundary with ESLint while leaving standard FSD structure and public API enforcement to Steiger.
- Permit entrypoints to compose all lower FSD layers through public APIs and prevent lower layers from importing entrypoints.
- Add project-local adaptations of the official Feature-Sliced Design, shadcn/ui, and ReactUse agent skills, with narrow activation descriptions and links to the authoritative Numa documents.
- Do not add a broad `numa-conventions` skill or duplicate project documentation inside skills.
- Normalize existing copied shadcn/ui and ReactUse source headers to the documented `Source code` and numbered `Adaptations` format.
- Do not add a custom provenance linter until repeated violations demonstrate that documentation, skills, and review are insufficient.

## Capabilities

### New Capabilities

None. This change updates documentation, development tooling, and agent guidance without changing extension behavior.

### Modified Capabilities

None.

## Impact

- Documentation: `docs/architecture.md`, `DESIGN.md`, and potentially concise cross-references in `AGENTS.md`.
- Tooling: `eslint.config.js` and confirmation that `steiger.config.ts` remains focused on canonical FSD layers.
- Agent guidance: project-level skill files under an agent-compatible project skill directory, derived from pinned official upstream revisions and adapted for Numa.
- Source files: provenance comments in existing shadcn/ui-derived components and ReactUse-derived hooks; runtime behavior remains unchanged.
- Dependencies and extension permissions: no application dependency, manifest permission, host permission, external service, or build-target changes.
