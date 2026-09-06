// Source code: https://ui.shadcn.com/r/styles/new-york-v4/sidebar.json
// Adaptations:
// 1. Extracted the shared context and hook so each sidebar component can live in its own file.

import * as React from 'react';

interface SidebarContextValue {
  state: 'expanded' | 'collapsed';
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (context === null) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

export { SidebarContext, useSidebar };
export type { SidebarContextValue };
