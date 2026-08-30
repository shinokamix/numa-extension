## 1. Stable Documentation

- [x] 1.1 Rewrite `docs/architecture.md` around FSD 2.1 invariants, WXT entrypoint composition roots, public APIs, placement, and enforcement; verify it contains no inventory of current pages, entrypoints, or files.
- [x] 1.2 Rewrite `DESIGN.md` around stable tokens, ownership, shadcn/ui primitive sourcing, ReactUse sourcing, and the numbered provenance format; verify product-specific composition remains explicitly permitted and no current component inventory remains.

## 2. Architecture Enforcement

- [x] 2.1 Adjust the entrypoint ESLint restrictions to permit public-API imports from every lower FSD layer while rejecting deep imports; verify focused valid and invalid import cases produce the expected ESLint results.
- [x] 2.2 Add the inverse ESLint boundary preventing Pages, Widgets, Features, Entities, and Shared from importing WXT entrypoints through aliases or cross-boundary relative paths; verify focused invalid imports are rejected.
- [x] 2.3 Confirm `steiger.config.ts` remains on the official recommended FSD configuration without a custom entrypoints mapping, and verify `pnpm lint:arch` passes.

## 3. Project-Adapted Agent Skills

- [x] 3.1 Vendor the official Feature-Sliced Design skill into `.agents/skills` at a pinned upstream revision, preserve its license, add only the Numa WXT profile and authoritative architecture link, and verify its frontmatter is valid and narrowly describes structural tasks.
- [x] 3.2 Vendor the official shadcn/ui skill into `.agents/skills` at a pinned upstream revision, preserve its license, add only the Numa manual-sourcing and placement profile with a `DESIGN.md` link, and verify it does not instruct agents to initialize, install, or overwrite project code without an explicit request.
- [x] 3.3 Vendor the official ReactUse skill into `.agents/skills` at a pinned upstream revision, preserve its license, add only the Numa manual-sourcing, ownership, and dependency-safety profile with a `DESIGN.md` link, and verify its frontmatter activates specifically for generic hook needs.
- [x] 3.4 Check the project skill tree for duplicate names, an unintended broad Numa skill, duplicated project policy, and unrecorded upstream origins; verify each adapted skill keeps detailed references progressive rather than embedding them in its always-visible description.

## 4. Existing Source Provenance

- [x] 4.1 Normalize all existing shadcn/ui-derived component headers to `Source code`, `Adaptations`, and numbered comment entries; verify only comments change and each adaptation is concrete.
- [x] 4.2 Normalize all existing ReactUse-derived hook headers to the same format; verify only comments change and the upstream source remains identifiable.

## 5. Verification

- [x] 5.1 Run targeted ESLint and Steiger checks after the boundary changes and resolve any configuration regressions without weakening the documented rules.
- [x] 5.2 Run `pnpm check`, inspect `git diff` and `git status`, and verify there are no runtime behavior, generated-file, dependency, permission, external-service, or unrelated changes.
