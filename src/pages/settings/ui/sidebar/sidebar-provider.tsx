// Source code: https://ui.shadcn.com/r/styles/new-york-v4/sidebar.json
// Adaptations:
// 1. Removed cookie persistence so state remains local.
// 2. Fixed the primitive to Numa's left inset layout with desktop icon collapse and a mobile sheet.
// 3. Removed unused input, skeleton, rail, action, badge, and nested-menu APIs.
// 4. Replaced shadcn useIsMobile with the shared ReactUse useMediaQuery source.
// 5. Removed the unused React Server Components directive.
// 6. Adjusted the source to project formatting and lint rules.

import * as React from 'react';

import { cn } from '@/shared/lib/cn';
import { useMediaQuery } from '@/shared/lib/use-media-query';

import { TooltipProvider } from '../tooltip';
import type { SidebarContextValue } from './sidebar-context';
import { SidebarContext } from './sidebar-context';

const MOBILE_QUERY = '(max-width: 767px)';

const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

const SIDEBAR_WIDTH = '16rem';

const SIDEBAR_WIDTH_ICON = '3rem';

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [openMobile, setOpenMobile] = React.useState(false);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = openProp ?? internalOpen;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const nextOpen = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(nextOpen);
      } else {
        setInternalOpen(nextOpen);
      }
    },
    [open, setOpenProp],
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((currentOpen) => !currentOpen);
    } else {
      setOpen((currentOpen) => !currentOpen);
    }
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleSidebar]);

  const state = open ? 'expanded' : 'collapsed';
  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({ state, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

export { SidebarProvider };
