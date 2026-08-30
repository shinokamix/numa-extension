import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

// Vitest configuration files require a default export.
// eslint-disable-next-line import-x/no-default-export
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
