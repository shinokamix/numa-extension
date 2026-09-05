import { useLocation } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';

import { settingsNavigation } from '../model/navigation';
import { SidebarTrigger } from './sidebar';

export function SettingsHeader() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const title = settingsNavigation.find((item) => item.to === pathname)?.title;

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 px-4">
      <SidebarTrigger aria-label="Toggle settings navigation" />
      <ChevronRightIcon className="size-3.5 text-muted-foreground" aria-hidden="true" />
      <h1 className="text-sm font-medium">{title}</h1>
    </header>
  );
}
