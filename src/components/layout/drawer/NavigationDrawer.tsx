import React from 'react';
import { useNavigate } from 'react-router-dom';

// Импортируем иконки из вашей папки assets
import companyIcon from '@/assets/images/Company.png';
import contractorIcon from '@/assets/images/Contractor.png';
import accountIcon from '@/assets/images/Account.png';

interface NavigationDrawerProps {
    onClose: () => void;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ onClose }) => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    return (
        <>
            <div className="navigation-drawer__header">
                <h2 className="navigation-drawer__title">Oak Tree Cemetery</h2>
                <div className="navigation-drawer__subtitle">Process Manager</div>
            </div>

            <div
                className="button button--filled drawer-button"
                onClick={() => handleNavigation('/organizations')}
            >
                <div className="button__icon">
                    <img src={companyIcon} alt="Organizations" />
                </div>
                <span className="button__label">Organizations</span>
            </div>

            <div
                className="button button--outline drawer-button"
                onClick={() => handleNavigation('/contractors')}
            >
                <div className="button__icon">
                    <img src={contractorIcon} alt="Contractors" />
                </div>
                <span className="button__label">Contractors</span>
            </div>

            <div
                className="button button--outline drawer-button"
                onClick={() => handleNavigation('/clients')}
            >
                <div className="button__icon">
                    <img src={accountIcon} alt="Clients" />
                </div>
                <span className="button__label">Clients</span>
            </div>
        </>
    );
};

export default NavigationDrawer;
