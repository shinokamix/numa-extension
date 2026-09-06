// Source code: https://github.com/shadcn-ui/ui/blob/f31ed81983653919dd4fe77aee4b4859f610f1dc/apps/v4/registry/new-york-v4/ui/field.tsx
// Adaptations:
// 1. Kept the primitive local to the Providers Page, its only current owner.
// 2. Kept only FieldGroup, Field, FieldLabel, FieldDescription, and FieldError.
// 3. Reused the project's aggregate radix-ui dependency for accessible labels.
// 4. Adjusted semantic styling, formatting, and lint compliance for Numa.

import { Label as LabelPrimitive } from 'radix-ui';
import type * as React from 'react';

import { cn } from '@/shared/lib/cn';

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn('flex w-full flex-col gap-5', className)}
      {...props}
    />
  );
}

function Field({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="group"
      data-slot="field"
      className={cn('group/field flex w-full flex-col gap-2', className)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="field-label"
      className={cn('text-sm leading-none font-medium', className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      role="alert"
      data-slot="field-error"
      className={cn('text-sm text-destructive', className)}
      {...props}
    />
  );
}

export { Field, FieldDescription, FieldError, FieldGroup, FieldLabel };
