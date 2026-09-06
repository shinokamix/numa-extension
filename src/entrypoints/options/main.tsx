import '@/shared/styles';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { initializeTheme, ThemeProvider } from '@/entities/preferences';

import { router } from './router';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('Options root element was not found.');
}

const initialTheme = await initializeTheme();
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider initialTheme={initialTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
