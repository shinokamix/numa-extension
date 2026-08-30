# Numa

Numa is a WXT browser extension for translating selected text and asking AI questions about it. It uses React, TypeScript, Tailwind CSS, and Feature-Sliced Design.

## Development

Install dependencies:

```bash
pnpm install
```

Run a development build:

```bash
pnpm dev
pnpm dev:firefox
```

## Checks

```bash
pnpm format:check  # Prettier
pnpm lint          # ESLint code and runtime policies
pnpm lint:arch     # Steiger FSD architecture checks
pnpm typecheck     # TypeScript
pnpm test:run      # Vitest
pnpm check         # All checks above
```

Production builds:

```bash
pnpm build
pnpm build:firefox
```

WXT composition roots live in `src/entrypoints`. The options entrypoint owns router bootstrap and file-route composition, while route-level UI lives in focused `src/pages` slices. Single-owner support stays local and moves to `src/shared` only after genuine independent reuse. See [`docs/architecture.md`](docs/architecture.md) for ownership, dependency, public-API, and browser-runtime rules. See [`DESIGN.md`](DESIGN.md) before changing UI components or tokens.
