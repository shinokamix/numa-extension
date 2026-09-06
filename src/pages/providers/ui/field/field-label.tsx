// Source code: https://github.com/shadcn-ui/ui/blob/f31ed81983653919dd4fe77aee4b4859f610f1dc/apps/v4/registry/new-york-v4/ui/field.tsx
// Adaptations:
// 1. Kept the primitive local to the Providers Page, its only current owner.
// 2. Kept only FieldGroup, Field, FieldLabel, FieldDescription, and FieldError.
// 3. Reused the project's aggregate radix-ui dependency for accessible labels.
// 4. Adjusted semantic styling, formatting, and lint compliance for Numa.

import { Label as LabelPrimitive } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

function FieldLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="field-label"
      className={cn('text-sm leading-none font-medium', className)}
      {...props}
    />
  );
}

export { FieldLabel };
