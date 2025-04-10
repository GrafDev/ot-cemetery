import React, { createContext, useContext } from 'react';
import { rootStore, RootStore } from './rootStore';

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <StoreContext.Provider value={rootStore}>
            {children}
            </StoreContext.Provider>
    );
};

export const useStores = (): RootStore => {
    const context = useContext(StoreContext);
    if (context === null) {
        throw new Error('useStores должен использоваться внутри StoreProvider');
    }
    return context;
};

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
