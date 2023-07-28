import React, { Component } from 'react';
import './Delete.css';
import axios from 'axios';
import Navbar from './Navbar';

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    };
  }

  handlePhoneChange = (event) => {
    this.setState({ phone: event.target.value });
  };

  handleDelete = async (event) => {
    const token= localStorage.getItem("token");
    event.preventDefault();
      const response = await axios.delete(`http://localhost:8181/api/v1/auth/deleteDetails/${this.state.phone}`
      ,
      {
        headers:{
          "Authorization":`Bearer ${token}`,
          "cache-control":'no-cache',
        }
      }
      );
  };

  render() {
    return (
      <>
        <Navbar />
        <div>
          <body>
            <h1>Delete Contact</h1>
            <form onSubmit={this.handleDelete} className="delete-form">
              <label className="delete-label">Enter Phone Number</label>
              <input
                className="delete-input"
                type="text"
                required
                value={this.state.phone}
                onChange={this.handlePhoneChange}
              />

              <button className="delete-button" type="submit">
                Delete Record
              </button>
            </form>
          </body>
        </div>
      </>
    );
  }
}

export default Delete;
