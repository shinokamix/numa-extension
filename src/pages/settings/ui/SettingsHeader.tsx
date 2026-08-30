import { Separator } from './Separator';
import { SidebarTrigger } from './Sidebar';

export function SettingsHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
      <SidebarTrigger aria-label="Toggle settings navigation" />
      <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
      <h1 id="general-settings-heading" className="text-sm font-medium">
        General
      </h1>
    </header>
  );
}
