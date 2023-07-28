import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file for styling

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8181/api/v1/auth/authenticate', {email, password });
      const token= response.data.token;
      localStorage.setItem("token",token);
      console.log(token);
      setMessage(response.data.message);
      setIsLoggedIn(true);
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
    <body><center>
    <h1>Phone Book Application</h1>
    <div className="login-container">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <br />
      </form>
      {message && <p>{message}</p>}
      <div className="login-links">
        <button onClick={() => navigate('/register')}>Go to Register</button>
      </div>
      <br />
    </div>
    </center>
    </body>
    </>
  );
};

export default LoginPage;
