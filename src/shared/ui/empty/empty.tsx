// Source code: https://ui.shadcn.com/r/styles/new-york-v4/empty.json
// Adaptations:
// 1. Split Empty into its own file to satisfy Numa's component-per-file rule.
// 2. Promoted the primitive to Shared after two independent pages started using it.
// 3. Rendered a semantic section element.

import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib/cn';

function Empty({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      data-slot="empty"
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12',
        className,
      )}
      {...props}
    />
  );
}

export { Empty };
