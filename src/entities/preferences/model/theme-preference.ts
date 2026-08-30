export type ThemePreference = 'system' | 'light' | 'dark';

export const DEFAULT_THEME: ThemePreference = 'system';

export function normalizeThemePreference(value: unknown): ThemePreference {
  switch (value) {
    case 'system':
    case 'light':
    case 'dark':
      return value;
    default:
      return DEFAULT_THEME;
  }
}
