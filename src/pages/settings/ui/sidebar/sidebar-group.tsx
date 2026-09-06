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

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  );
}

export { SidebarGroup };
