import React from 'react';
import Comments from './Comment';
import SavedProperties from './SavedProperties';

function UserProfile() {
  return (
    <div className="user-profile">
      <div className="user-info">
        <img src="user-avatar.jpg" alt="User" className="user-avatar" />
        <h1>user@usc.edu</h1>
      </div>
      <div className="saved-properties">
        <SavedProperties />
      </div>
      <div className="user-comments">
        <Comments />
      </div>
    </div>
  );
}

export default UserProfile;
