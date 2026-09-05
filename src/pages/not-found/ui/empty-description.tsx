// Source code: https://ui.shadcn.com/r/styles/new-york-v4/empty.json
// Adaptations:
// 1. Split EmptyDescription into its own file to satisfy Numa's component-per-file rule.
// 2. Rendered a semantic paragraph and removed unused link styles.
import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib/cn';

function EmptyDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="empty-description"
      className={cn('text-sm/relaxed text-muted-foreground', className)}
      {...props}
    />
  );
}

export { EmptyDescription };
