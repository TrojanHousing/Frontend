import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  

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
        <li>
          <Link to="/IndividualProperty">IndividualProperty</Link>
        </li>
      </ul>
=======
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Trojan Housing Finder
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/SignIn" className="navbar-link">Sign In</Link>
          </li>
          <li className="navbar-item">
            <Link to="/SignUp" className="navbar-link">Sign Up</Link>
          </li>
          <li className="navbar-item">
            <Link to="/UserProfile" className="navbar-link">User Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
