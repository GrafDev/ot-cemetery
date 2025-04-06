import React from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({ isOpen }) => {
    return (
        <div
            className="search-drawer"
            style={{
                left: isOpen ? '80px' : '-250px'
            }}
        >
            <div className="search-content">
                <h2>Поиск</h2>
                <div className="search-input-wrapper">
                    <IoSearch className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Введите запрос..."
                    />
                </div>
            </div>

            <style>{`
                .search-drawer {
                    position: fixed;
                    top: 0;
                    left: -250px;
                    width: 250px;
                    height: 100vh;
                    background-color: white;
                    transition: left 0.3s ease-in-out;
                    z-index: 10;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    overflow: hidden;
                }

                .search-content {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    padding: 1rem;
                }

                .search-content h2 {
                    font-size: 1.125rem;
                    font-weight: bold;
                    margin: 0;
                }

                .search-input-wrapper {
                    position: relative;
                }

                .search-icon {
                    position: absolute;
                    top: 50%;
                    left: 0.75rem;
                    transform: translateY(-50%);
                    color: #6b7280;
                    pointer-events: none;
                }

                .search-input {
                    width: 100%;
                    padding: 0.5rem 0.5rem 0.5rem 2.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 0.95rem;
                }

                .search-input:focus {
                    outline: none;
                    border-color: #3182ce;
                    box-shadow: 0 0 0 1px #3182ce;
                }
            `}</style>
        </div>
    );
};

export default SearchDrawer;
