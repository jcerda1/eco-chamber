import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Catagories from './Catagories.jsx';
import Events from './Events.jsx';
import Articles from './Articles.jsx'



 
const Main = (props) => {

let events = props.state.events.map((event, index) => {
  	return <span className="someEvent" key={index}><Link to="/articles">{event.summary}</Link></span>
})
let articles = props.state.articles.map((article, index) => {
  	return <li key={index}>{article.description}</li>
})
  return (
    <main> 
      <Switch> 
        <Route exact path='/' component={Catagories}></Route> 
        <Route path='/events' render={props => <Events {...props} events={events}/>}></Route> 
        <Route path='/articles' render={props => <Articles {...props} articles={articles}/>}></Route> 
      </Switch>
    </main>
)}
 
   
export default Main;  