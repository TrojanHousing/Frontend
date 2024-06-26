import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PropertyGrid.css';

const properties = [
    { id: 1, address: '2424 Wilshire Blvd, Los Angeles, CA 90057', priceRange: 'Studio - 1 Bed | $1,540 - $2,405', type: 'studio', image: 'https://stuho.com/Pictures/large/Bcode/179-01.jpg' },
    { id: 2, address: '160 S Virgil Ave, Los Angeles, CA 90004', priceRange: 'Studio - 2 Beds | $1,795 - $3,599', type: 'two-bedroom', image: 'https://images1.apartments.com/i2/7tik3SMavPOhunRdLafVjyZDvLR_WJUUsgf-0zUS3Tc/117/jasper-los-angeles-ca-building-photo.jpg?p=1' },
    { id: 3, address: '1026 S Broadway, Los Angeles, CA 90015', priceRange: 'Studio - 3 Beds | $2,021 - $3,956', type: 'three-bedroom', image: 'https://images1.forrent.com/i2/svw9T78cf2kvquZTciDUaLOh0dZjzpGDA7ACnQzS4b4/117/image.jpg' }
];

const PropertyGrid = ({ searchTerm, filters }) => {

    const [properties, setProperties] = useState([]);

    const filteredProperties = properties.filter(property => {
        return property.address.toLowerCase().includes(searchTerm) &&
            (!filters.type || property.type === filters.type);
    });

    useEffect(() => {
        // Fetch the filtered properties from the backend
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:8080/properties/filterProperties', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filters),
                });

                if (response.ok) {
                    const data = await response.json();
                    setProperties(data);
                } else {
                    console.error('Error fetching properties:', response.status);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [filters]);


    return (
        <div className="property-grid">
            {filteredProperties.map((property) => (
                <div className="property-item" key={property.id}>
                    {/*<Link to={`/IndividualProperty/${property.id}`}>*/}
                    <Link to={`/IndividualProperty/${property.propertyID}`}>
                        <img src={property.topPicture} alt={`View ${property.address}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        <div className="address">{property.address}</div>
                        <div className="price-range">${property.price}</div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default PropertyGrid;