// Source code: https://github.com/shadcn-ui/ui/blob/f31ed81983653919dd4fe77aee4b4859f610f1dc/apps/v4/registry/new-york-v4/ui/alert-dialog.tsx
// Adaptations:
// 1. Kept the primitive local to the Providers Page, its only current owner.
// 2. Reused the project's aggregate radix-ui dependency and Shared cn public API.
// 3. Kept only the parts required by provider deletion.
// 4. Adjusted semantic styling, formatting, and lint compliance for Numa.
// 5. Matched the stacking level used by the existing Settings overlays.

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export { AlertDialogDescription };
