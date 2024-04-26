import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from './AuthenticationState';  // Import useAuth to access authentication state

const Navbar = () => {
  const { user, signOut } = useAuth();  // Get user and signOut function from context

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Trojan Housing Finder
        </Link>
        <ul className="navbar-menu">
          {user ? (
            <>
              <li className="navbar-item">
                <Link to="/UserProfile" className="navbar-link">User Profile</Link>
              </li>
              <li className="navbar-item">
                <button onClick={signOut} className="navbar-link button-link">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/SignIn" className="navbar-link">Sign In</Link>
              </li>
              <li className="navbar-item">
                <Link to="/SignUp" className="navbar-link">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
