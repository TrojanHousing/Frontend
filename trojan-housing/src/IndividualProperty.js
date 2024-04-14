//individualProperty.js
import React, { useState } from 'react';
import Comments from './Comment';
import Navbar from './Navbar';
import PropertyComment from './PropertyComment';
import './IndividualProperty.css';
import property1 from './images/property1.jpg';
import property2 from './images/property2.jpg';
import property3 from './images/property3.jpg';


const IndividualProperty = () => {
  const [isSaved, setIsSaved] = useState(false);
  const username = "sample@usc.edu"; // Username for all properties

  const handleSaveProperty = () => {
    //update isSaved state when the user clicks the "Save" button
    setIsSaved(!isSaved);
  };

  //sample property data (replace with actual data from the backend)
  const property = {
    id: 1,
    name: 'Luxury Apartment',
    images: [
      { url: property1 },
      { url: property2 },
      { url: property3 },
    ],
    price: '$2500/month',
    description: 'A luxurious apartment with modern amenities.',
    floorplan: '2 bedrooms, 2 bathrooms, 1200 sqft',
    address: '123 Main St, City, State 12345',
    beds: 2,
    baths: 2,
    sqft: 1200,
  };

  //examples of comments
  const propertyComments = [
    {
      username: 'user1',
      date: '2023-05-20',
      rating: '★★★★☆',
      text: 'Great property with amazing amenities!',
    },
    {
      username: 'user1',
      date: '2023-05-20',
      rating: '★★★★☆',
      text: 'Great property with amazing amenities!',
    },
    {
      username: 'user1',
      date: '2023-05-20',
      rating: '★★★★☆',
      text: 'Great property with amazing amenities!',
    },

  ];


  return (
    <div className="individual-property">
      <div className="navigation-bar">
        {/* nav bar */}
        <button onClick={handleSaveProperty}>
          {isSaved ? 'Unsave' : 'Save'}
        </button>
      </div>
      <div className="property-details">
        <h1>{property.name}</h1>
        <div className="property-images">
          {property.images.map((image, index) => (
            <img key={index} src={image.url} alt={`Property Image ${index + 1}`} />
          ))}
        </div>
        <div className="property-info">
          <p>Price: {property.price}</p>
          <p>Address: {property.address}</p>
          <div className="property-specs">
            <p>{property.beds} Beds</p>
            <p>{property.baths} Baths</p>
            <p>{property.sqft} sqft</p>
          </div>
          <p>Details: {property.description}</p>
        </div>
      </div>
      <div className="property-comments">
        <h2>Comments</h2>
        {propertyComments.map((comment, index) => (
          <PropertyComment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default IndividualProperty;