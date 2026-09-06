// Source code: https://github.com/shadcn-ui/ui/blob/f31ed81983653919dd4fe77aee4b4859f610f1dc/apps/v4/registry/new-york-v4/ui/spinner.tsx
// Adaptations:
// 1. Kept the primitive local to the Providers Page, its only current owner.
// 2. Reused Numa's Shared cn public API and adjusted formatting for project rules.

import { Loader2Icon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      aria-label="Loading"
      role="status"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
