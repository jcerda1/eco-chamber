import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1 style={{"textAlign": "center"}}>
        Welcome to Eco-Chamber. Select a Category...
      </h1>
    );
  }
}

export default Home;
