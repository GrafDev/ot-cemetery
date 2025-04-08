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
