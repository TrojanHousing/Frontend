
//individualProperty.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comment';
import Navbar from './Navbar';
import PropertyComment from './PropertyComment';
import './IndividualProperty.css';
import { useAuth } from './AuthenticationState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRulerCombined } from '@fortawesome/free-solid-svg-icons';

const IndividualProperty = () => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [expandImages, setExpandImages] = useState(false);
  const [visibleImages, setVisibleImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
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
  const [property, setProperty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8080/properties/filterProperties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([]), // Pass an empty array to fetch all properties
        });

        if (response.ok) {
          const data = await response.json();
          const filteredProperty = data.find((property) => property.propertyID === parseInt(id));
          if (filteredProperty) {
            setProperty(filteredProperty);
          } else {
            console.error('Property not found');
          }
        } else {
          console.error('Error fetching properties:', response.status);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [id]);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:8080/getImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `property_id=${property.propertyID}`,
      });

      if (response.ok) {
        const data = await response.json();
        setAllImages(data);  // Store all images here
        setVisibleImages(data.slice(0, 3));  // Initialize visibleImages with only the first few images
      } else {
        console.error('Error fetching images:', response.status);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {

    if (property) {
      fetchImages();
    }
  }, [property]);

  useEffect(() => {
    if (!expandImages) {
      setVisibleImages(allImages.slice(0, 3)); // Show only the first few images
    } else {
      setVisibleImages(allImages); // Show all images
    }
  }, [expandImages, allImages]);


  const toggleImages = () => {
    setExpandImages(!expandImages);
  };


  const handleSaveProperty = () => {
    // update isSaved state when the user clicks the "Save" button
    setIsSaved(!isSaved);
  };


  const splitDescription = (description) => {
    return description.split('.').map((sentence, index) => (
      <React.Fragment key={index}>
        • {sentence.trim()}.<br /><br />
      </React.Fragment>
    ));
  };





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
      {property && (
        <div className="individual-property">
          <div className="property-header">
            <h1>{property.name}</h1>
            <button className="save-button" onClick={handleSaveProperty}>
              {isSaved ? 'Unsave' : 'Save'}
            </button>
          </div>
          <div className="property-images">
            {visibleImages.map((image, index) => (
              <img key={index} src={image} alt={`Property Image ${index + 1}`} />
            ))}
            <button className="toggle-button" onClick={toggleImages}>
              {expandImages ? "Show Less" : "Show More"}
            </button>
          </div>




          <div className="property-details">
            <div className="property-info">
              <h2>{property.name}</h2>
              <p>Price: {property.price}</p>
              <p>Address: {property.address}</p>
              <div className="property-specs">
                <div className="property-spec">
                  <FontAwesomeIcon icon={faBed} style={{ color: "#990000" }} />
                  <p>{property.beds} Beds</p>
                </div>
                <div className="property-spec">
                  <FontAwesomeIcon icon={faBath} style={{ color: "#990000" }} />
                  <p>{property.baths} Baths</p>
                </div>
              </div>
              <p>{splitDescription(property.description)}</p>
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
        </div>
      )
      }
    </div >
  );
};

export default IndividualProperty;