import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthStore} from "@/stores/storeContext.tsx";
import logoImage from '@/assets/images/Logo.png';
import companyButton from '@/assets/images/Company.png';
import searchButton from '@/assets/images/Search.png';
import logoutButton from '@/assets/images/SignOut.png';
import settingsButton from '@/assets/images/Settings.png';

interface SidebarProps {
    activeDrawer: string | null;
    toggleDrawer: (drawerId: string) => void;
    closeDrawer: () => void; // Добавляем функцию закрытия drawer
}

const Sidebar: React.FC<SidebarProps> = ({activeDrawer, toggleDrawer, closeDrawer}) => {
    const navigate = useNavigate();
    const authStore = useAuthStore();

    const handleLogout = () => {
        closeDrawer(); // Закрываем drawer перед выходом
        authStore.logout();
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <div className="sidebar__logo">
                    <img src={logoImage} alt="Project Knowledge Logo"/>
                </div>
                <div
                    className={`sidebar__icon-button ${activeDrawer === 'navigation' ? 'sidebar__icon-button--active' : ''}`}
                    onClick={() => toggleDrawer('navigation')}
                    aria-label="Navigation menu"
                >
                    <img className="sidebar__icon-button__img" src={companyButton} alt="Company Button"/>
                </div>
                <div
                    className={`sidebar__icon-button ${activeDrawer === 'search' ? 'sidebar__icon-button--active' : ''}`}
                    onClick={() => toggleDrawer('search')}
                    aria-label="Search"
                >
                    <img className="sidebar__icon-button__img" src={searchButton} alt="Search Button"/>
                </div>
            </div>

            <div className="sidebar__bottom">
                <div
                    className={`sidebar__icon-button ${activeDrawer === 'settings' ? 'sidebar__icon-button--active' : ''}`}
                    onClick={() => toggleDrawer('settings')}
                    aria-label="Settings"
                >
                    <img className="sidebar__icon-button__img" src={settingsButton} alt="Settings Button"/>
                </div>
                <div
                    className="sidebar__icon-button"
                    onClick={handleLogout}
                    aria-label="Logout"
                >
                    <img className="sidebar__icon-button__img" src={logoutButton} alt="Logout Button"/>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
