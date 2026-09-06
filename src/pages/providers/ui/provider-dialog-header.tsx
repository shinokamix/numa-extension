import type { ProviderId } from '../model/provider';
import { PROVIDER_LABEL_BY_ID } from '../model/provider';
import { DialogDescription, DialogHeader, DialogTitle } from './dialog';
import { ProviderIcon } from './provider-icon';

interface ProviderDialogHeaderProps {
  editing: boolean;
  providerId: ProviderId | null;
}

export function ProviderDialogHeader({ editing, providerId }: ProviderDialogHeaderProps) {
  if (editing && providerId !== null) {
    return (
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <ProviderIcon className="size-5" providerId={providerId} />
          {PROVIDER_LABEL_BY_ID[providerId]}
        </DialogTitle>
        <DialogDescription>Manage provider credentials.</DialogDescription>
      </DialogHeader>
    );
  }

  return (
    <DialogHeader>
      <DialogTitle>Add provider</DialogTitle>
      <DialogDescription>Choose a provider and enter its API key.</DialogDescription>
    </DialogHeader>
  );
}
