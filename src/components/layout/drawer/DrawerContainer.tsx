import React from 'react';
import NavigationDrawer from './NavigationDrawer';
import SearchDrawer from './SearchDrawer';
import SettingsDrawer from './SettingsDrawer';

interface DrawerContainerProps {
    activeDrawer: string | null;
    onClose: () => void;
}

const DrawerContainer: React.FC<DrawerContainerProps> = ({ activeDrawer, onClose }) => {
    return (
        <>
            <NavigationDrawer isOpen={activeDrawer === 'navigation'} onClose={onClose} />
            <SearchDrawer isOpen={activeDrawer === 'search'} onClose={onClose} />
            <SettingsDrawer isOpen={activeDrawer === 'settings'} onClose={onClose} />

            {/* Затемнение фона при открытом drawer */}
            {activeDrawer && (
                <div
                    className="drawer-backdrop"
                    onClick={onClose}
                />
            )}

            <style>{`
                .drawer-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.6);
                    z-index: 5;
                    display: block;
                }

                @media (min-width: 768px) {
                    .drawer-backdrop {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

export default DrawerContainer;
