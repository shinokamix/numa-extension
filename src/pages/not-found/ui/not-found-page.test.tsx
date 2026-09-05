import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { NotFoundPage } from './not-found-page';

describe('not found page', () => {
  it('renders the not found message', () => {
    const markup = renderToStaticMarkup(<NotFoundPage />);

    expect(markup).toContain('404');
    expect(markup).toContain('Page Not Found');
    expect(markup).toContain('data-slot="empty-icon"');
  });
});
