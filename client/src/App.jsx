import React, { Component } from 'react';
//import styles from './styles.css';
import Search from './Search.jsx';
import Catagories from './Catagories.jsx';
import Header from './Header.jsx';

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
        <Header/>
        <Search/>
        <Catagories/>
      </div> 
    )  
  }; 
}


export default App;
