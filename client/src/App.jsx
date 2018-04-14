import React, { Component } from 'react';
import styles from './styles.css';
import Search from './Search.jsx';

class App extends Component {
//   constructor() {
//     super(); 
//     this.state = {
//   	  query: ""
//   	}
//     this.handleInputChange = this.handleInputChange.bind(this)
//     }
// }

// handleInputChange = () => {
//   this.setState({query: this.search.value});
// }
  render() {
    return (
      <div>
        Eco-Chamber
      <div>
        <Search/>
      </div>
      </div> 
    )  
  }; 
}

export default App;
