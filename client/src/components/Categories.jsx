import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
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
        <NavLink className= 'category' to={`/category/${id}/events`} activeClassName='selected-category'>{name}</NavLink>       
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