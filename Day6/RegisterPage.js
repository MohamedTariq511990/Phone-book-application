import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8181/api/v1/auth/register', {
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
      });
      setMessage(response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <>
      <center>
        <h1>Phone Book Application</h1>
        <div className="register-container">
          <h2>User Register</h2>
          <form onSubmit={handleRegister}>
            <label>
              First Name:&nbsp;&nbsp;
              <input
                type="text"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label>
              Last Name:&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label>
              Email id: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label>
              Phone: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="tel"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            <label>
              Physical Address: &nbsp;
              <input
                type="text"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <div className="login-links">
              <button type="submit">Register</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={() => navigate('/login')}>Login</button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </center>
    </>
  );
};

export default RegisterPage;
