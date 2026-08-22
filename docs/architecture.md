# Numa Architecture

Numa uses WXT's file-based entrypoints with a lightweight, feature-oriented structure.

## Runtime boundaries

| Context      | Responsibility                                                  |
| ------------ | --------------------------------------------------------------- |
| `popup`      | React UI and popup actions                                      |
| `content`    | Page integration, text selection, overlay UI, and DOM access    |
| `background` | Messaging, API requests, storage, permissions, and coordination |

Each entrypoint owns its runtime context. Keep entrypoint-specific helpers inside its directory; do not put helpers directly in `src/entrypoints`.

## Project structure

The project uses `srcDir: 'src'`; WXT discovers entrypoints in `src/entrypoints`.

```text
src/
├── entrypoints/
│   ├── popup/
│   ├── content/
│   └── background/
├── features/
│   ├── translate-selection/
│   ├── ask-ai/
│   └── settings/
└── shared/
    ├── components/
    ├── hooks/
    ├── api/
    ├── utils/
    ├── styles/
    └── types/
```

## Dependency direction

```text
entrypoints → features → shared
entrypoints → shared
```

- `shared` must not import `features` or `entrypoints`.
- Features must not import code from a specific entrypoint.
- Entrypoints compose features and connect them to the runtime context.
- Keep feature models independent of React and the DOM where practical.
- Keep browser APIs, network requests, and other side effects at system boundaries.
- Avoid direct feature-to-feature dependencies.

## Features

A feature is a user-facing capability, such as `translate-selection`, `ask-ai`, or `settings`.

```text
features/translate-selection/
├── ui/
│   └── TranslateButton/
│       ├── TranslateButton.tsx
│       ├── TranslateButton.test.tsx
│       └── index.ts
├── model/
│   └── translate.ts
└── api/
    └── translate.ts
```

- `ui` contains presentation code;
- `model` contains state, use cases, and feature logic;
- `api` contains feature-specific integration boundaries.

These layers are optional. UI used by one entrypoint may stay next to that entrypoint.

Within a feature:

- `ui` may depend on `model`;
- `model` may depend on feature `api` and `shared`;
- feature `api` may depend on `shared`;
- feature code must not depend on an entrypoint.

## Shared modules

`shared` contains code used by multiple independent features:

- `components` — generic UI components;
- `hooks` — reusable hooks;
- `api` — shared integrations, including external APIs, messaging, storage, and browser adapters;
- `utils` — small, pure utilities organized as modules with local public APIs;
- `styles` — shared design tokens and global UI styles imported by UI entrypoints;
- `types` — types shared by independent modules.

Keep feature-specific code in the feature. Move code to `shared` only when it has at least two independent consumers.

## Module structure and exports

Give each reusable component, hook, or module its own directory when it may need tests, styles, types, or related files. Keep those files together.

Use the directory's `index.ts` as the module's public API:

```ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

Use named exports. Avoid a global `src/index.ts` barrel. Internal files should import each other directly; consumers should import from the module's `index.ts`.

## Cross-context communication

```text
content → typed message → background → API / storage → result
popup  ────────────────────┘
```

Content owns page integration and the DOM. Popup owns its UI. Background owns external integrations and coordination.
