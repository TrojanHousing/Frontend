import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthenticationState';
import './PropertyComment.css';

const PropertyComment = ({ pid }) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState(''); // Add state for new comment
  const [newRating, setNewRating] = useState(0); // Add state for new rating
  const [propertyComments, setPropertyComments] = useState([]); // Add state for property comments

  // Function to fetch comments from the server
  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:8080/getCommentsByPropertyID?propertyID=' + pid, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.text();
      const parsedComments = parseComments(data);
      setPropertyComments(parsedComments); // Update state with fetched comments
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Function to parse the comments string and return an array of comments objects
  const parseComments = (commentsString) => {
    if (!commentsString || commentsString === '[]') {
      return [];
    }
    commentsString = commentsString.replace('[', '').replace(']', '');
    const commentStrings = commentsString.split('},{');
    // Parse each comment string into a comment object
    return commentStrings.map((commentString) => {
      const parts = commentString.split(',');
      const text = parts.find((part) => part.includes('"text":')).replace('"text":', '');
      const rating = parts.find((part) => part.includes('"rating":')).replace('"rating":', '');
      return { text: text.replace(/["{}]/g, ''), rating: parseInt(rating) };
    });
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async () => {
    if (newComment.trim() !== '') {
      //const formattedRating = '★'.repeat(newRating) + '☆'.repeat(5 - newRating);
      const formattedRating = 0;

      const requestBody = {
        propertyID: pid,
        userID: localStorage.getItem('uid'),
        text: newComment,
        rating: formattedRating
      };

      try {
        const response = await fetch('http://localhost:8080/addComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          fetchComments();
        } else {
          console.error('Comment was not added successfully. Status:', response.status);
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
      setNewComment('');
      setNewRating(0);
    }
  };

  return (
    <div className="property-comment">
      {propertyComments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-rating">{comment.rating}</div>
          <div className="comment-text">{comment.text}</div>
        </div>
      ))}

      {user && (

        <form onSubmit={handleSubmitComment} className="add-comment">
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
          <button type="submit">Submit Comment</button>
        </form>
      )}
    </div>
  );
};

export default PropertyComment;