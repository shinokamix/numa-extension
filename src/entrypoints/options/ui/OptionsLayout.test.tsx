import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { OptionsLayout, type OptionsSection } from './OptionsLayout';

const sections = [
  { id: 'general', title: 'General', to: '/' },
] as const satisfies readonly OptionsSection[];

async function renderOptionsLayout(pathname: string) {
  const rootRoute = createRootRoute({
    component: () => <OptionsLayout sections={sections} />,
  });
  const generalRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <p>Settings content</p>,
  });
  const unregisteredSectionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/unregistered',
    component: () => <p>Unregistered settings content</p>,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([generalRoute, unregisteredSectionRoute]),
    history: createMemoryHistory({ initialEntries: [pathname] }),
  });
  await router.load();

  return renderToStaticMarkup(<RouterProvider router={router} />);
}

describe('OptionsLayout', () => {
  it('renders the active routed section with accessible shadcn sidebar semantics', async () => {
    const markup = await renderOptionsLayout('/');

    expect(markup).toContain('aria-label="Settings sections"');
    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain('data-active="true"');
    expect(markup).toContain('>General<');
    expect(markup).toContain('Settings content');
    expect(markup).toContain('main data-slot="sidebar-inset"');
    expect(markup).toContain('aria-labelledby="general-settings-heading"');
    expect(markup).toContain('aria-label="Open settings navigation"');
    expect(markup).not.toMatch(/<a[^>]*>\s*<button/);
    expect(markup).not.toMatch(/Skills|Commands|Search|Support|Donate|disabled=""/i);
  });

  it('renders the GitHub resource without selecting a fallback section', async () => {
    const markup = await renderOptionsLayout('/unregistered');

    expect(markup).toContain('href="https://github.com/shinokamix/numa-extension"');
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="external noopener noreferrer"');
    expect(markup).toContain('Numa on GitHub (opens in a new tab)');
    expect(markup).toContain('Unregistered settings content');
    expect(markup).not.toContain('aria-current="page"');
    expect(markup).not.toContain('general-settings-heading');
  });
});
