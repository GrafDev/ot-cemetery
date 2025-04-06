import React from 'react';
import ReactDOM from 'react-dom/client';
import {StoreProvider} from './stores/storeContext';
import App from './App';
import './index.css';
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StoreProvider>
            <App/>
            <Toaster position="top-right"/>
        </StoreProvider>
    </React.StrictMode>
);
