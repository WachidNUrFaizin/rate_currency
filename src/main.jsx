import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CurrencyProvider from './context/CurrencyContext';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CurrencyProvider>
            <App />
        </CurrencyProvider>
    </StrictMode>
);