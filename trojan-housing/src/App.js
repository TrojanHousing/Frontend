import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Navbar from './Navbar';
import UserProfile from './UserProfile';
import Comment from './Comment';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Comment" element={<Comment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
