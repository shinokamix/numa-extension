import { use } from 'react';

import type { ThemeContextValue } from './theme-context';
import { ThemeContext } from './theme-context';

export function useTheme(): ThemeContextValue {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }

  return context;
}
