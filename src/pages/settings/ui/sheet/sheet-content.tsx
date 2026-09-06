// Source code: https://ui.shadcn.com/r/styles/new-york-v4/sheet.json
// Adaptations:
// 1. Installed the primitive with its owning Page.
// 2. Pruned the API to the left-side Settings sheet.
// 3. Removed the unused React Server Components directive.
// 4. Adjusted the source to project formatting and lint rules.

import { Dialog as SheetPrimitive } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

import { SheetOverlay } from './sheet-overlay';

function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPrimitive.Portal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-full w-3/4 flex-col gap-4 border-r bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=closed]:slide-out-to-left data-[state=open]:animate-in data-[state=open]:duration-500 data-[state=open]:slide-in-from-left sm:max-w-sm',
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export { SheetContent };
