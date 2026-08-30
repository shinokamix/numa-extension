import { describe, expect, it } from 'vitest';

import { settingsNavigation } from './navigation';

describe('settingsNavigation', () => {
  it('defines General as the only top-level settings destination', () => {
    expect(settingsNavigation).toEqual([
      {
        id: 'general',
        title: 'General',
        to: '/',
        icon: 'settings',
      },
    ]);
  });
});
