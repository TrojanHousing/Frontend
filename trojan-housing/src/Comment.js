import React from 'react';

const username = "sample@usc.edu"; // Username for all comments

const comments = [
  { address: "123 Main St", date: "27/07/2017", rating: "★★★★☆", review: "Great location with a stunning view!" },
  { address: "456 Broadway Ave", date: "27/07/2017", rating: "★★★★☆", review: "Modern amenities and friendly staff. Broadway Palace" },
  { address: "789 Elm St", date: "24/07/2017", rating: "★★★☆☆", review: "Good value for the price, but noisy at night." }
];
const Comment = () => {
  return (
    <div className="comments">
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Date</th>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr key={index}>
              <td>{comment.address}</td>
              <td>{comment.date}</td>
              <td>{comment.rating}</td>
              <td>{comment.review}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comment;
