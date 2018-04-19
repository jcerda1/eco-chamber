import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Catagories from './Catagories.jsx';
import Events from './Events.jsx';
import Articles from './Articles.jsx'




const Main = () => (
  <main> 
    <Switch> 
      <Route exact path='/' componet={Catagories}></Route> 
      <Route path='/events' component={Events}></Route> 
      <Route path='/articles' component={Articles}></Route> 
    </Switch>
  </main>
)


export default Main; 