import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import './i18n.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext.tsx';
import { RestaurantsProvider } from './contexts/RestaurantsContext.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <CurrentUserProvider>
                <RestaurantsProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </RestaurantsProvider>
            </CurrentUserProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
