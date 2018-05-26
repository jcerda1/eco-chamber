import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../helpers/Auth';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    Auth.deleteJWT();
    this.props.history.push('/');
  }

  render() {
    const liStyle = {
      "textDecoration": "none",
      "color": "white",
      "cursor": "pointer",
    }

    const loggedInComponents = (
      <ul>
        <li className="logout" onClick={this.onClick} style={liStyle}>Logout</li>
      </ul>
    );

    const loggedOutComponents = (
      <ul>
        <li className="signup">
          <Link style={liStyle} to="/signup">
            Sign Up
          </Link>  
        </li>
        <li className="login">
          <Link style={liStyle} to="/signin">
            Log in
          </Link>
        </li>
      </ul>
    );
  
    const authComponents = Auth.getJWT() ? loggedInComponents : loggedOutComponents;

    return (
      <nav className="navbar">  
        <div className="navbar-container"> 
          <Link to="/" className="title">
            <h1>
              Eco-Chamber
            </h1>
          </Link>
          {authComponents}
        </div>
      </nav>
    );
  }
};

export default withRouter(Navbar);
