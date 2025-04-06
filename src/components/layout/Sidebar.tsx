import React from 'react';
import { FaTree } from 'react-icons/fa';
import { IoBriefcase, IoSearch, IoSettings, IoLogOut } from 'react-icons/io5';

interface SidebarProps {
    activeDrawer: string | null;
    toggleDrawer: (drawerId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeDrawer, toggleDrawer }) => {
    return (
        <div className="sidebar">
            <div className="top">
                <div className="logo">
                    <FaTree size={40} color="white" />
                    <div className="logo-text">
                        <span>Oak Tree Cemetery</span>
                        <span className="subtext">Process Manager</span>
                    </div>
                </div>

                <button
                    className={`icon-button ${activeDrawer === 'navigation' ? 'active' : ''}`}
                    onClick={() => toggleDrawer('navigation')}
                >
                    <IoBriefcase size={24} />
                </button>

                <button
                    className={`icon-button ${activeDrawer === 'search' ? 'active' : ''}`}
                    onClick={() => toggleDrawer('search')}
                >
                    <IoSearch size={24} />
                </button>
            </div>

            <div className="bottom">
                <button
                    className={`icon-button ${activeDrawer === 'settings' ? 'active' : ''}`}
                    onClick={() => toggleDrawer('settings')}
                >
                    <IoSettings size={24} />
                </button>

                <button className="icon-button">
                    <IoLogOut size={24} />
                </button>
            </div>

            <div className="copyright">
                <small>All Funeral Services © 2015-2025</small>
            </div>

            <style>{`
                .sidebar {
                    width: 80px;
                    background-color: #333;
                    color: white;
                    height: 100vh;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.5rem 0;
                }

                .top, .bottom {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }

                .logo {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .logo-text {
                    margin-top: 0.5rem;
                    font-size: 10px;
                    color: white;
                }

                .logo-text .subtext {
                    color: #ccc;
                    font-size: 10px;
                }

                .icon-button {
                    background: transparent;
                    border: none;
                    padding: 0.5rem;
                    width: 100%;
                    color: white;
                    transition: background 0.2s;
                    cursor: pointer;
                }

                .icon-button:hover {
                    background-color: #444;
                }

                .icon-button.active {
                    background-color: #444;
                }

                .copyright {
                    font-size: 10px;
                    color: #aaa;
                    text-align: center;
                    padding: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default Sidebar;
