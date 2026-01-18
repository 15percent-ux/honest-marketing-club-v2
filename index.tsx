import React from 'react';
import { createRoot } from 'react-dom/client';
// Removed .tsx extension from import to ensure standard module resolution and avoid type resolution issues
import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}