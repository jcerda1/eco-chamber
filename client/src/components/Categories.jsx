import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Api from '../helpers/Api';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      categories: [], 
    };
  } 

  componentDidMount() {
    Api.get('/categories').then(categories => this.setState({ categories }));
  }

  render() {
    const categories = this.state.categories.map(({ id, name }) => {
      return (
        <Link to={`/category/${id}/events`} style={{"textDecoration": "none", "color": "black"}} className="CategoryLink" key={id}>
          {name}
        </Link>
      );
    });
  
    return (
      <div>
        <div className="categories-container">
          {categories}
        </div>
        <hr/>
      </div>
    );
  }
}

export default Categories;