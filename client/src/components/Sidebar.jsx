import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../helpers/Auth';
import Collapsible from 'react-collapsible';
const Earth = require('react-icons/lib/io/earth')

class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const loggedInComponents = (
      <div className="sidebar-menu">
        <Collapsible className="menu-events-list" trigger="View News Events">
          <Link onClick={this.props.toggle} className="sidebar-event-item" to="/topEvents">Top Events</Link>
          <Link onClick={this.props.toggle} className="sidebar-event-item" to="/events/single-sided">Biased Events</Link>
          <Link onClick={this.props.toggle} className="sidebar-event-item" to="/category/11/events">Balanced Events</Link>
        </Collapsible>
        <Link onClick={this.props.toggle} className="sidebar-menu-item" to="/game">Play Game</Link>  
        <Link onClick={this.props.toggle} className="sidebar-menu-item" to="/user/profile">My Profile</Link>     
      </div>
    );

    const loggedOutComponents = (
      <div className="sidebar-menu">
        <Collapsible className="menu-events-list" trigger="View News Events">
          <Link onClick={this.props.toggle} className="sidebar-event-item" to="/topEvents">Top Events</Link>
          <Link onClick={this.props.toggle} className="sidebar-event-item" to="/events/single-sided">Biased Events</Link>
          <Link onClick={this.props.toggle} className="sidebar-event-item" to="/category/11/events">Balanced Events</Link>
        </Collapsible>
        <Link onClick={this.props.toggle} className="sidebar-menu-item" to="/game">Play Game</Link>      
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