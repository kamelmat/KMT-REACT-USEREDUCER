import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  
import { BrowserRouter } from 'react-router-dom';  
import AppRoutes from './routes'; 
import { StoreProvider } from './hooks/useGlobalReducer';  

const Main = () => {
    return ( 
            <StoreProvider> 
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </StoreProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
