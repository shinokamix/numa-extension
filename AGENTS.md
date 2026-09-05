# Numa agent instructions

## Project

Numa is a WXT browser extension for an AI agent panel that works with web page content. It uses React and TypeScript. Use `pnpm` to run project scripts.

## Required reading

- Before you change the project structure, read [docs/architecture.md](docs/architecture.md). Update that document when you change an architecture boundary.
- Before you add or change UI code or design tokens, read [DESIGN.md](DESIGN.md).

## Repository rules

- Before you edit a file, check `git status` and the relevant diff.
- Preserve unrelated user changes. Do not reset, clean, or revert them.
- Treat the scripts in `package.json` and the checked-in tool configuration as authoritative.
- Do not edit generated files in `.wxt/` or `.output/`. Do not edit `src/entrypoints/options/router/routeTree.gen.ts`.
- When you change behavior, add or update a colocated test.

## Approval and safety

Before you change any of these areas, get the user's explicit approval:

- manifest permissions or host permissions.
- authentication or external services.
- how the extension stores or transmits user data.
- dependencies.
- build targets.

Do not commit secrets, credentials, tokens, or private user data. Any value bundled into the extension is public.

Do not create a commit or push changes unless the user asks you to.

## Verification

- Before you finish a source-code change, run `pnpm check`.
- After you change `wxt.config.ts` or an entrypoint, run `pnpm build`.
- If a change affects Firefox packaging or behavior, use the relevant Firefox command.
- Report the checks that you ran and any relevant checks that you skipped.
