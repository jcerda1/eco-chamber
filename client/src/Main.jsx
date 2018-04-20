import React from 'react';
import { Switch, Route, Link} from 'react-router-dom';
import Catagories from './Catagories.jsx';
import Events from './Events.jsx';
import Articles from './Articles.jsx'




const Main = (props) => {
  let events = props.state.events.map((event, index) => {
  	return <li><Link to="/articles" key={index}>{event.description}</Link></li>
  })
return (
  <main> 
    <Switch> 
      <Route exact path='/' component={Catagories}></Route> 
      <Route path='/events' render={props => <Events {...props} events={events}/>}></Route> 
      <Route path='/articles' component={Articles}></Route> 
    </Switch>
  </main>
)}

 
export default Main;  