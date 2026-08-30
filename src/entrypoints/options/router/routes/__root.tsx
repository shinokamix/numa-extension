import { createRootRoute } from '@tanstack/react-router';

import { SettingsLayout } from '@/pages/settings';

export const Route = createRootRoute({
  component: SettingsLayout,
});
