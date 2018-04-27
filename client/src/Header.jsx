import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Route } from 'react-router-dom';
import Search from './Search.jsx'


class Header extends Component {
  render() {
    return (
      <nav className="navbar">  
        <div className="navbar-container"> 
          <Link to="/" className="title">
            Eco-Chamber
          </Link>
        <ul >
          <li className="signup">
            <Link to="/signup">Sign Up</Link>  
          </li>
          <li className="login">
            <Link to="/signin">Log in</Link>
          </li>
        </ul>
        <Search/>
        </div>
      </nav>
    )
  }
}
 
export default Header;
 