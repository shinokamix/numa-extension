import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';

import { providerQueries } from '../api/provider-queries';
import { saveProvider } from '../api/provider-storage';
import type { ProviderConfig, ProviderId } from '../model/provider';
import {
  DEFAULT_PROVIDER,
  normalizeProviderId,
  PROVIDER_API_KEY_LABEL_BY_ID,
  resolveProviderApiKey,
} from '../model/provider';
import { Alert, AlertDescription } from './alert';
import { Dialog, DialogContent } from './dialog';
import { ProviderDialogFooter } from './provider-dialog-footer';
import { ProviderDialogHeader } from './provider-dialog-header';
import { ProviderFormFields } from './provider-form-fields';

interface ProviderDialogProps {
  configuration: ProviderConfig | null;
  mode: 'add' | 'edit';
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

async function persistProvider(configuration: ProviderConfig): Promise<ProviderConfig> {
  await saveProvider(configuration);

  return configuration;
}

function resolveDialogApiKey(
  apiKey: string,
  configuration: ProviderConfig | null,
  editing: boolean,
  providerId: ProviderId | null,
) {
  const currentApiKey =
    editing && configuration?.providerId === providerId ? configuration.apiKey : undefined;

  return resolveProviderApiKey(apiKey, currentApiKey);
}

export function ProviderDialog({ configuration, mode, onOpenChange, open }: ProviderDialogProps) {
  const [apiKey, setApiKey] = useState('');
  const editing = mode === 'edit';
  const [providerId, setProviderId] = useState<ProviderId | null>(
    editing ? (configuration?.providerId ?? DEFAULT_PROVIDER) : null,
  );
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    isError: hasSaveError,
    isPending: isSaving,
    mutate: save,
    reset: resetSave,
  } = useMutation({
    mutationFn: persistProvider,
    networkMode: 'always',
    onSuccess: (nextConfiguration) => {
      queryClient.setQueryData(providerQueries.configuration().queryKey, nextConfiguration);
      resetForm(nextConfiguration);
      onOpenChange(false);
    },
  });

  const resetForm = (nextConfiguration = configuration) => {
    setApiKey('');
    setApiKeyError(null);
    setProviderId(editing ? (nextConfiguration?.providerId ?? DEFAULT_PROVIDER) : null);
    resetSave();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isSaving) {
      return;
    }

    if (!nextOpen) {
      resetForm();
    }

    onOpenChange(nextOpen);
  };

  const handleProviderChange = (value: string) => {
    const nextProviderId = normalizeProviderId(value);

    if (nextProviderId !== null) {
      setProviderId(nextProviderId);
      resetSave();
    }
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    setApiKeyError(null);
    resetSave();
  };

  const handleDeleted = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const resolvedApiKey = resolveDialogApiKey(apiKey, configuration, editing, providerId);

    if (providerId === null) return;

    if (resolvedApiKey === null) {
      setApiKeyError(`Enter a ${PROVIDER_API_KEY_LABEL_BY_ID[providerId]}.`);
      return;
    }

    setApiKeyError(null);
    save({ apiKey: resolvedApiKey, providerId });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent closeDisabled={isSaving} className="sm:max-w-md">
        <ProviderDialogHeader editing={editing} providerId={providerId} />

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <ProviderFormFields
            apiKey={apiKey}
            configuredProviderIds={configuration === null ? [] : [configuration.providerId]}
            editing={editing}
            error={apiKeyError}
            providerId={providerId}
            saving={isSaving}
            onApiKeyChange={handleApiKeyChange}
            onProviderChange={handleProviderChange}
          />

          {hasSaveError ? (
            <Alert variant="destructive">
              <AlertDescription>Could not save the provider. Try again.</AlertDescription>
            </Alert>
          ) : null}

          <ProviderDialogFooter
            apiKeyChanged={apiKey.trim() !== ''}
            editing={editing}
            isSaving={isSaving}
            providerId={providerId}
            onDeleted={handleDeleted}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
