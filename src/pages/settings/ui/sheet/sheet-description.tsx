// Source code: https://ui.shadcn.com/r/styles/new-york-v4/sheet.json
// Adaptations:
// 1. Installed the primitive with its owning Page.
// 2. Pruned the API to the left-side Settings sheet.
// 3. Removed the unused React Server Components directive.
// 4. Adjusted the source to project formatting and lint rules.

import { Dialog as SheetPrimitive } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export { SheetDescription };
