import React, { Component } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx'
import sources from '../../db/testData.js'


class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    articles: sources.articles,
    events: sources.events,
    sources: sources.sources
  }
    console.log(props)
  }

  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div> 
    )  
  }; 
}




export default App;
