// Source code: https://ui.shadcn.com/r/styles/new-york-v4/empty.json
// Adaptations:
// 1. Split EmptyHeader into its own file to satisfy Numa's component-per-file rule.
// 2. Placed the component inside its sole page owner and reused Numa's cn utility.
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
