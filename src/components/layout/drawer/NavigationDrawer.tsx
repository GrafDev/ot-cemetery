import React from 'react';
import { IoBusinessOutline, IoPersonOutline, IoPeopleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface NavigationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    return (
        <div
            className="navigation-drawer"
            style={{
                left: isOpen ? '80px' : '-250px'
            }}
        >
            <div className="drawer-item drawer-header">
                <IoBusinessOutline className="icon" />
                <span>Organizations</span>
            </div>

            <div className="drawer-item" onClick={() => handleNavigation('/contractors')}>
                <IoPersonOutline className="icon" />
                <span>Contractors</span>
            </div>

            <div className="drawer-item" onClick={() => handleNavigation('/clients')}>
                <IoPeopleOutline className="icon" />
                <span>Clients</span>
            </div>

            <style>{`
                .navigation-drawer {
                    position: fixed;
                    top: 0;
                    width: 250px;
                    height: 100vh;
                    background-color: white;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    z-index: 10;
                    transition: left 0.3s ease-in-out;
                    overflow: hidden;
                }

                .drawer-item {
                    display: flex;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .drawer-item:hover {
                    background-color: #f3f4f6; /* gray.100 */
                }

                .drawer-header {
                    background-color: #333;
                    color: white;
                    font-weight: bold;
                }

                .icon {
                    margin-right: 0.75rem;
                    font-size: 1.25rem;
                }

                span {
                    font-size: 1rem;
                }
            `}</style>
        </div>
    );
};

export default NavigationDrawer;
