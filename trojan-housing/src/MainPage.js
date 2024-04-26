import React, { useState } from 'react';
import Navbar from './Navbar';
import PropertyGrid from './PropertyGrid';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import './MainPage.css';

function MainPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        type: '',
        price: '',
        bedrooms: '',
        distance: '',
    });

    const handleSearchChange = term => {
        setSearchTerm(term.toLowerCase());
    };

    const handleFilterChange = newFilters => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    return (
        <div className="main-page">
            <Navbar />
            <div className="hero-section">
                <SearchBar onSearchChange={handleSearchChange} />
            </div>
            <FilterPanel onFilterChange={handleFilterChange} />
            <PropertyGrid searchTerm={searchTerm} filters={filters} />
        </div>
    );
}

export default MainPage;
