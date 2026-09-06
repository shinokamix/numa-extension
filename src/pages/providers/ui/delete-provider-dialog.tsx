import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useState } from 'react';

import { Button } from '@/shared/ui/button';

import { providerQueries } from '../api/provider-queries';
import { removeProvider } from '../api/provider-storage';
import type { ProviderId } from '../model/provider';
import { PROVIDER_LABEL_BY_ID } from '../model/provider';
import { Alert, AlertDescription } from './alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Spinner } from './spinner';

interface DeleteProviderDialogProps {
  onDeleted?: () => void;
  providerId: ProviderId;
}

export function DeleteProviderDialog({ onDeleted, providerId }: DeleteProviderDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    isError: hasDeleteError,
    isPending: isDeleting,
    mutate: remove,
    reset: resetDelete,
  } = useMutation({
    mutationFn: removeProvider,
    networkMode: 'always',
    onSuccess: () => {
      queryClient.setQueryData(providerQueries.configuration().queryKey, null);
      setOpen(false);
      onDeleted?.();
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (isDeleting) {
      return;
    }

    if (!nextOpen) {
      resetDelete();
    }

    setOpen(nextOpen);
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    remove();
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button size="sm" type="button" variant="ghost">
          <Trash2Icon data-icon="inline-start" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {PROVIDER_LABEL_BY_ID[providerId]}?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the saved API key from Numa. You can add the provider again later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {hasDeleteError ? (
          <Alert variant="destructive">
            <AlertDescription>Could not delete the provider. Try again.</AlertDescription>
          </Alert>
        ) : null}

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button disabled={isDeleting} type="button" variant="outline">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={isDeleting}
              type="button"
              variant="destructive"
              onClick={handleDelete}
            >
              {isDeleting ? (
                <Spinner aria-label="Deleting provider" data-icon="inline-start" />
              ) : (
                <Trash2Icon data-icon="inline-start" />
              )}
              {isDeleting ? 'Deleting...' : 'Delete provider'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
