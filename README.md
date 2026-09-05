# Numa

Numa is a browser extension for an AI agent panel that works with web page content.

## Development

Install the dependencies:

```bash
pnpm install
```

Start the development watcher for your browser:

```bash
pnpm dev          # Chrome
pnpm dev:firefox  # Firefox
```

Run all formatting, lint, architecture, type, and test checks:

```bash
pnpm check
```

Build the extension:

```bash
pnpm build          # Chrome
pnpm build:firefox  # Firefox
```

## Project structure

Numa uses WXT, React, TypeScript, Tailwind CSS, and Feature-Sliced Design. Source code lives in `src/`. WXT entrypoints live in `src/entrypoints`.

Read [`docs/architecture.md`](docs/architecture.md) before you change project boundaries. Read [`DESIGN.md`](DESIGN.md) before you change UI components or design tokens.
