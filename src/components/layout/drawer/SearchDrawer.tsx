import React, { useState } from 'react';
import searchIcon from '@/assets/images/Search.png';

interface SearchDrawerProps {
    onClose: () => void;
}

const SearchDrawer: React.FC<SearchDrawerProps> = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Здесь будет логика поиска
        console.log('Search query:', searchQuery);
    };

    return (
        <>
            <div className="navigation-drawer__header">
                <h2 className="navigation-drawer__title">
                    <img src={searchIcon} alt="Поиск" style={{ width: '20px', marginRight: '8px' }} />
                    Поиск
                </h2>
            </div>

            <form onSubmit={handleSearch}>
                <div className="search-form">
                    <div className="search-form__input-wrapper">
                        <div className="search-form__icon">
                            <img src={searchIcon} alt="Поиск" />
                        </div>
                        <input
                            type="text"
                            className="search-form__input"
                            placeholder="Введите текст для поиска..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default SearchDrawer;
