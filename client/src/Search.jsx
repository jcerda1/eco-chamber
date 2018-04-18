import React, { Component } from 'react';
import styles from './styles.css';


class Search extends Component {
  render(){
    return (
      <div class="search container">
        <form class="form">
          <input
            placeholder="Search for..."
           />
          <p></p>
         </form>
      </div>
    )
  }
}

export default Search;