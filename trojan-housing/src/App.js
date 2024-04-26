import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Navbar from './Navbar';
import UserProfile from './UserProfile';
import IndividualProperty from './IndividualProperty';
import MainPage from './MainPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/IndividualProperty" element={<IndividualProperty />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
