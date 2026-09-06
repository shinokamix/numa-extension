// Source code: https://ui.shadcn.com/r/styles/new-york-v4/empty.json
// Adaptations:
// 1. Split EmptyTitle into its own file to satisfy Numa's component-per-file rule.
// 2. Promoted the primitive to Shared after two independent pages started using it.
// 3. Rendered a semantic h2 and passed children explicitly for the accessibility lint rule.

import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib/cn';

function EmptyTitle({ children, className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="empty-title"
      className={cn('text-lg font-medium tracking-tight', className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export { EmptyTitle };
