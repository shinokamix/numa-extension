import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { useMediaQuery } from '@/shared/lib/use-media-query';

import type { ThemePreference } from '../model/theme-preference';
import { normalizeThemePreference } from '../model/theme-preference';
import { applyTheme, SYSTEM_DARK_MEDIA_QUERY } from '../model/theme-runtime';
import { saveTheme, watchTheme } from '../model/theme-storage';
import type { SetTheme } from './theme-context';
import { ThemeContext } from './theme-context';

interface ThemeProviderProps extends PropsWithChildren {
  initialTheme: ThemePreference;
}

type PersistTheme = (value: string) => Promise<void>;

const persistTheme: PersistTheme = async (value) => {
  const theme = normalizeThemePreference(value);

  try {
    await saveTheme(theme);
  } catch {
    // Keep the last persisted theme active when storage is unavailable.
  }
};

const updateTheme: SetTheme = (value) => {
  void persistTheme(value);
};

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState(initialTheme);
  const systemPrefersDark = useMediaQuery(SYSTEM_DARK_MEDIA_QUERY);

  useEffect(() => watchTheme(setTheme), []);
  useEffect(() => {
    applyTheme({ root: document.documentElement, theme, systemPrefersDark });
  }, [systemPrefersDark, theme]);

  const value = useMemo(() => ({ theme, setTheme: updateTheme }), [theme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
