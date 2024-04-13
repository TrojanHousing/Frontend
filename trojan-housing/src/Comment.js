import React from 'react';

const Comment = ({ rating, date, commentText, username }) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <span>{username}</span>
        <span>{date}</span>
        <p>Rating: {rating}</p>
      </div>
      <div className="comment-body">
        <p>{commentText}</p>
      </div>
    </div>
  );
};

export default Comment;
