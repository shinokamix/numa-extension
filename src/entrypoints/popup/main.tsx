import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/shared/styles';

import { App } from './ui/App';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('Popup root element was not found.');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
