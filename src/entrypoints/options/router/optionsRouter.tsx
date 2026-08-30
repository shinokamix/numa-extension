import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  type RouterHistory,
} from '@tanstack/react-router';

import { OptionsLayout } from '../ui/OptionsLayout';
import { settingsSections } from './settingsSections';

export function createOptionsRouter(history?: RouterHistory) {
  const rootRoute = createRootRoute({
    component: () => <OptionsLayout sections={settingsSections} />,
  });
  const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
  });

  return createRouter({ routeTree: rootRoute.addChildren([settingsRoute]), history });
}

export const optionsRouter = createOptionsRouter(
  typeof document === 'undefined' ? undefined : createHashHistory(),
);
