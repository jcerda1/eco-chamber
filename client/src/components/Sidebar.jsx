import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../helpers/Auth';
const Earth = require('react-icons/lib/io/earth')

class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const loggedInComponents = (
      <div className="sidebar-menu">
        <Link to="/events/single-sided">Biased Events</Link>
        <Link to="/game">Play Game</Link>
        <Link to="/topEvents">Top Events</Link>
        <Link to="/user/profile">My Profile</Link>
        <Link to="/">Logout</Link>
      </div>
    );

    const loggedOutComponents = (
      <div className="sidebar-menu">
        <Link to="/game">Play Game</Link>
        <Link to="/topEvents">Top Events</Link>
      </div>
    );

    const sideNavComponents = Auth.getJWT() ? loggedInComponents : loggedOutComponents;

    return (
      <div style={{display: this.props.show}} className="sidebar"> 
        {sideNavComponents}
      </div>
    );
  }
};

export default Sidebar;