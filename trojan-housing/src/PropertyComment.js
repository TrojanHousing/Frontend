// PropertyComment.js
import React from 'react';
import './PropertyComment.css';

const PropertyComment = ({ comment }) => {
  return (
    <div className="property-comment">
      <div className="comment-header">
        <p className="username">{comment.username}</p>
        <p className="comment-date">{comment.date}</p>
      </div>
      <div className="comment-rating">{comment.rating}</div>
      <div className="comment-text">{comment.text}</div>
    </div>
  );
};

export default PropertyComment;