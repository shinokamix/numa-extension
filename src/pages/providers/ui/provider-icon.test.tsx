import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ProviderIcon } from './provider-icon';

describe('provider icon', () => {
  it('renders the color Gemini mark', () => {
    const markup = renderToStaticMarkup(<ProviderIcon providerId="gemini" />);

    expect(markup).toContain('data-provider="gemini"');
    expect(markup).toContain('viewBox="0 0 296 298"');
    expect(markup).toContain('#3689FF');
    expect(markup).toContain('#F6C013');
    expect(markup).toContain('#FA4340');
    expect(markup).toContain('#14BB69');
  });
});
