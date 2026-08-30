## Context

See `proposal.md` for motivation. Numa already uses the recommended Feature-Sliced Design Steiger configuration and additional ESLint import restrictions. Steiger reports the canonical FSD subtree as clean, but it does not map WXT's framework-owned `src/entrypoints` directory to the FSD App layer. The current documentation accurately describes the repository but includes volatile details about current pages and components.

Pi and other Agent Skills-compatible harnesses discover project skills progressively: skill names and descriptions are always visible, while full instructions and references are loaded on demand. A broad Numa skill would therefore duplicate authoritative documents and risk activating for unrelated work.

## Goals / Non-Goals

**Goals:**

- Make architecture and design documents describe stable decisions rather than the current inventory.
- Preserve canonical FSD 2.1 semantics while accommodating WXT's required entrypoint structure.
- Divide automated enforcement between Steiger's supported FSD rules and ESLint's WXT boundary rules.
- Provide task-specific upstream expertise with small, explicit Numa adaptations.
- Standardize provenance comments for copied project-owned source.

**Non-Goals:**

- Renaming or extending Steiger's layer model.
- Creating a physical `src/app` directory.
- Moving existing runtime or UI modules solely to match documentation examples.
- Requiring every product-specific React component to originate from shadcn/ui.
- Installing shadcn/ui or ReactUse runtime packages, adopting their generators, or adding dependencies.
- Building a custom provenance ESLint or Steiger rule.

## Decisions

### 1. Keep project documents invariant-focused

`docs/architecture.md` will define only the FSD version, layer order, WXT composition-root adaptation, import/public-API rules, placement principles, and enforcement responsibilities. It will not enumerate current entrypoints, slices, files, or ownership assignments.

`DESIGN.md` will define only the shadcn baseline, semantic-token policy, ownership and promotion rules, source adaptation format, and equivalent ReactUse policy. Stable token decisions such as semantic colors and the base radius may remain; current component inventory will not.

This keeps decisions discoverable without requiring documentation changes for ordinary feature additions. The alternative—maintaining a live architecture inventory—was rejected because the source tree already provides that inventory.

### 2. Treat WXT entrypoints as App-responsibility composition roots, not a renamed FSD layer

The architecture document will state that the project has no physical App layer and that `src/entrypoints` fulfills App responsibilities under WXT ownership. Entrypoints may mount runtimes, register framework listeners, configure providers and routing, and compose any lower FSD layer. Reusable UI, domain behavior, and generic integration logic belong in the narrowest lower layer with a current owner.

This preserves both WXT discovery requirements and standard FSD terminology. Teaching Steiger a custom layer name or introducing `src/app` as an intermediate wrapper would add unsupported or redundant structure.

### 3. Use Steiger for canonical FSD and ESLint for the WXT boundary

`steiger.config.ts` will retain the official recommended FSD configuration. No custom Steiger plugin or synthetic App directory will be added.

The entrypoint ESLint restrictions will be adjusted so entrypoints can import the public APIs of Pages, Widgets, Features, Entities, and Shared while still rejecting deep imports into sliced-layer segments or shared modules. A complementary restriction will prevent canonical FSD layers from importing `src/entrypoints` through project aliases or cross-boundary relative paths.

This closes the boundary that Steiger cannot model while leaving slice direction, same-layer isolation, naming, and public APIs to the specialized tool. Duplicating all FSD rules in ESLint was rejected because it would create two drifting definitions.

### 4. Prefer shadcn/ui for primitives, not all product components

When shadcn/ui provides an appropriate primitive, it is the preferred source and the copied code becomes project-owned. Product layouts and compositions remain local code. Placement follows current FSD ownership rather than vendor default paths; promotion to Shared requires an independent reuse case.

This avoids forcing product-specific code into a vendor provenance model while retaining a consistent primitive baseline.

### 5. Standardize copied-source provenance without custom linting

Copied TypeScript and TSX source will use a top-of-file block in this form:

```ts
// Source code: https://...
// Adaptations:
// 1. First concrete project change.
// 2. Second concrete project change.
```

The source URL identifies the upstream material, and each numbered item records a concrete placement, API, dependency, behavior, styling, accessibility, formatting, or lint adaptation. Existing one-line and bullet-list variants will be normalized without changing runtime behavior. Source attribution does not replace preservation of applicable upstream licensing.

Documentation, adapted skills, and review will enforce the convention initially. A checker would validate syntax but could not prove provenance or completeness, so it is deferred until violations justify its maintenance cost.

### 6. Use three project-local adapted upstream skills and no broad Numa skill

Official Feature-Sliced Design, shadcn/ui, and ReactUse skills will be installed or vendored under `.agents/skills`, one directory per skill. Each will preserve its upstream license and record its upstream repository and pinned revision. The project will not retain a second unadapted copy with the same name.

Each skill will receive only a small `Numa project profile` that:

- points to `docs/architecture.md` or `DESIGN.md` as the authoritative local policy;
- states the relevant Numa exceptions, such as WXT composition roots or manual project-owned source adaptation;
- prevents unrequested CLI initialization, package installation, overwrite, or generator use;
- tells the agent to run the repository's established checks.

Descriptions will remain narrow so the FSD skill activates for structural work, shadcn for UI primitive work, and ReactUse for generic hook needs. Detailed upstream references remain progressively loaded. Copying project rules into a fourth skill was rejected because it would duplicate documents and activate too broadly.

### 7. Keep repository instructions as routing, not duplicated policy

`AGENTS.md` already directs agents to read the architecture document for structural changes and `DESIGN.md` for UI changes. It should remain concise; only a minimal skill-location or precedence clarification will be added if implementation reveals a real ambiguity.

## Risks / Trade-offs

- **[Adapted skills can drift from upstream]** → Record a pinned upstream revision and preserve a small, clearly delimited Numa profile so updates can be compared and reapplied deliberately.
- **[Official skill guidance may conflict with manual project sourcing]** → State local precedence explicitly and point each adapted skill to the authoritative Numa document.
- **[Multiple skills may load for one task]** → Keep descriptions narrow and references on demand; do not add a catch-all project skill.
- **[ESLint import patterns may miss an unusual relative path]** → Cover alias and cross-boundary relative imports, add focused lint fixtures or equivalent verification where practical, and run the full check.
- **[Minimal documents may omit useful examples]** → Keep only examples that define syntax, such as the provenance block; rely on existing source as structural examples.
- **[Mutable source URLs make refresh comparison less reproducible]** → Prefer pinned upstream URLs or record the upstream skill revision where available, without making network access part of normal checks.

## Migration Plan

1. Rewrite the two documents around the decisions above.
2. Adjust and verify ESLint entrypoint boundary rules; leave Steiger canonical.
3. Add pinned project-local copies of the three official skills and apply the minimal Numa profiles while preserving licenses.
4. Normalize existing copied-source headers without changing executable code.
5. Run targeted lint/architecture checks, then `pnpm check`.
6. Review the final diff for volatile inventory text, duplicated policy, generated files, dependency changes, and unrelated modifications.

Rollback consists of reverting the documentation, ESLint, skill, and comment-only changes; no runtime data or user migration is involved.
