// Source code: https://ui.shadcn.com/r/styles/new-york-v4/sidebar.json
// Adaptations:
// 1. Removed cookie persistence so state remains local.
// 2. Fixed the primitive to Numa's left inset layout with desktop icon collapse and a mobile sheet.
// 3. Removed unused input, skeleton, rail, action, badge, and nested-menu APIs.
// 4. Replaced shadcn useIsMobile with the shared ReactUse useMediaQuery source.
// 5. Removed the unused React Server Components directive.
// 6. Adjusted the source to project formatting and lint rules.

import { Slot } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { useSidebar } from './sidebar-context';

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}) {
  const Comp = asChild ? Slot.Root : 'button';
  const { isMobile, state } = useSidebar();
  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-active={isActive}
      className={cn(
        'peer/menu-button flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )}
      {...props}
    />
  );

  if (tooltip === undefined) {
    return button;
  }

  const tooltipProps = typeof tooltip === 'string' ? { children: tooltip } : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
}

export { SidebarMenuButton };
