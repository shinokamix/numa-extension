# Numa — Agent Instructions

## Project

Numa is a browser extension that translates selected text and lets users ask AI questions about it.
The project uses WXT, React, and TypeScript. Extension source code lives in `src/`; use `pnpm` for all scripts.

## Commands

```bash
pnpm install          # install dependencies
pnpm dev              # development build
pnpm dev:firefox      # Firefox development build
pnpm check            # format check, lint, typecheck, and tests
pnpm test:run         # run Vitest once
pnpm build            # production build
pnpm zip              # package the extension
```

Use `pnpm test:run -- <file-or-filter>` for a targeted test. Use the Firefox variants when the change affects Firefox packaging or behavior. Run `pnpm check` before completing normal code changes.

## Important Paths

- `src/` — extension source code
- `src/entrypoints/` — WXT entrypoints, currently including the popup
- `tests/` — Vitest tests
- `public/` — static assets
- `wxt.config.ts` — WXT and manifest configuration
- `package.json` — scripts and dependencies
- `.wxt/` and `.output/` — generated files; never edit them manually

## Repository Rules

- Check `git status` and the relevant diff before editing.
- Preserve unrelated user changes; do not reset, clean, or revert them.
- Keep changes focused and follow the existing WXT structure.
- Treat `package.json`, `wxt.config.ts`, `.oxfmtrc.json`, and `.oxlintrc.json` as authoritative.
- Use Oxfmt and Oxlint instead of bypassing formatting or lint rules.
- Add or update tests when changing behavior; keep tests under `tests/`.
- Avoid adding dependencies or changing tooling configuration without a clear reason.

## Extension Safety

Ask before changing manifest permissions, host permissions, authentication, external services, security-sensitive behavior, dependencies, or build targets.
Never commit secrets, credentials, tokens, or private user data. Values bundled into a browser extension are public.

## Verification

- Run `pnpm check` for normal source changes.
- Use `pnpm dev` for UI or extension behavior changes.
- Use `pnpm build` or `pnpm zip` when validating production packaging.
- Report relevant checks and any skipped verification.

Do not create commits or push changes unless explicitly requested. Add a nested `AGENTS.md` only when a subtree has genuinely different rules.
