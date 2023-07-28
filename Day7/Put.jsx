import React, { Component } from 'react';
import './Put.css';
import axios from 'axios';
import Navbar from './Navbar';

class Put extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  
handleSubmit = async (event) => {
  const token= localStorage.getItem("token");
  event.preventDefault();
  const data = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    email: this.state.email,
    phone: Number(this.state.phone), // Convert phone to a number before sending
    address: this.state.address,
  };

  const { phone } = this.state; // Extract the phone number separately

  
    const response = await axios.put(`http://localhost:8181/api/v1/auth/updateDetails/${phone}`,data
    ,
    {
      headers:{
        "Authorization":`Bearer ${token}`,
        "cache-control":'no-cache',
      }
    }
    );
  }
  render() {
    return (
      <div>
        <Navbar />
        <h1>Edit Contact</h1>
        <form onSubmit={this.handleSubmit} className="sign-form">
          <input
            className="sign-input"
            type="text"
            placeholder="First name"
            required
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />

          <input
            className="sign-input"
            type="text"
            placeholder="Last name"
            required
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />

          <input
            className="sign-input"
            type="email"
            placeholder="Email id"
            required
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <input
            className="sign-input"
            type="tel"
            placeholder="Phone"
            required
            name="phone"
            value={this.state.phone}
            onChange={this.handleInputChange}
          />

          <input
            className="sign-input"
            type="text"
            placeholder="Physical Address"
            required
            name="address"
            value={this.state.address}
            onChange={this.handleInputChange}
          />

          <button className="login-button" type="submit">
            Update Details
          </button>
        </form>
      </div>
    );
  }
}

export default Put;
