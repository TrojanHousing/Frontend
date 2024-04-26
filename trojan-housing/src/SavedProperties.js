import React from 'react';
import './PropertyGrid.css';
import { Link } from 'react-router-dom';



// Sample properties data, pull with SQL 
const properties = [
  {
    address: '2424 Wilshire Blvd, Los Angeles, CA 90057',
    priceRange: 'Studio - 1 Bed | $1,540 - $2,405',
    link: '/properties/2424-wilshire',
  },
  {
    address: '160 S Virgil Ave, Los Angeles, CA 90004',
    priceRange: 'Studio - 2 Beds | $1,795 - $3,599',
    link: '/properties/160-s-virgil',
  },
  {
    address: '1026 S Broadway, Los Angeles, CA 90015',
    priceRange: 'Studio - 3 Beds | $2,021 - $3,956',
    link: '/properties/1026-s-broadway',
  }
];

const PropertyGrid = () => {
  return (
    <div className="property-grid">
      {properties.map((property, index) => (
        <div className="property-item" key={index}>
          <Link to={`/IndividualProperty`}>
            <div className="address">{property.address}</div>
            <div className="price-range">{property.priceRange}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;