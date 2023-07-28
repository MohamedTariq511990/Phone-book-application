import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Delete from './Delete';
import Post from './Post';
import Put from './Put';
import Get from './Get';
import Comments from './feedback';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route exact path='/Post' element={<Post />}></Route>
          <Route exact path='/Put' element={<Put />}></Route>
          <Route exact path='/Get' element={<Get />}></Route>
          <Route exact path='/Delete' element={<Delete />}></Route>
          <Route exact path='/feedback' element={<Comments/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
