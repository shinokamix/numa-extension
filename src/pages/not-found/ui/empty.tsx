// Source code: https://ui.shadcn.com/r/styles/new-york-v4/empty.json
// Adaptations:
// 1. Kept only the Empty root in this file to satisfy Numa's component-per-file rule.
// 2. Placed the component inside its sole page owner and reused Numa's cn utility.
// 3. Rendered a semantic section element for the 404 message.
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
