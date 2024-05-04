import React from 'react';
import Comments from './Comment';
import SavedProperties from './SavedProperties';
import Navbar from './Navbar';
import Avatar from './images/user-avatar.jpg';
import { useAuth } from './AuthenticationState';
import './UserProfile.css';

const username = "[USERNAME]"; // Username for all properties

function UserProfile() {
  const { user } = useAuth();
  return (
    <div className="user-profile">
      <Navbar />
      <div className="user-profile-block">

        <div className="user-info">
          <img src={Avatar} alt="USER PROFILE PICTURE" className="user-avatar" />
          <h1>{user?.email}</h1>
        </div>

        <div className="interactions">

          <div className="saved-properties">
            <h2>{user?.email}'s Saved Properties</h2>
            <SavedProperties />
          </div>
          <div className="user-comments">
            <h2>{user?.email}'s Property Ratings</h2>
            <Comments />
          </div>

        </div>


      </div>

    </div>
  );
}

export default UserProfile;