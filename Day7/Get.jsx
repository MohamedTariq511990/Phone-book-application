import axios from "axios";
import "./Get.css";
import React, { Component } from "react";
import Navbar from "./Navbar";

class Get extends Component {
  state = {
    data: [],
    searchQuery: "",
  };

  async componentDidMount() {
    const token= localStorage.getItem("token");
      const response = await axios.get("http://localhost:8181/api/v1/auth/get"
      ,
      {
        headers:{
          "Authorization":`Bearer ${token}`,
          "cache-control":'no-cache',
        }
      }
      );
      this.setState({
        data: response.data
      })
      console.log(this.state.data);
  }

  handleSearchInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    // Filter data based on search query
    const filteredData = this.state.data.filter((item) => {
      const searchRegex = new RegExp(this.state.searchQuery, "i");
      return (
        searchRegex.test(item.phone) ||
        searchRegex.test(item.firstName) ||
        searchRegex.test(item.lastName)
      );
    });

    // Update state with filtered data
    this.setState({ data: filteredData });
  };

  render() {
    return (
      <>
      <Navbar></Navbar>
      <div>
        <h1>See All Details</h1>
        <form>
          <div className="container">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by Phone, First Name, or Last Name"
                required
                value={this.state.searchQuery}
                onChange={this.handleSearchInputChange}
              />
              <button type="button" onClick={this.handleSearch}>
                Search
              </button>
            </div>
            <div className="container">
              <table className="scroll-table" border={1}>
                <thead>
                  <tr>
                    
                  <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((user) => (
                    <tr key={user.phone}>
                      
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
        
      </div></>
    );
  }
}

export default Get;
