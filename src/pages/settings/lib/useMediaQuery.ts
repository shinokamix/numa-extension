// Source code: https://github.com/siberiacancode/reactuse/blob/main/packages/core/src/hooks/useMediaQuery/useMediaQuery.ts
// Adaptations: installed in the owning Page lib without a generated barrel and adjusted to project formatting and lint rules.
import { useCallback, useSyncExternalStore } from 'react';

const getServerSnapshot = () => false;

/**
 * @name useMediaQuery
 * @description Hook that manages a media query.
 * @browserapi window.matchMedia https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener('change', callback);
      return () => {
        matchMedia.removeEventListener('change', callback);
      };
    },
    [query],
  );

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
