import { Button } from '@/shared/ui/button';

import type { ProviderId } from '../model/provider';
import { DeleteProviderDialog } from './delete-provider-dialog';
import { DialogClose, DialogFooter } from './dialog';
import { Spinner } from './spinner';

interface ProviderDialogFooterProps {
  apiKeyChanged: boolean;
  editing: boolean;
  isSaving: boolean;
  onDeleted: () => void;
  providerId: ProviderId | null;
}

export function ProviderDialogFooter({
  apiKeyChanged,
  editing,
  isSaving,
  onDeleted,
  providerId,
}: ProviderDialogFooterProps) {
  return (
    <DialogFooter>
      {editing && providerId !== null ? (
        <DeleteProviderDialog providerId={providerId} onDeleted={onDeleted} />
      ) : null}
      <div className="flex flex-col-reverse gap-2 sm:ml-auto sm:flex-row">
        <DialogClose asChild>
          <Button disabled={isSaving} size="sm" type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button
          disabled={isSaving || providerId === null || (editing && !apiKeyChanged)}
          size="sm"
          type="submit"
        >
          {isSaving ? <Spinner aria-label="Saving provider" data-icon="inline-start" /> : null}
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </DialogFooter>
  );
}
