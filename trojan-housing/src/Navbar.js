import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/SignIn">Sign In</Link>
        </li>
        <li>
          <Link to="/SignUp">Sign Up</Link>
        </li>
        <li>
          <Link to="/UserProfile">User Profile</Link>
        </li>

        {/* This is for testing only!! We will not have a separate comment page */}
        <li>
          <Link to="/Comment">Comment</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
