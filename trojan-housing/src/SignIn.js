import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useAuth } from './AuthenticationState';
import Navbar from './Navbar';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:8080/userLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`,
        });
        if (response.ok) {
          signIn(formData.email, formData.password);
          navigate('/');
        } else {
          // Handle login error
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div id="1">
      <Navbar />
      <div className="container">
        <div className="form-container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit} className="form">
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>
            <button type="submit" className="button">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
