import React, { Component } from 'react';

class Search extends Component {
//   constructor() {
//     super(); 
//     this.state = {
//   	  query: ""
//   	}
//     this.handleInputChange = this.handleInputChange.bind(this)
//     }
// }

// handleInputChange = () => {
//   this.setState({
//     query: this.search.value
//   });
// }
  render(){
    return (
        <form>
          <input
            placeholder="Search for..."
            //ref={input => this.search = input}
            //onChange={this.handleInputChange}
           />
          <p></p>
         </form>
    )
  }
}

export default Search;