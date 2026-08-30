import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
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
      TanStackRouterVite({
        routesDirectory: 'src/entrypoints/options/router/routes',
        generatedRouteTree: 'src/entrypoints/options/router/routeTree.gen.ts',
        autoCodeSplitting: false,
      }),
      tailwindcss(),
    ],
  }),
  manifest: {
    name: 'Numa',
    description: 'Translate selected text and ask AI about it.',
  },
});
