import React from 'react';
import Comments from './Comment';
import SavedProperties from './SavedProperties';



const username = "sample@usc.edu"; // Username for all properties

function UserProfile() {
  return (
    <div className="user-profile">
      <div className="user-info">
        <img src="user-avatar.jpg" alt="User" className="user-avatar" />
        <h1>{username}</h1>
      </div>
      <div className="saved-properties">
        <h2>{username}'s Saved Properties</h2>
        <SavedProperties />
      </div>
      <div className="user-comments">
        <h2>{username}'s Saved Properties</h2>
        <Comments />
      </div>
    </div>
  );
}

export default UserProfile;