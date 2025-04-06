import React, { useEffect, useState } from 'react';

interface SettingsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isOpen }) => {
    const [isDark, setIsDark] = useState(false);

    // при монтировании — читаем тему из localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const useDark = storedTheme ? storedTheme === 'dark' : prefersDark;

        setIsDark(useDark);
        document.documentElement.dataset.theme = useDark ? 'dark' : 'light';
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        localStorage.setItem('theme', newTheme);
        document.documentElement.dataset.theme = newTheme;
    };

    return (
        <div
            className="settings-drawer"
            style={{ left: isOpen ? '80px' : '-250px' }}
        >
            <div className="settings-content">
                <h2 className="settings-title">Настройки</h2>

                <div className="setting-item">
                    <span>Темная тема</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isDark}
                            onChange={toggleTheme}
                        />
                        <span className="slider" />
                    </label>
                </div>

                <div className="setting-item">
                    <span>Уведомления</span>
                    <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider" />
                    </label>
                </div>
            </div>

            <style>{`
                .settings-drawer {
                    position: fixed;
                    top: 0;
                    left: -250px;
                    width: 250px;
                    height: 100vh;
                    background-color: white;
                    transition: left 0.3s ease;
                    box-shadow: 0 0 10px rgba(0,0,0,0.05);
                    z-index: 10;
                }

                .settings-content {
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .settings-title {
                    font-size: 1.125rem;
                    font-weight: bold;
                    margin: 0;
                }

                .setting-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.95rem;
                }

                .switch {
                    position: relative;
                    display: inline-block;
                    width: 42px;
                    height: 24px;
                }

                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: 0.4s;
                    border-radius: 34px;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 16px;
                    width: 16px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: 0.4s;
                    border-radius: 50%;
                }

                .switch input:checked + .slider {
                    background-color: #4f46e5;
                }

                .switch input:checked + .slider:before {
                    transform: translateX(18px);
                }
            `}</style>
        </div>
    );
};

export default SettingsDrawer;
