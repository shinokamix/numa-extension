import { storage } from 'wxt/utils/storage';

import type { ProviderConfig } from '../model/provider';
import { normalizeProviderConfig } from '../model/provider';

const geminiProviderItem = storage.defineItem<unknown>('local:providers:gemini', {
  fallback: null,
});

export async function loadProvider(): Promise<ProviderConfig | null> {
  return normalizeProviderConfig(await geminiProviderItem.getValue());
}

export function saveProvider(config: ProviderConfig): Promise<void> {
  return geminiProviderItem.setValue(config);
}

export function removeProvider(): Promise<void> {
  return geminiProviderItem.removeValue();
}
