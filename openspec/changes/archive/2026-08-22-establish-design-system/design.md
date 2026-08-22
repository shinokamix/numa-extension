## Context

The popup currently imports Tailwind CSS 4 and `tw-animate-css`, and the project already has the utility dependencies commonly used by shadcn/ui. No shadcn components or AI Elements components have been added yet. See `proposal.md` for the motivation.

The documented decisions and actual shadcn configuration must agree before the concrete UI is built, without creating a second component taxonomy or duplicating Tailwind's existing scales.

## Goals / Non-Goals

**Goals:**

- Make `DESIGN.md` the concise source of truth for styling future shadcn/ui, AI Elements, and project-authored components.
- Materialize the documented decisions in shadcn configuration and shared global theme CSS.
- Document semantic tokens and the rules for using them without inventing redundant project-specific scales.
- Establish one unambiguous placement rule for reusable and one-off UI components.
- Verify the configuration by installing one reusable shadcn `Button` without changing the rendered UI.

**Non-Goals:**

- Installing AI Elements or shadcn components other than `Button`.
- Designing individual screens or rendering `Button` in the current popup.
- Changing product behavior or the current visual composition.
- Maintaining separate component directories based on library origin.

## Decisions

### Keep `DESIGN.md` short and normative

The document will contain only conventions that future UI work must follow: shadcn configuration, token policy, and component placement. It will link to upstream shadcn/Tailwind behavior instead of reproducing component documentation.

Alternative considered: a comprehensive design-system handbook with component catalogs and usage examples. This is premature because the application UI has not been designed yet and would make the document harder to maintain.

### Use the compact shadcn baseline

The documented shadcn configuration will use:

- style: `new-york`;
- base color: `neutral`;
- CSS variables: enabled;
- icon library: `lucide`;
- TypeScript/TSX: enabled;
- React Server Components: disabled;
- Tailwind prefix: none;
- Tailwind configuration path: empty for Tailwind CSS 4.

`components.json` will point both the general component alias and the UI alias to `@/shared/components`, avoiding a redundant `ui` directory. The shadcn utility alias resolves directly to the `cn` module at `@/shared/utils/cn`, and the hooks alias resolves through `@/shared/hooks`. No generic `lib` alias or directory is used.

Alternative considered: adopting a more expressive preset. The neutral, compact baseline is less likely to fight AI Elements defaults and can be branded later through semantic tokens.

### Keep theme CSS shared across UI entrypoints

The shadcn CSS target will be `src/shared/styles/globals.css`. It will contain the Tailwind and animation imports, dark variant, light and dark semantic token values, Tailwind theme mappings, the base radius, and shadcn base-layer styles. The popup entrypoint will import this shared stylesheet instead of maintaining an entrypoint-specific global stylesheet.

Alternative considered: extending `src/entrypoints/popup/style.css`. That would make the design-system foundation owned by one runtime context and encourage future UI entrypoints to duplicate tokens.

### Add the required shared utility

The standard shadcn `cn` helper will live in `src/shared/utils/cn/cn.ts`, with named exports from `src/shared/utils/cn/index.ts`, and compose `clsx` with `tailwind-merge`. The `utils` alias points directly to this module because generated shadcn components import `cn` from that exact alias. There is no global `src/shared/utils/index.ts` barrel. The required packages are already dependencies, so no new dependency is expected.

Alternative considered: postponing the utility until more components are installed. Installing `Button` already requires it, and creating it now verifies that aliases and generated imports are valid.

### Use one project-owned radius token

The only project-owned radius value will be:

```css
--radius: 0.5rem;
```

Components will use the standard shadcn/Tailwind radius utilities derived from that base. Arbitrary radius values and additional project-specific radius tokens will be discouraged. `rounded-full` remains valid for circles and intentional pills.

Alternative considered: separate radii for controls, cards, panels, and dialogs. That adds decisions without current product evidence and is harder to apply consistently to generated AI Elements source.

### Reuse standard token scales

The document will distinguish between semantic color tokens and general scales:

- Components use standard shadcn semantic color roles such as `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, and `ring`, including their foreground counterparts where defined.
- Light and dark themes define those semantic roles through CSS variables; components do not depend directly on palette color names.
- Typography, spacing, shadows, and motion use the standard Tailwind scales unless a concrete product requirement later justifies a new token.
- Arbitrary values are avoided when a standard semantic token or Tailwind utility exists.

Alternative considered: defining custom Numa scales for every token category. Reusing Tailwind avoids redundant abstractions while the product has few screens.

### Organize components by reuse, not origin

Every reusable UI component gets one module directory directly under `src/shared/components`, whether it originates from shadcn/ui, AI Elements, or project code. Each module keeps its implementation and colocated files together and exposes named exports from an `index.ts` at the module root, for example `src/shared/components/Button/Button.tsx` and `src/shared/components/Button/index.ts`.

A composition used by only one feature or entrypoint stays with that feature or entrypoint and is built from shared components. A component moves to `shared/components` only when it is genuinely reusable. Library-specific directories such as `shared/components/ui`, `shared/components/ai-elements`, and nested `export` directories will not be part of the architecture.

Registry CLIs may initially generate flat files at the configured component alias. Generated source is project-owned and will be moved into the component module structure immediately, with imports adjusted as needed.

Alternatives considered: a shared `ui` directory repeats information already expressed by `components`; separate vendor directories expose library boundaries to consumers; nested `export` directories add indirection when the module-root `index.ts` already defines the public API.

### Install `Button` as a configuration smoke test

The shadcn `Button` will be installed in `src/shared/components/Button/Button.tsx` and exported from `src/shared/components/Button/index.ts` according to the repository's named-export convention. It will not be added to the popup composition. Successful typechecking and tests will verify the aliases, `cn` utility, styling imports, and component dependencies without introducing a UI redesign.

Alternative considered: stopping after configuration files. A generated component catches path and integration errors that static configuration alone may hide, and `Button` is expected to be needed by the product.

## Risks / Trade-offs

- [The standard Tailwind scales may not cover a future visual requirement] → Add a token only when a concrete repeated need appears, and update `DESIGN.md` with the rationale.
- [Registry CLIs generate flat files and may not detect files moved into module directories] → Treat generation as an import step, move generated source immediately, and review paths before adding an existing component again.
- [Changing the global stylesheet path can leave duplicate or stale CSS] → Replace the popup import deliberately, remove the superseded stylesheet, and verify the production build.
- [`new-york` or other CLI options may evolve] → Keep the documented product decisions stable and translate them to the closest supported CLI configuration during implementation.
- [A root design document can drift from actual CSS] → Link it from `AGENTS.md` and require future token/configuration changes to update the document in the same change.
