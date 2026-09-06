import { useQuery } from '@tanstack/react-query';
import { ChevronRightIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/shared/ui/empty';

import { providerQueries } from '../api/provider-queries';
import { PROVIDER_LABEL_BY_ID } from '../model/provider';
import { Alert, AlertDescription } from './alert';
import { ProviderDialog } from './provider-dialog';
import { ProviderIcon } from './provider-icon';
import { Skeleton } from './skeleton';

export function ProvidersPage() {
  const {
    data: configuration = null,
    isError: hasLoadError,
    isPending: isLoading,
    refetch: refetchProviders,
  } = useQuery(providerQueries.configuration());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  const openAddDialog = () => {
    setDialogMode('add');
    setIsDialogOpen(true);
  };

  const openEditDialog = () => {
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  return (
    <section aria-labelledby="providers-heading" className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-6">
        <h2 id="providers-heading" className="text-lg font-semibold">
          Providers
        </h2>
        <Button
          disabled={isLoading || hasLoadError || configuration !== null}
          onClick={openAddDialog}
        >
          <PlusIcon data-icon="inline-start" />
          Add provider
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-16 w-full" />
      ) : hasLoadError ? (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Could not load providers.</span>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void refetchProviders();
              }}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      ) : configuration === null ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>No providers</EmptyTitle>
            <EmptyDescription>Add a provider to connect Numa to an AI model.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Button
          aria-label={`Edit ${PROVIDER_LABEL_BY_ID[configuration.providerId]} provider`}
          className="w-full justify-between"
          type="button"
          variant="outline"
          onClick={openEditDialog}
        >
          <span className="flex items-center gap-2.5">
            <ProviderIcon data-icon="inline-start" providerId={configuration.providerId} />
            <span>{PROVIDER_LABEL_BY_ID[configuration.providerId]}</span>
          </span>
          <ChevronRightIcon aria-hidden="true" data-icon="inline-end" />
        </Button>
      )}

      <ProviderDialog
        key={`${dialogMode}-${configuration?.providerId ?? 'new'}`}
        configuration={configuration}
        mode={dialogMode}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
