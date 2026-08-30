import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ['./src/entities/preferences/**'],
    rules: {
      // WXT entrypoints consume this slice but are intentionally outside Steiger's FSD graph.
      'fsd/insignificant-slice': 'off',
    },
  },
]);
