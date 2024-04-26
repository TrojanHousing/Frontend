
//individualProperty.js
import React, { useState } from 'react';
import Comments from './Comment';
import Navbar from './Navbar';
import PropertyComment from './PropertyComment';
import './IndividualProperty.css';
import property1 from './images/property1.jpg';
import property2 from './images/property2.jpg';
import property3 from './images/property3.jpg';
import property4 from './images/property4.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath, faRulerCombined } from '@fortawesome/free-solid-svg-icons'



const IndividualProperty = () => {
  const [isSaved, setIsSaved] = useState(false);
  const username = "sample@usc.edu"; // Username for all properties

  const handleSaveProperty = () => {
    //update isSaved state when the user clicks the "Save" button
    setIsSaved(!isSaved);
  };

  const [expandImages, setExpandImages] = useState(false); // new state for toggling image display

  const toggleImages = () => {
    setExpandImages(!expandImages);
  };

  //sample property data (replace with actual data from the backend)
  const property = {
    id: 1,
    name: 'Luxury Apartment',
    images: [
      { url: property1 },
      { url: property2 },
      { url: property3 },
      { url: property4 },
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
      username: 'Annie. P',
      date: '2023-05-20',
      rating: '★★★★☆',
      text: 'Great property with amazing amenities!',
    },
    {
      username: 'Jeff. H',
      date: '2024-01-16',
      rating: '★☆☆☆☆',
      text: 'The landlord is terrible. This is the absolute worst place I have ever had the misfortune of living in.',
    },
    {
      username: 'Trojan T.',
      date: '2023-09-29',
      rating: '★★★☆☆',
      text: 'It is ok, but the price is too high for what you get.',
    },

  ];

  const visibleImages = expandImages ? property.images : property.images.slice(0, 3);


  return (
    <div className="individual-property">
      <div className="navigation-bar">
        {/* nav bar */}
      </div>
      <div className="property-header">
        <h1>{property.name}</h1>
        <button className="save-button" onClick={handleSaveProperty}>
          {isSaved ? 'Unsave' : 'Save'}
        </button>
      </div>
      <div className="property-images">
        {visibleImages.map((image, index) => (
          <img key={index} src={image.url} alt={`Property Image ${index + 1}`} />
        ))}
        <button className="toggle-button" onClick={toggleImages}>
          {expandImages ? 'Show Less' : 'Show More'}
        </button>
      </div>
      <div className="property-details">
        <div className="property-info">
          <h2>Trojan Apartments</h2>
          <p>Price: {property.price}</p>
          <p>Address: {property.address}</p>
          <div className="property-specs">
            <div className="property-spec">
              <FontAwesomeIcon icon={faBed} style={{ color: "#990000", }} />
              <p>{property.beds} Beds</p>
            </div>
            <div className="property-spec">
              <FontAwesomeIcon icon={faBath} style={{ color: "#990000", }} />
              <p>{property.baths} Baths</p>
            </div>
            <div className="property-spec">
              <FontAwesomeIcon icon={faRulerCombined} style={{ color: "#990000", }} />
              <p>{property.sqft} sqft</p>
            </div>
          </div>
          <p>Details: {property.description}</p>
        </div>
        <div className="property-comments">
          <h2>Comments</h2>
          {propertyComments.map((comment, index) => (
            <PropertyComment key={index} comment={comment} />
          ))}
        </div>
      </div>
    </div >
  );
};

export default IndividualProperty;
