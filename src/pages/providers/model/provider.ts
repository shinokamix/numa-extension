export const PROVIDERS = [
  {
    apiKeyLabel: 'Gemini API key',
    apiKeyUrl: 'https://aistudio.google.com/app/apikey',
    id: 'gemini',
    label: 'Google Gemini',
  },
] as const;

export type ProviderId = (typeof PROVIDERS)[number]['id'];

export const PROVIDER_LABEL_BY_ID = Object.fromEntries(
  PROVIDERS.map(({ id, label }) => [id, label]),
) as Record<ProviderId, string>;

export const PROVIDER_API_KEY_LABEL_BY_ID = Object.fromEntries(
  PROVIDERS.map(({ apiKeyLabel, id }) => [id, apiKeyLabel]),
) as Record<ProviderId, string>;

export const PROVIDER_API_KEY_URL_BY_ID = Object.fromEntries(
  PROVIDERS.map(({ apiKeyUrl, id }) => [id, apiKeyUrl]),
) as Record<ProviderId, string>;

export interface ProviderConfig {
  apiKey: string;
  providerId: ProviderId;
}

export const DEFAULT_PROVIDER: ProviderId = 'gemini';

export function normalizeProviderId(value: unknown): ProviderId | null {
  const provider = PROVIDERS.find(({ id }) => id === value);

  return provider?.id ?? null;
}

export function normalizeProviderConfig(value: unknown): ProviderConfig | null {
  if (typeof value !== 'object' || value === null) {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const providerId = normalizeProviderId(candidate.providerId);
  const apiKey = typeof candidate.apiKey === 'string' ? candidate.apiKey.trim() : '';

  if (providerId === null || apiKey.length === 0) {
    return null;
  }

  return { apiKey, providerId };
}

export function resolveProviderApiKey(value: string, currentApiKey?: string): string | null {
  const apiKey = value.trim();

  if (apiKey.length > 0) {
    return apiKey;
  }

  return currentApiKey ?? null;
}
