// Source code: https://github.com/shadcn-ui/ui/blob/f31ed81983653919dd4fe77aee4b4859f610f1dc/apps/v4/registry/new-york-v4/ui/select.tsx
// Adaptations:
// 1. Promoted the component to Shared after Providers became its second independent consumer.
// 2. Reused the project's aggregate radix-ui dependency and Shared cn public API.
// 3. Kept only the Select parts required by the current settings pages.
// 4. Adjusted semantic styling, formatting, and lint compliance for Numa.

import { Select as SelectPrimitive } from 'radix-ui';
import type * as React from 'react';

type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;

function SelectValue(props: SelectValueProps) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

export { SelectValue };
