import { Outlet } from '@tanstack/react-router';

import { SettingsHeader } from './settings-header';
import { SettingsSidebar } from './settings-sidebar';
import { SidebarInset, SidebarProvider } from './sidebar';

export function SettingsLayout() {
  return (
    <SidebarProvider>
      <SettingsSidebar />
      <SidebarInset aria-label="Settings content">
        <SettingsHeader />
        <div className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
