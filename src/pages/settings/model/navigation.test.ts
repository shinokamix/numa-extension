import { describe, expect, it } from 'vitest';

import { settingsNavigation } from './navigation';

describe('settingsNavigation', () => {
  it('defines the top-level settings destinations', () => {
    expect(settingsNavigation).toStrictEqual([
      {
        id: 'general',
        title: 'General',
        to: '/',
        icon: 'settings',
      },
      {
        id: 'providers',
        title: 'Providers',
        to: '/providers',
        icon: 'bot',
      },
    ]);
  });
});
