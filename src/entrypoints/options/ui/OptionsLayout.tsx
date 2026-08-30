import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/ui/Sidebar';

export interface OptionsSection {
  readonly id: string;
  readonly title: string;
  readonly to: string;
}

function matchesSection(pathname: string, to: string) {
  if (to === '/') {
    return pathname === to;
  }

  const sectionPath = to.endsWith('/') ? to.slice(0, -1) : to;
  return pathname === sectionPath || pathname.startsWith(`${sectionPath}/`);
}

export function OptionsLayout({ sections }: { readonly sections: readonly OptionsSection[] }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const activeSection = sections.find(({ to }) => matchesSection(pathname, to));
  const headingId = activeSection ? `${activeSection.id}-settings-heading` : undefined;

  return (
    <SidebarProvider open>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="p-4">
          <p className="text-lg font-semibold">Numa</p>
          <p className="text-sm text-sidebar-foreground/70">Settings</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <nav aria-label="Settings sections">
              <SidebarMenu>
                {sections.map((section) => (
                  <SidebarMenuItem key={section.id}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={section.to}
                        activeOptions={{ exact: section.to === '/', includeSearch: false }}
                        activeProps={{
                          'aria-current': 'page',
                          'data-active': true,
                        }}
                      >
                        <span>{section.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </nav>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href="https://github.com/shinokamix/numa-extension"
                  target="_blank"
                  rel="external noopener noreferrer"
                  aria-label="Numa on GitHub (opens in a new tab)"
                >
                  <ExternalLink aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset aria-labelledby={headingId}>
        <div className="flex h-14 items-center border-b px-4 md:hidden">
          <SidebarTrigger aria-label="Open settings navigation" />
        </div>
        <div className="p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            {activeSection && (
              <h1 id={headingId} className="text-2xl font-semibold">
                {activeSection.title}
              </h1>
            )}
            <div className={activeSection ? 'mt-6' : undefined}>
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
