// Source code: https://github.com/siberiacancode/reactuse/blob/12c166588f23c77a06857389f9370d413d41d7b9/packages/core/src/hooks/useMediaQuery/useMediaQuery.ts
// Adaptations:
// 1. Promoted the hook to Shared after reuse by the Settings Page and Preferences Entity.
// 2. Adjusted the source to project formatting and lint rules.

import { useCallback, useSyncExternalStore } from 'react';

const getServerSnapshot = () => false;

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = globalThis.matchMedia(query);
      mediaQuery.addEventListener('change', callback);

      return () => {
        mediaQuery.removeEventListener('change', callback);
      };
    },
    [query],
  );
  const getSnapshot = () => globalThis.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
