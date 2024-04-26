import React, { useState } from 'react';
import Navbar from './Navbar';
import './SignIn.css';  // Reusing the same CSS file for styling


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    emailConfirmation: '',
    password: '',
    passwordConfirmation: '',
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
    if (!formData.username) {
      errors.username = 'Username is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    } else if (formData.email !== formData.emailConfirmation) {
      errors.emailConfirmation = 'Emails do not match';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    } else if (formData.password !== formData.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords do not match';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div id="2">
      <Navbar />
      <div className="container">
        <div className="form-container" style={{marginTop: '-250px'}}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} className="form">
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input"
              />
              {errors.username && <div className="error">{errors.username}</div>}
            </div>
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
              <label>Confirm Email:</label>
              <input
                type="email"
                name="emailConfirmation"
                value={formData.emailConfirmation}
                onChange={handleChange}
                className="input"
              />
              {errors.emailConfirmation && <div className="error">{errors.emailConfirmation}</div>}
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
            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                className="input"
              />
              {errors.passwordConfirmation && <div className="error">{errors.passwordConfirmation}</div>}
            </div>
            <button type="submit" className="button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
