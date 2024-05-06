
//individualProperty.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

  //split description based on periods to make readable
  const splitDescription = (description) => {
    return description.split('.').map((sentence, index) => (
      <React.Fragment key={index}>
        • {sentence.trim()}.<br /><br />
      </React.Fragment>
    ));
  };

  const handleSaveProperty = () => {
    const userID = localStorage.getItem('id');
    const propertyID = property.propertyID;

    if (isSaved) {
      //property is already saved, so remove it
      fetch('http://localhost:8080/removeListing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${userID}&propertyID=${propertyID}`,
      })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          setIsSaved(false);
        })
        .catch(error => {
          console.error('Error removing property:', error);
        });
    } else {
      //property is not saved, so add it
      fetch('http://localhost:8080/addListing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${userID}&propertyID=${propertyID}`,
      })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          setIsSaved(true);
        })
        .catch(error => {
          console.error('Error saving property:', error);
        });
    }
  };

  useEffect(() => {
    const checkSavedStatus = async () => {
      const userID = localStorage.getItem('id');

      try {
        const response = await fetch(`http://localhost:8080/getSavedListings?userID=${userID}`);
        const data = await response.json();
        const savedPropertyIDs = data.map(property => property.propertyID);
        setIsSaved(savedPropertyIDs.includes(property.propertyID));
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };

    if (property) {
      checkSavedStatus();
    }
  }, [property]);

  return (
    <div>
      <div className="navbar-div">
        <Navbar />
      </div>
      {property && (
        <div className="individual-property">
          <div className="property-header">
            <h1>{property.name}</h1>
            {user && (
              <button className="save-button" onClick={handleSaveProperty}>
                {isSaved ? 'Unsave' : 'Save'}
              </button>
            )}
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
              <p>Price: ${property.price}</p>
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
              <PropertyComment pid={property.propertyID} />
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default IndividualProperty;