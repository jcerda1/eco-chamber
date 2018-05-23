import React, { Component } from 'react';
import { Link } from 'react-router-dom';



const Navbar = () => (
  <nav className="navbar">  
    <div className="navbar-container"> 
      <Link to="/" className="title">
        <h1>
          Eco-Chamber
        </h1>
      </Link>
        <ul >
          <li className="signup">
            <Link style={{"textDecoration": "none", "color": "black"}} to="/signup">
              Sign Up
            </Link>  
          </li>
          <li className="login">
            <Link style={{"textDecoration": "none", "color": "black"}} to="/signin">
              Log in
            </Link>
          </li>
        </ul>
    </div>
  </nav> 
)




export default Navbar;