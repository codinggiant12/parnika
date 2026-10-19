import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UIProvider } from './context/UIContext';
import { StoreProvider } from './context/StoreContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UIProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </UIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
