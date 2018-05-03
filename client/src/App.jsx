import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import sampleSources from '../../db/testData.js';
import { get } from './helpers/api';

class App extends Component { 
  constructor(props) { 

    super(props);
    this.state = { 
      articles: sampleSources.sampleArticles, 
      events: sampleSources.sampleEvents,
      sources: sampleSources.sampleSources 
    };
  }

  componentDidMount() {
    // get('/categories').then(categories => console.log(categories));
    // get('/events', { categoryId: 1 }).then(events => console.log(events));
    // get('/articles', { eventId: 1 }).then(articles => console.log(articles));
  }

  super(props);
  this.state = { 
    articles: sampleSources.sampleArticles, 
    events: sampleSources.sampleEvents,
    sources: sampleSources.sampleSources,
    categories: sampleSources.sampleCategories,
    currentCat: "Arts"
  } 
  this.handleClickCat = this.handleClickCat.bind(this);
  console.log(this.state)
}


  handleClickCat(e) {
    let temp = this.state.currentCat;
    temp = e.target.id
    this.setState({currentCat: temp});
    console.log(this.state)
  }

  render() {  
    return (

      <div className="onboarding">
        <Header/>
        <Main state={this.state}/>
      </div>

        <div className="onboarding">
          <Header state={this.state} catClick={this.handleClickCat}/>
          <Main state={this.state}/>
        </div>

    )  
  };   
}

export default App;
