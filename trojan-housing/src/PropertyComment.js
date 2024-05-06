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

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return filledStars + emptyStars;
  };

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

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      const requestBody = {
        propertyID: pid,
        userID: localStorage.getItem('id'),
        text: newComment,
        rating: newRating,
      };

      console.log("request" + JSON.stringify(requestBody));

      try {
        const response = await fetch('http://localhost:8080/addComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `propertyID=${requestBody.propertyID}&userID=${requestBody.userID}&text=${requestBody.text}&rating=${requestBody.rating}`,
        });

        if (response.ok) {
          // Update the propertyComments state with the new comment
          setPropertyComments([
            ...propertyComments,
            { text: newComment, rating: newRating },
          ]);

          setNewComment('');
          setNewRating(0);
        } else {
          console.error('Comment was not added successfully. Status:', response.status);
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <div className="property-comment">
      {propertyComments.map((comment, index) => (
        <div key={index} className="comment-box">
          <div className="comment-header">
            <div className="comment-rating">{renderStars(comment.rating)}</div>
          </div>
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