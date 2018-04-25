import React, { Component } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import { Route } from 'react-router-dom';
import sampleSources from '../../db/testData.js';



class App extends Component {
  constructor(props) { 
  super(props);
  this.state = { 
    articles: sampleSources.sampleArticles,
    events: sampleSources.sampleEvents,
    sources: sampleSources.sampleSources
  } 
}

  render() {
    return (
      <Route>
        <div className="onboarding">
          <Header/>
        </div>
      </Route> 
    )  
  }; 
}

export default App;
