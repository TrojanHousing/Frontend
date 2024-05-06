import React, { useState } from 'react';
import './FilterPanel.css';

function FilterPanel({ onFilterChange }) {

    const [filters, setFilters] = useState({
        beds: '',
        price: '',
        distance: '',
    });

    // Function to handle individual filter changes
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));

        // Send the updated filters to the backend
        const searchCriteria = [
            { filterKey: name, operation: "eq", value: value },
        ];
        onFilterChange(searchCriteria);
    };


    // Function to reset all filters
    const resetFilters = () => {
        onFilterChange({
            beds: '',
            price: '',
            distance: '',
        });
        onFilterChange({
            beds: '',
            price: '',
            distance: '',
        });
    };

    return (
        <div className="filter-panel">
            <select name="beds" onChange={handleFilterChange} className="filter-select">
                <option value="">Bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <select name="price" onChange={handleFilterChange} className="filter-select">
                <option value="">Price Range</option>
                <option value="2000">$2,000 max</option>
                <option value="4000">$4,000 max</option>
                <option value="6000">$6,000 max</option>
                <option value="8000">$8,000 max</option>
                <option value="10000">$10,000 max</option>
                <option value="15000">$15,000 max</option>
            </select>
            <select name="distance" onChange={handleFilterChange} className="filter-select">
                <option value="">Distance from USC</option>
                <option value="0.5">0.5 miles</option>
                <option value="1">1 mile</option>
                <option value="1.5">1.5 miles</option>
                <option value="2">2 miles</option>
            </select>
            <div className="filter-actions">
                <button onClick={resetFilters} className="filter-button">Clear Filters</button>
            </div>
        </div>
    );
}

export default FilterPanel;
