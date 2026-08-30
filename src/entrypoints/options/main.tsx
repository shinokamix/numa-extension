import { RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider, initializeTheme } from '@/entities/preferences';
import '@/shared/styles';

import { router } from './router';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('Options root element was not found.');
}

const initialTheme = await initializeTheme();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider initialTheme={initialTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
