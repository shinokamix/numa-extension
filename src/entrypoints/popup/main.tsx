import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider, initializeTheme } from '@/entities/preferences';
import '@/shared/styles';

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
