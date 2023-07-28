import React, { Component } from 'react';
import './Post.css';
import axios from 'axios';
import Navbar from './Navbar';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    };
  }

  handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
  };

  handleLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePhoneChange = (event) => {
    this.setState({ phone: event.target.value });
  };

  handleAddressChange = (event) => {
    this.setState({ address: event.target.value });
  };

  handleSubmit = async (event) => {
    const token= localStorage.getItem("token");
    event.preventDefault();
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address
    };

      const response = await axios.post("http://localhost:8181/api/v1/auth/add",data
      ,
      {
        headers:{
          "Authorization":`Bearer ${token}`,
          "cache-control":'no-cache',
        }
      }
      );
      console.log(response.data);
  };

  render() {
    return (
      <div>
        <Navbar />
        <h1>Add Contact</h1>
        <form onSubmit={this.handleSubmit} className="sign-form">
          <input
            className="sign-input"
            type="text"
            placeholder="First name"
            required
            value={this.state.firstName}
            onChange={this.handleFirstNameChange}
          />

          <input
            className="sign-input"
            type="text"
            placeholder="Last name"
            required
            value={this.state.lastName}
            onChange={this.handleLastNameChange}
          />

          <input
            className="sign-input"
            type="email"
            placeholder="Email id"
            required
            value={this.state.email}
            onChange={this.handleEmailChange}
          />

          <input
            className="sign-input"
            type="tel"
            placeholder="Phone"
            required
            value={this.state.phone}
            onChange={this.handlePhoneChange}
          />

          <input
            className="sign-input"
            type="text"
            placeholder="Physical Address"
            required
            value={this.state.address}
            onChange={this.handleAddressChange}
          />

          <button className="login-button" type="submit">
            Add Contact
          </button>
        </form>
      </div>
    );
  }
}

export default Post;
