import React from 'react';
import { Switch, Route } from 'react-router-dom';




const Main = () => (
  <main> 
    <Switch> 
      <Route exact path='/' component={Home}></Route> 
      <Route path='/events' component={Events}></Route> 
      <Route path='/articles' component={Articles}></Route> 
    </Switch>
  </main>
)


export default Main; 