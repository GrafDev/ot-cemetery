// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../stores/storeContext';
import ProtectedRoute from '../components/routing/ProtectedRoute';
import LoginPage from "@/pages/LoginPage.tsx";
import CompanyPage from "@/pages/CompanyPage.tsx";
import CompaniesList from "@/pages/CompaniesList.tsx"; // Импортируем новый компонент
import ContractorsPage from "@/pages/ContractorsPage.tsx";
import ClientsPage from "@/pages/ClientsPage.tsx";

const AppRoutes: React.FC = () => {
    const authStore = useAuthStore();

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    authStore.isAuthenticated
                        ? <Navigate to="/organizations" replace />
                        : <LoginPage />
                }
            />
            <Route
                path="/organizations"
                element={
                    <ProtectedRoute>
                        <CompaniesList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/company/:id"
                element={
                    <ProtectedRoute>
                        <CompanyPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/contractors"
                element={
                    <ProtectedRoute>
                        <ContractorsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/clients"
                element={
                    <ProtectedRoute>
                        <ClientsPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/organizations" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default observer(AppRoutes);
