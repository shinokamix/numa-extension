import { describe, expect, it } from 'vitest';

import config from './wxt.config';

describe('WXT config', () => {
  it('defines the Numa extension metadata', () => {
    expect(config.manifest).toMatchObject({
      name: 'Numa',
      description: 'Translate selected text and ask AI about it.',
    });
  });
});
