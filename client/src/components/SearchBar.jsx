import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };

  render() {
    return (
      <div className="search-bar-container">
        <input placeholder="Search events..." onChange={this.onChange} className="search-input"/>
        <Link to={`/search-results/${this.state.value}`}>&#x1F50D;</Link>
      </div>
    );
  }
};

export default SearchBar;
