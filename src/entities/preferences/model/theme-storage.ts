import { storage } from 'wxt/utils/storage';

import type { ThemePreference } from './theme-preference';
import { DEFAULT_THEME, normalizeThemePreference } from './theme-preference';

const themeItem = storage.defineItem<unknown>('local:preferences:theme', {
  fallback: DEFAULT_THEME,
});

type ThemeChangeListener = (theme: ThemePreference) => void;

export async function loadTheme(): Promise<ThemePreference> {
  try {
    const storedTheme = await themeItem.getValue();
    const theme = normalizeThemePreference(storedTheme);

    return theme;
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveTheme(theme: ThemePreference): Promise<void> {
  return themeItem.setValue(theme);
}

export function watchTheme(listener: ThemeChangeListener): () => void {
  return themeItem.watch((storedTheme) => {
    const theme = normalizeThemePreference(storedTheme);

    listener(theme);
  });
}
