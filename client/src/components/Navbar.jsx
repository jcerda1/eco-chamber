import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../helpers/Auth';
var Bars = require('react-icons/lib/fa/bars');

const onClick = () => {
  Auth.deleteJWT();
};

const Navbar = () => {
  const loggedInComponents = (
    <div className="nav-right">
      <Link to="/events/single-sided">Biased Events</Link>
      <Link to="/game">Play Game</Link>
      <Link to="/topEvents">Top Events</Link>
      <Link to="/user/profile">My Profile</Link>
      <Link to="/" onClick={onClick}>Logout</Link>
    </div>
  );

  const loggedOutComponents = (
    <div className="nav-right">
      <Link to="/game">Play Game</Link>
      <Link to="/topEvents">Top Events</Link>
      <Link to="/signup">Sign Up</Link>  
      <Link to="/signin">Log in</Link>
    </div>
  );


  const rightNavComponents = Auth.getJWT() ? loggedInComponents : loggedOutComponents;

  return (
    <div className="navbar"> 
      <Link to="/" className="title"> 
        <Bars style={{marginTop: 0, fontSize: 40}} className="side-menu"/>
        <h1>Eco-Chamber</h1> 
      </Link>
      {rightNavComponents}
    </div>
  );
};

export default Navbar;
