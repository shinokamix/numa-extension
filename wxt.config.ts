import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  webExt: {
    disabled: true,
  },
  vite: () => ({
    plugins: [
      tanstackRouter({
        routesDirectory: 'src/entrypoints/options/router/routes',
        generatedRouteTree: 'src/entrypoints/options/router/routeTree.gen.ts',
        autoCodeSplitting: false,
      }),
      tailwindcss(),
    ],
  }),
  manifest: {
    name: 'Numa',
    description: 'AI agent panel for working with web page content.',
    permissions: ['storage'],
  },
});
