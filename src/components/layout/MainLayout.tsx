import React, { useRef, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import DrawerContainer from './drawer/DrawerContainer';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    const toggleDrawer = (drawerId: string) => {
        setActiveDrawer(prev => (prev === drawerId ? null : drawerId));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                drawerRef.current &&
                !drawerRef.current.contains(event.target as Node)
            ) {
                setActiveDrawer(null);
            }
        };

        if (activeDrawer) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDrawer]);

    return (
        <div className="main-layout">
            {/* Левый сайдбар */}
            <div className="sidebar-wrapper">
                <Sidebar
                    activeDrawer={activeDrawer}
                    toggleDrawer={toggleDrawer}
                />
            </div>

            {/* Дровер, встроенный в поток */}
            {activeDrawer && (
                <div className="drawer-wrapper" ref={drawerRef}>
                    <DrawerContainer
                        activeDrawer={activeDrawer}
                        onClose={() => setActiveDrawer(null)}
                    />
                </div>
            )}

            {/* Основной контент */}
            <div className="main-content">{children}</div>

            <style>{`
            .main-layout {
                display: flex;
                width: 100vw;
                height: 100vh;
                background-color: #e6eff2;
                overflow: hidden;
            }

            .sidebar-wrapper {
                width: 48px;
                flex-shrink: 0;
            }

            .drawer-wrapper {
                width: 250px;
                flex-shrink: 0;
                z-index: 1;
                transition: width 0.3s ease;
                background: white;
                box-shadow: -2px 0 5px rgba(0,0,0,0.1);
            }

            .main-content {
                flex: 1;
                padding: 1rem 1rem 1rem 48px;
                overflow-y: auto;
                transition: all 0.3s ease;
            }
        `}</style>
        </div>
    );
};

export default MainLayout;
