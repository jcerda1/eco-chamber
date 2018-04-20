import React, { Component } from 'react';
import styles from './styles.css';


class Search extends Component {
  render(){
    return (
      <div className="search container">
        <form className='search form'>
          <span><input type="text" className="search rounded" placeholder="Search..."/></span>
        </form>
      </div>
    )
  }
}

export default Search;