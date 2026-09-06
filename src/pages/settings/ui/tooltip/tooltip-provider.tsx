// Source code: https://ui.shadcn.com/r/styles/new-york-v4/tooltip.json
// Adaptations:
// 1. Installed the primitive with its owning Page.
// 2. Removed the unused React Server Components directive.
// 3. Adjusted the source to project formatting and lint rules.

import { Tooltip as TooltipPrimitive } from 'radix-ui';
import type * as React from 'react';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

export { TooltipProvider };
