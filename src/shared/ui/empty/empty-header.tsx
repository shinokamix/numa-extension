// Source code: https://ui.shadcn.com/r/styles/new-york-v4/empty.json
// Adaptations:
// 1. Split EmptyHeader into its own file to satisfy Numa's component-per-file rule.
// 2. Promoted the primitive to Shared after two independent pages started using it.
// 3. Reused Numa's Shared cn public API.

import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib/cn';

function EmptyHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn('flex max-w-sm flex-col items-center gap-2 text-center', className)}
      {...props}
    />
  );
}

export { EmptyHeader };
