// Source code: https://ui.shadcn.com/r/styles/new-york-v4/sidebar.json
// Adaptations:
// 1. Removed cookie persistence so state remains local.
// 2. Fixed the primitive to Numa's left inset layout with desktop icon collapse and a mobile sheet.
// 3. Removed unused input, skeleton, rail, action, badge, and nested-menu APIs.
// 4. Replaced shadcn useIsMobile with the shared ReactUse useMediaQuery source.
// 5. Removed the unused React Server Components directive.
// 6. Adjusted the source to project formatting and lint rules.

import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
}

export { SidebarContent };
