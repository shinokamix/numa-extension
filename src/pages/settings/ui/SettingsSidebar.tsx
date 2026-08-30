import { Link } from '@tanstack/react-router';
import { CodeIcon, SettingsIcon, SparklesIcon } from 'lucide-react';

import { settingsNavigation } from '../model/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './Sidebar';

const navigationIcons = {
  settings: SettingsIcon,
} as const;

export function SettingsSidebar() {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-12 items-center gap-2 overflow-hidden px-2 group-data-[collapsible=icon]:px-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <SparklesIcon className="size-4" aria-hidden="true" />
          </div>
          <div className="min-w-0 leading-tight group-data-[collapsible=icon]:hidden">
            <p className="truncate font-semibold">Numa</p>
            <p className="truncate text-xs text-sidebar-foreground/70">Settings</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <nav aria-label="Settings pages">
            <SidebarMenu>
              {settingsNavigation.map((item) => {
                const Icon = navigationIcons[item.icon];

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive tooltip={item.title}>
                      <Link
                        to={item.to}
                        activeOptions={{ exact: true, includeSearch: false }}
                        activeProps={{
                          'aria-current': 'page',
                          'data-active': true,
                        }}
                        onClick={() => setOpenMobile(false)}
                      >
                        <Icon aria-hidden="true" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </nav>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Source code">
              <a
                href="https://github.com/shinokamix/numa-extension"
                target="_blank"
                rel="external noopener noreferrer"
                aria-label="Numa source code on GitHub (opens in a new tab)"
              >
                <CodeIcon aria-hidden="true" />
                <span>Source code</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
