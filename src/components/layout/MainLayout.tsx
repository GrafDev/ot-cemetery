// Исправленный MainLayout.tsx
import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';  // Добавляем импорт observer
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

    // Функция для открытия/закрытия drawer
    const toggleDrawer = (drawerId: string) => {
        // Если уже открыт этот drawer - закрываем его
        if (activeDrawer === drawerId) {
            setActiveDrawer(null);
        } else {
            // Иначе открываем выбранный drawer
            setActiveDrawer(drawerId);
        }
    };

    // Функция для закрытия drawer
    const closeDrawer = () => {
        setActiveDrawer(null);
    };

    // Обработчик клика для документа
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Не закрываем drawer, если клик был по sidebar или внутри drawer
            if (
                sidebarRef.current && sidebarRef.current.contains(event.target as Node) ||
                drawerRef.current && drawerRef.current.contains(event.target as Node)
            ) {
                return;
            }

            // В остальных случаях закрываем drawer
            if (activeDrawer) {
                closeDrawer();
            }
        };

        // Добавляем слушатель событий
        document.addEventListener('mousedown', handleClickOutside);

        // Очищаем слушатель при размонтировании
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDrawer]);

    return (
        <div className="main-layout">
            {/* Левый сайдбар - отображаем только если пользователь аутентифицирован */}
            {isAuthenticated && (
                <div className="main-layout__sidebar-wrapper" ref={sidebarRef}>
                    <Sidebar
                        activeDrawer={activeDrawer}
                        toggleDrawer={toggleDrawer}
                        closeDrawer={closeDrawer} // Передаем функцию закрытия drawer
                    />
                </div>
            )}

            {/* Добавляем drawer - отображаем только если пользователь аутентифицирован */}
            {isAuthenticated && (
                <div
                    className={`drawer-container ${activeDrawer ? 'drawer-container--active' : 'drawer-container--closed'}`}
                    ref={drawerRef}
                >
                    {/* Затемнение фона при открытом drawer (для мобильной версии) */}
                    <div
                        className={`drawer-backdrop ${activeDrawer ? '' : 'drawer-backdrop--hidden'}`}
                        onClick={closeDrawer}
                    ></div>

                    {/* Navigation Drawer */}
                    <div className={`navigation-drawer ${activeDrawer === 'navigation' ? 'navigation-drawer--active' : ''}`}>
                        <NavigationDrawer onClose={closeDrawer} />
                    </div>

                    {/* Search Drawer */}
                    <div className={`search-drawer ${activeDrawer === 'search' ? 'search-drawer--active' : ''}`}>
                        <SearchDrawer onClose={closeDrawer} />
                    </div>

                    {/* Settings Drawer */}
                    <div className={`settings-drawer ${activeDrawer === 'settings' ? 'settings-drawer--active' : ''}`}>
                        <SettingsDrawer onClose={closeDrawer} />
                    </div>
                </div>
            )}

            {/* Основной контент */}
            <div className="main-layout__content">{children}</div>
        </div>
    );
};

export default observer(MainLayout);
