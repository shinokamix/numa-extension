import { createRootRoute } from '@tanstack/react-router';

import { NotFoundPage } from '@/pages/not-found';
import { SettingsLayout } from '@/pages/settings';

export const Route = createRootRoute({
  component: SettingsLayout,
  notFoundComponent: NotFoundPage,
});
