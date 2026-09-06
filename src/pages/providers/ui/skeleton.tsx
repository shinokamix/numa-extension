// Source code: https://github.com/shadcn-ui/ui/blob/f31ed81983653919dd4fe77aee4b4859f610f1dc/apps/v4/registry/new-york-v4/ui/skeleton.tsx
// Adaptations:
// 1. Kept the primitive local to the Providers Page, its only current owner.
// 2. Reused Numa's Shared cn public API and adjusted formatting for project rules.

import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md bg-accent', className)}
      {...props}
    />
  );
}

export { Skeleton };
