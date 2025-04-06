import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AppRoutes from './routes/AppRoutes';
import MainLayout from './components/layout/MainLayout';

const App: React.FC = () => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeAuth = async () => {
            // Здесь может быть логика инициализации
            setIsInitialized(true);
        };

        initializeAuth();
    }, []);

    if (!isInitialized) {
        return (
            <div className="center-screen">
                <div className="spinner" />
                <style>{`
                    .center-screen {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #f5f5f5;
                    }

                    .spinner {
                        width: 48px;
                        height: 48px;
                        border: 4px solid #ccc;
                        border-top-color: #333;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <Router>
            <MainLayout>
                <AppRoutes />
            </MainLayout>
        </Router>
    );
};

export default observer(App);
