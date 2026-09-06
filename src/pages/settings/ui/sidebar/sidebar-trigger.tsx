// Source code: https://ui.shadcn.com/r/styles/new-york-v4/sidebar.json
// Adaptations:
// 1. Removed cookie persistence so state remains local.
// 2. Fixed the primitive to Numa's left inset layout with desktop icon collapse and a mobile sheet.
// 3. Removed unused input, skeleton, rail, action, badge, and nested-menu APIs.
// 4. Replaced shadcn useIsMobile with the shared ReactUse useMediaQuery source.
// 5. Removed the unused React Server Components directive.
// 6. Adjusted the source to project formatting and lint rules.

import { PanelLeftIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

import { useSidebar } from './sidebar-context';

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export { SidebarTrigger };
