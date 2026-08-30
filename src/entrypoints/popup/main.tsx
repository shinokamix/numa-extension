import '@/shared/styles';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { initializeTheme, ThemeProvider } from '@/entities/preferences';

import { App } from './ui/app';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('Popup root element was not found.');
}

const initialTheme = await initializeTheme();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider initialTheme={initialTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
