import React, { useState, useEffect } from 'react';
import './Comment.css';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthenticationState';

const Comment = () => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchComments = async () => {
        try {
          const response = await fetch('http://localhost:8080/getCommentsByUser?userID='+localStorage.getItem('id'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.text();
          const parsedComments = parseComments(data);
          setComments(parsedComments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

      fetchComments();
    }
  }, [user]);

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
      const address = parts.find((part) => part.includes('"address":')).replace('"address":', '');
      const id = parts.find((part) => part.includes('"propertyID":')).replace('"propertyID":', '');
      return { text: text.replace(/["{}]/g, ''), rating: parseInt(rating), address: address.replace(/["{}]/g, ''), id: parseInt(id)};
    });
  };

  return (
    <div className="comments">
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr key={index}>
              <td>
                <Link to={`/IndividualProperty/${comment.id}`}>
                  {comment.address}
                </Link>
              </td>
              <td>{'★'.repeat(comment.rating)}</td>
              <td>{comment.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comment;