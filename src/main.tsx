import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from '@/providers/QueryProvider';
import { LenisProvider } from '@/providers/LenisProvider';
import App from '@/App';
import '@/styles/global.scss';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <LenisProvider>
          <App />
        </LenisProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
