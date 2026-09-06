// Source code: https://ui.shadcn.com/r/styles/new-york-v4/sheet.json
// Adaptations:
// 1. Installed the primitive with its owning Page.
// 2. Pruned the API to the left-side Settings sheet.
// 3. Removed the unused React Server Components directive.
// 4. Adjusted the source to project formatting and lint rules.

import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  );
}

export { SheetHeader };
