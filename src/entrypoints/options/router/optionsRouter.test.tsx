import { createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { createOptionsRouter } from './optionsRouter';

describe('optionsRouter', () => {
  it('renders the settings layout at the default options URL', async () => {
    const router = createOptionsRouter(createMemoryHistory({ initialEntries: ['/'] }));
    await router.load();

    const markup = renderToStaticMarkup(<RouterProvider router={router} />);

    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain('>General<');
    expect(markup).toContain('id="general-settings-heading"');
    expect(markup).not.toMatch(/provider|credential/i);
  });
});
