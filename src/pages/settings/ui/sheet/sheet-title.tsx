// Source code: https://ui.shadcn.com/r/styles/new-york-v4/sheet.json
// Adaptations:
// 1. Installed the primitive with its owning Page.
// 2. Pruned the API to the left-side Settings sheet.
// 3. Removed the unused React Server Components directive.
// 4. Adjusted the source to project formatting and lint rules.

import { Dialog as SheetPrimitive } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export { SheetTitle };
