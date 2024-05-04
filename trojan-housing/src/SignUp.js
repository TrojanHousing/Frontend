import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthenticationState';
import Navbar from './Navbar';
import './SignIn.css';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
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
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    } else if (formData.password !== formData.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords do not match';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:8080/userRegister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`,
        });
        if (response.ok) {
          signUp(formData);
          const data = await response.text(); 
          console.log("userid="+data);
          localStorage.setItem('id',data);
          navigate('/');
        } else {
          // Handle registration error
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div id="2">
      <Navbar />
      <div className="container">
        <div className="form-container">
          <h2>Sign Up</h2>
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
