import React from 'react';
import Comments from './Comment';

// Sample properties data
const properties = [
  {
    name: 'Park Wilshire',
    address: '2424 Wilshire Blvd, Los Angeles, CA 90057',
    priceRange: 'Studio - 1 Bed | $1,540 - $2,405',
    link: '/properties/park-wilshire',
  },
  {
    name: 'Violet on Virgil',
    address: '160 S Virgil Ave, Los Angeles, CA 90004',
    priceRange: 'Studio - 2 Beds | $1,795 - $3,599',
    link: '/properties/violet-on-virgil',
  },
  {
    name: 'Broadway Palace',
    address: '1026 S Broadway, Los Angeles, CA 90015',
    priceRange: 'Studio - 3 Beds | $2,021 - $3,956',
    link: '/properties/broadway-palace',
  }
];

function UserProfile() {
  return (
    <div className="user-profile">
      <div className="user-info">
        <img src="user-avatar.jpg" alt="User" className="user-avatar" />
        <h1>user@usc.edu</h1>
      </div>
      <div className="saved-properties">
        <h2>Saved Properties</h2>
        <div className="properties-list">
          {properties.map((property, index) => (
            <div className="property-item" key={index}>
              <img src={`${property.link}.jpg`} alt={property.name} />
              <h3><a href={property.link}>{property.name}</a></h3>
              <p>{property.address}</p>
              <p>{property.priceRange}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="user-comments">
        <Comments />
      </div>
    </div>
  );
}

export default UserProfile;
