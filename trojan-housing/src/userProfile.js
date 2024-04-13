import React from 'react';


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

// Sample comments data with ratings
const comments = [
  {
    property: 'Park Wilshire',
    date: '27/07/2017',
    rating: 4.5,
    review: 'Great location with a stunning view!'
  },
  {
    property: 'Violet on Virgil',
    date: '27/07/2017',
    rating: 4.0,
    review: 'Modern amenities and friendly staff.'
  },
  {
    property: 'Broadway Palace',
    date: '24/07/2017',
    rating: 3.5,
    review: 'Good value for the price, but noisy at night.'
  }
];

// Rating component to display stars
const Rating = ({ value }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="rating">
      {'★'.repeat(fullStars)}
      {halfStar && '½'}
      {'☆'.repeat(emptyStars)}
    </div>
  );
};

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
        <h2>Comments</h2>
        {comments.map((comment, index) => (
          <div className="comment" key={index}>
            <h4>{comment.property}</h4>
            <div className="comment-body">
              <Rating value={comment.rating} />
              <p className="comment-date">{comment.date}</p>
              <p className="comment-text">{comment.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
