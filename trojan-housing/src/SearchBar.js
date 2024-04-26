import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearchChange }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = event => {
        event.preventDefault();
        onSearchChange(searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="search-bar-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    {/* Icon can be added here */}
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;
