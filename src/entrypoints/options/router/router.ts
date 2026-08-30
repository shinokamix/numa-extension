import {
  createHashHistory,
  createRouter as createTanStackRouter,
  type RouterHistory,
} from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

export function createRouter(history?: RouterHistory) {
  return createTanStackRouter({
    routeTree,
    ...(history ? { history } : {}),
  });
}

export const router = createRouter(
  typeof document === 'undefined' ? undefined : createHashHistory(),
);

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
