// Source code: https://github.com/shadcn-ui/ui/blob/f31ed81983653919dd4fe77aee4b4859f610f1dc/apps/v4/registry/new-york-v4/ui/dialog.tsx
// Adaptations:
// 1. Kept the primitive local to the Providers Page, its only current owner.
// 2. Reused the project's aggregate radix-ui dependency and Shared cn public API.
// 3. Removed unused Dialog parts and adjusted formatting and lint compliance for Numa.
// 4. Added a closeDisabled option for dialogs that must stay open during an in-flight write.

import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

export { DialogFooter };
