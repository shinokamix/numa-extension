import { ChevronRightIcon } from 'lucide-react';

import { SidebarTrigger } from './sidebar';

export function SettingsHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 px-4">
      <SidebarTrigger aria-label="Toggle settings navigation" />
      <ChevronRightIcon className="size-3.5 text-muted-foreground" aria-hidden="true" />
      <h1 id="general-settings-heading" className="text-sm font-medium">
        General
      </h1>
    </header>
  );
}
