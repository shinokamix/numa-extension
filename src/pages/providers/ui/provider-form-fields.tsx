import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import type { ProviderId } from '../model/provider';
import {
  PROVIDER_API_KEY_LABEL_BY_ID,
  PROVIDER_API_KEY_URL_BY_ID,
  PROVIDER_LABEL_BY_ID,
  PROVIDERS,
} from '../model/provider';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from './field';
import { Input } from './input';
import { ProviderIcon } from './provider-icon';

interface ProviderFormFieldsProps {
  apiKey: string;
  configuredProviderIds: readonly ProviderId[];
  error: string | null;
  editing: boolean;
  providerId: ProviderId | null;
  onApiKeyChange: (apiKey: string) => void;
  onProviderChange: (providerId: string) => void;
  saving: boolean;
}

export function ProviderFormFields({
  apiKey,
  configuredProviderIds,
  error,
  editing,
  providerId,
  onApiKeyChange,
  onProviderChange,
  saving,
}: ProviderFormFieldsProps) {
  const apiKeyDescriptionId = providerId === null ? undefined : 'provider-api-key-description';

  return (
    <FieldGroup>
      {!editing ? (
        <Field data-disabled={saving}>
          <FieldLabel htmlFor="provider">Provider</FieldLabel>
          <Select
            disabled={saving}
            value={providerId ?? undefined}
            onValueChange={onProviderChange}
          >
            <SelectTrigger id="provider" className="h-8 w-full">
              <SelectValue placeholder="Select provider">
                {providerId === null ? null : (
                  <span className="flex items-center gap-2">
                    <ProviderIcon providerId={providerId} />
                    <span>{PROVIDER_LABEL_BY_ID[providerId]}</span>
                  </span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {PROVIDERS.map(({ id, label }) => {
                  const configured = configuredProviderIds.includes(id);

                  return (
                    <SelectItem key={id} disabled={configured} value={id}>
                      <span className="flex items-center gap-2">
                        <ProviderIcon providerId={id} />
                        <span>{configured ? `${label} (added)` : label}</span>
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      ) : null}

      <Field data-disabled={saving || providerId === null} data-invalid={error !== null}>
        <FieldLabel htmlFor="provider-api-key">
          {providerId === null ? 'API key' : PROVIDER_API_KEY_LABEL_BY_ID[providerId]}
        </FieldLabel>
        <Input
          id="provider-api-key"
          aria-invalid={error !== null}
          aria-describedby={error === null ? apiKeyDescriptionId : 'provider-api-key-error'}
          autoComplete="off"
          disabled={saving || providerId === null}
          required={!editing}
          spellCheck={false}
          type="password"
          value={apiKey}
          onChange={(event) => {
            onApiKeyChange(event.target.value);
          }}
        />
        {providerId === null ? null : (
          <FieldDescription id={apiKeyDescriptionId}>
            {editing ? 'Leave blank to keep the current key. ' : null}
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href={PROVIDER_API_KEY_URL_BY_ID[providerId]}
              rel="noreferrer"
              target="_blank"
            >
              Get an API key in Google AI Studio.
            </a>
          </FieldDescription>
        )}
        {error === null ? null : <FieldError id="provider-api-key-error">{error}</FieldError>}
      </Field>
    </FieldGroup>
  );
}
