export const THEME_PREFERENCES = ['system', 'light', 'dark'] as const;

export type ThemePreference = (typeof THEME_PREFERENCES)[number];

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
