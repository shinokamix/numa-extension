import { createFileRoute } from '@tanstack/react-router';

import { GeneralSettingsPage } from '@/pages/general-settings';

export const Route = createFileRoute('/')({
  component: GeneralSettingsPage,
});
