import React, { useState } from 'react';
import { useAuth } from './AuthenticationState'; // Import useAuth hook
import Navbar from './Navbar';
import './SignIn.css';  

const SignIn = () => {
  const { signIn } = useAuth();  // Access signIn method
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

  const handleSubmit = (e) => {
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
      signIn(formData.email, formData.password);  // Call signIn on successful validation
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
