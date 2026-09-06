import { GhostIcon } from 'lucide-react';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';

export function NotFoundPage() {
  return (
    <Empty aria-labelledby="not-found-heading" className="min-h-80">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GhostIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle id="not-found-heading">404 - Page Not Found</EmptyTitle>
        <EmptyDescription>The page you are looking for does not exist.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
