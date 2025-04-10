import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Sidebar from './Sidebar';
import NavigationDrawer from "@/components/layout/drawer/NavigationDrawer.tsx";
import SearchDrawer from "@/components/layout/drawer/SearchDrawer.tsx";
import SettingsDrawer from "@/components/layout/drawer/SettingsDrawer.tsx";
import { useAuthStore } from "@/stores/storeContext.tsx";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    const toggleDrawer = (drawerId: string) => {
        if (activeDrawer === drawerId) {
            setActiveDrawer(null);
        } else {
            setActiveDrawer(drawerId);
        }
    };

    const closeDrawer = () => {
        setActiveDrawer(null);
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current && sidebarRef.current.contains(event.target as Node) ||
                drawerRef.current && drawerRef.current.contains(event.target as Node)
            ) {
                return;
            }

            if (activeDrawer) {
                closeDrawer();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDrawer]);

    return (
        <div className="main-layout">
            {isAuthenticated && (
                <div className="main-layout__sidebar-wrapper" ref={sidebarRef}>
                    <Sidebar
                        activeDrawer={activeDrawer}
                        toggleDrawer={toggleDrawer}
                        closeDrawer={closeDrawer}
                    />
                </div>
            )}

            {isAuthenticated && (
                <div
                    className={`drawer-container ${activeDrawer ? 'drawer-container--active' : 'drawer-container--closed'}`}
                    ref={drawerRef}
                >
                    <div
                        className={`drawer-backdrop ${activeDrawer ? '' : 'drawer-backdrop--hidden'}`}
                        onClick={closeDrawer}
                    ></div>

                    <div className={`navigation-drawer ${activeDrawer === 'navigation' ? 'navigation-drawer--active' : ''}`}>
                        <NavigationDrawer onClose={closeDrawer} />
                    </div>

                    <div className={`search-drawer ${activeDrawer === 'search' ? 'search-drawer--active' : ''}`}>
                        <SearchDrawer onClose={closeDrawer} />
                    </div>

                    <div className={`settings-drawer ${activeDrawer === 'settings' ? 'settings-drawer--active' : ''}`}>
                        <SettingsDrawer onClose={closeDrawer} />
                    </div>
                </div>
            )}

            <div className="main-layout__content">{children}</div>
        </div>
    );
};

export default observer(MainLayout);
