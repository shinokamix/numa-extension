// Source code: https://github.com/shadcn-ui/ui/blob/f31ed81983653919dd4fe77aee4b4859f610f1dc/apps/v4/registry/new-york-v4/ui/select.tsx
// Adaptations:
// 1. Promoted the component to Shared after Providers became its second independent consumer.
// 2. Reused the project's aggregate radix-ui dependency and Shared cn public API.
// 3. Kept only the Select parts required by the current settings pages.
// 4. Adjusted semantic styling, formatting, and lint compliance for Numa.

import { Select as SelectPrimitive } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content>;

function SelectContent({ className, children, ...props }: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-32 overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          className,
        )}
        position="popper"
        sideOffset={4}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export { SelectContent };
