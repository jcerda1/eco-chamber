import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Welcome to Eco-Chamber. Select a Category...
      </div>
    );
  }
}

export default Home;