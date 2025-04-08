import React, { useState } from 'react';
import settingsIcon from '@/assets/images/Settings.png';

interface SettingsDrawerProps {
    onClose: () => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = () => {
    const [language, setLanguage] = useState<string>('ru');
    const [theme, setTheme] = useState<string>('light');

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value);
    };

    return (
        <>
            <div className="navigation-drawer__header">
                <h2 className="navigation-drawer__title">
                    <img src={settingsIcon} alt="Настройки" style={{ width: '20px', marginRight: '8px' }} />
                    Настройки
                </h2>
            </div>

            <div className="settings-section">
                <h3 className="settings-section__title">Интерфейс</h3>

                <div className="settings-item">
                    <label className="settings-item__label">Язык:</label>
                    <select
                        className="settings-item__select"
                        value={language}
                        onChange={handleLanguageChange}
                        disabled
                    >
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <div className="settings-item">
                    <label className="settings-item__label">Тема:</label>
                    <select
                        className="settings-item__select"
                        value={theme}
                        onChange={handleThemeChange}
                        disabled
                    >
                        <option value="light">Светлая</option>
                        <option value="dark">Темная</option>
                    </select>
                </div>

                <div className="settings-note">
                    <small className="text-muted">Настройки будут доступны в следующих версиях</small>
                </div>
            </div>
        </>
    );
};

export default SettingsDrawer;
