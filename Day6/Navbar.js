import React from "react";
import Logo from "./Allsmart.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="border">
      <nav>
        <div className="logo">
          <Link to="/">
            <img
              src={Logo}
              alt="Profile"
              style={{ width: "30px", height: "32px" }}
            />
          </Link>
        </div>
        
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Get">Contacts</Link>
          </li>
          <li>
            <Link to="/Post">Add Contact</Link>
          </li>
          <li>
            <Link to="/Put">Edit Contact</Link>
          </li>
          <li>
            <Link to="/Delete">Delete Contact</Link>
          </li>
         
          <li>
          <Link to="/Feedback">Feedback</Link>
          </li>
         
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
