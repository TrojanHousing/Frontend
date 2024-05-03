
//individualProperty.js
import React, { useState, useEffect } from 'react';
import Comments from './Comment';
import Navbar from './Navbar';
import PropertyComment from './PropertyComment';
import './IndividualProperty.css';
import property1 from './images/property1.jpg';
import property2 from './images/property2.jpg';
import property3 from './images/property3.jpg';
import property4 from './images/property4.jpg';
import { useAuth } from './AuthenticationState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath, faRulerCombined } from '@fortawesome/free-solid-svg-icons'



const IndividualProperty = () => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const username = "sample@usc.edu"; // Username for all properties
  const [expandImages, setExpandImages] = useState(false); // new state for toggling image display
  const [visibleImages, setVisibleImages] = useState([]);
  const [newRating, setNewRating] = useState('');
  const [propertyComments, setPropertyComments] = useState([
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
  ]);



  const handleSaveProperty = () => {
    //update isSaved state when the user clicks the "Save" button
    setIsSaved(!isSaved);
  };

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

  useEffect(() => {
    const updateVisibleImages = () => {
      const pageWidth = window.innerWidth;
      const imageWidth = 430;
      const imageHeight = 275;
      const maxImages = Math.floor(pageWidth / imageWidth);

      const newVisibleImages = expandImages
        ? property.images
        : property.images.slice(0, maxImages);
      setVisibleImages(newVisibleImages);
    };

    updateVisibleImages();
    window.addEventListener('resize', updateVisibleImages);

    return () => {
      window.removeEventListener('resize', updateVisibleImages);
    };
  }, [property.images, expandImages]);

  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      const currentDate = new Date().toISOString().slice(0, 10);
      const formattedRating = '★'.repeat(newRating) + '☆'.repeat(5 - newRating);
      const newPropertyComment = {
        username: user?.email,
        date: currentDate,
        rating: formattedRating,
        text: newComment,
      };
      setPropertyComments([...propertyComments, newPropertyComment]);
      setNewComment('');
      setNewRating(0);
    }
  };



  return (
    <div>
      <div className="navbar-div">
        <Navbar />
      </div>
      <div className="individual-property">
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
          {property.images.length > visibleImages.length && (
            <button className="toggle-button" onClick={toggleImages}>
              {expandImages ? 'Show Less' : 'Show More'}
            </button>
          )}
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
            <div className="add-comment">
              <div className="rating-input">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < newRating ? 'selected' : ''}`}
                    onClick={() => setNewRating(index + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={handleCommentChange}
              ></textarea>
              <button onClick={handleSubmitComment}>Submit</button>
            </div>
          </div>
        </div>
      </div >
    </div>
  );
};

export default IndividualProperty;
