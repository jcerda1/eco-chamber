import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Route } from 'react-router-dom';
//import Search from './Search.jsx'


class Header extends Component {
  render() {
    return (
      <nav ClassName="navbar"> 
        <div className="navbar-container">
          <Link to="/" className="navbar-home">
            Eco-Chamber
          </Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin">Log in</Link>
          </li>
        </ul>
      </nav>
    )
  }
}
 
export default Header;
 