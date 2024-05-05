import './PropertyGrid.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PropertyGrid = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/getSavedListings?userID=' + localStorage.getItem('id'))
      .then(response => response.json())
      .then(data => {
        setProperties(data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  return (
    <div className="property-grid">
      {properties.map((property, index) => (
        <div className="property-item" key={index}>
          <Link to={`/IndividualProperty/${property.propertyID}`}>
            <img src={property.topPicture} alt={`View ${property.address}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div className="address">{property.address}</div>
            <div className="price-range">{"$"+property.price}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;