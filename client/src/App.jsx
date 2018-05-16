import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Api from '../helpers/Api';
import Categories from './Categories.jsx';
import Events from './Events.jsx';
import Event from './Event.jsx';
import Home from './Home.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          <h1>
            Eco-Chamber
          </h1>
          <Categories/>
        </header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/category/:categoryId/events" component={Events}/>
          <Route path="/event/:eventId/articles" component={Event}/>
        </Switch>
      </div>
    );
  }
}

export default App;


// import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
// import Header from './Header.jsx';
// import Main from './Main.jsx';
// // import sampleSources from '../../db/testData.js';
// import { get } from './helpers/api';

// class App extends Component { 
//   constructor(props) { 
//     super(props);
//     this.state = { 
// <<<<<<< HEAD
// <<<<<<< HEAD
// <<<<<<< HEAD
//       // articles: sampleSources.sampleArticles, 
//       // events: sampleSources.sampleEvents,
//       // sources: sampleSources.sampleSources 
//     };
//   }

//   componentDidMount() {
//     // get('/categories').then(categories => console.log(categories));
//     // get('/events', { categoryId: 1 }).then(events => console.log(events));
//     // get('/sources', { eventId: 1 }).then(sources => console.log(sources));
//   }

//   super(props);
//   this.state = { 
//     articles: sampleSources.sampleArticles, 
//     events: sampleSources.sampleEvents,
//     sources: sampleSources.sampleSources,
//     categories: sampleSources.sampleCategories,
//     currentCat: "Arts"
// =======
//       articles: sampleSources.sampleArticles, 
// =======
//       articles: [], 
// >>>>>>> 2d1538c... made changes to server endpoint added components for each news outlet
// =======
//       sources: [], 
// >>>>>>> 926d25f... added sources to state
//       events: [],
//       outlets: sampleSources.Outlets,
//       categories: [], 
//       currentCat: "Arts"
// >>>>>>> a27d39a... cleaned up app file
//   } 
//   this.handleClickCat = this.handleClickCat.bind(this);
//   this.updateEvents = this.updateEvents.bind(this);
//   this.handleEvent = this.handleEvent.bind(this);
// } 
 
// componentDidMount() {
//   get('/categories').then(categories => this.setState({categories: categories}));
//   get('/events', { categoryId: 1 }).then(events => this.setState({events: events}));
// }

// handleClickCat(e, id) {
//   let temp = this.state.currentCat;
//   temp = e.target.id
//     this.setState({currentCat: temp});
//     this.updateEvents(id);
// }

// updateEvents(id) {
//   get('/events', { categoryId: `${id}`} ).then(events => this.setState({events: events}))
// }

// handleEvent(id) {
//   get('/sources', { eventId: `${id}` }).then(sources => this.setState({sources: sources}));
// }

//   render() {  
//     return (
//       <div className="onboarding">
//         <Header categories={this.state.categories} catClick={this.handleClickCat}/>
//         <Main state={this.state} handleEvent={this.handleEvent}/>
//       </div>
//     )  
//   }  
// }

// export default App;




