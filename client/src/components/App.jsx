import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Api from '../helpers/Api';
import Categories from './Categories.jsx';
import Events from './Events.jsx';
import Event from './Event.jsx';
import Home from './Home.jsx';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <div>
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
        <Categories />
        </nav> 
        
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/category/:categoryId/events" component={Events}/>
          <Route path="/event/:eventId/articles" component={Event}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin}/>
        </Switch>
      </div>
    );
  }
}

export default App;






