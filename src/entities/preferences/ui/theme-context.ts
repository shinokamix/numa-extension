import { createContext } from 'react';

import type { ThemePreference } from '../model/theme-preference';

export type SetTheme = (theme: string) => void;

export interface ThemeContextValue {
  theme: ThemePreference;
  setTheme: SetTheme;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
