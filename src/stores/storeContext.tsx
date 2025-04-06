// src/stores/storeContext.tsx
import React, { createContext, useContext } from 'react';
import { rootStore, RootStore } from './rootStore';

// Создаем контекст React для стора
const StoreContext = createContext<RootStore | null>(null);

// Компонент Provider для предоставления сторов компонентам
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <StoreContext.Provider value={rootStore}>
            {children}
            </StoreContext.Provider>
    );
};

// Хук для использования сторов в компонентах
export const useStores = (): RootStore => {
    const context = useContext(StoreContext);
    if (context === null) {
        throw new Error('useStores должен использоваться внутри StoreProvider');
    }
    return context;
};

// Хуки для конкретных сторов
export const useAuthStore = () => {
    const { authStore } = useStores();
    return authStore;
};

export const useCompanyStore = () => {
    const { companyStore } = useStores();
    return companyStore;
};

export const useContactStore = () => {
    const { contactStore } = useStores();
    return contactStore;
};
