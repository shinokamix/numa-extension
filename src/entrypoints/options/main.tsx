import { RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/shared/styles';

import { router } from './router';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('Options root element was not found.');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
