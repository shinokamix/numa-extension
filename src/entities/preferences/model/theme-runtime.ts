import type { ThemePreference } from './theme-preference';
import { loadTheme } from './theme-storage';

export const SYSTEM_DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export type ResolvedTheme = Exclude<ThemePreference, 'system'>;

interface ThemeRoot {
  classList: Pick<DOMTokenList, 'toggle'>;
  style: Pick<CSSStyleDeclaration, 'colorScheme'>;
}

interface ResolveThemeOptions {
  theme: ThemePreference;
  systemPrefersDark: boolean;
}

interface ApplyThemeOptions extends ResolveThemeOptions {
  root: ThemeRoot;
}

interface InitializeThemeOptions {
  root?: ThemeRoot;
  systemPrefersDark?: boolean;
}

export function resolveTheme({ theme, systemPrefersDark }: ResolveThemeOptions): ResolvedTheme {
  return theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;
}

export function applyTheme({ root, theme, systemPrefersDark }: ApplyThemeOptions): void {
  const resolvedTheme = resolveTheme({ theme, systemPrefersDark });

  root.classList.toggle('dark', resolvedTheme === 'dark');
  root.style.colorScheme = resolvedTheme;
}

export async function initializeTheme({
  root = document.documentElement,
  systemPrefersDark,
}: InitializeThemeOptions = {}): Promise<ThemePreference> {
  if (systemPrefersDark === undefined) {
    const mediaQuery = window.matchMedia(SYSTEM_DARK_MEDIA_QUERY);
    systemPrefersDark = mediaQuery.matches;
  }

  const theme = await loadTheme();

  applyTheme({ root, theme, systemPrefersDark });
  return theme;
}
