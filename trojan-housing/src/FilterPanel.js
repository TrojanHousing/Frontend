import React from 'react';
import './FilterPanel.css';

function FilterPanel({ onFilterChange }) {
    // Function to handle individual filter changes
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        onFilterChange({ [name]: value });
    };

    // Function to reset all filters
    const resetFilters = () => {
        onFilterChange({
            type: '',
            bedrooms: '',
            price: '',
            distance: '',
            // Add more filters as needed
        });
    };

    return (
        <div className="filter-panel">
            <select name="type" onChange={handleFilterChange} className="filter-select">
                <option value="">House Type</option>
                <option value="shared">Shared House</option>
                <option value="condo">Condo</option>
                <option value="duplex">Duplex</option>
                <option value="standalone">Standalone</option>
                {/* Add more options as needed */}
            </select>
            <select name="bedrooms" onChange={handleFilterChange} className="filter-select">
                <option value="">Bedrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                {/* Add more options as needed */}
            </select>
            <select name="price" onChange={handleFilterChange} className="filter-select">
                <option value="">Price Range</option>
                <option value="1000">$1,000 max</option>
                <option value="2000">$2,000 max</option>
                <option value="3000">$3,000 max</option>
                <option value="4000">$4,000 max</option>
                {/* Add more options as needed */}
            </select>
            <select name="distance" onChange={handleFilterChange} className="filter-select">
                <option value="">Distance from USC</option>
                <option value="1">1 mile</option>
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                {/* Add more options as needed */}
            </select>
            {/* Add more selects for additional filters as needed */}
            <div className="filter-actions">
                <button onClick={resetFilters} className="filter-button">Clear Filters</button>
            </div>
        </div>
    );
}

export default FilterPanel;
