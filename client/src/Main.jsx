import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Catagories from './Catagories.jsx';
import Events from './Events.jsx';
import Articles from './Articles.jsx'
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';  



 
const Main = (props) => {

let categories = props.state.events.map((cat, index) => {
  return <div key={index}><Link to='/events'>{cat.category}</Link></div>
})

let events = props.state.events.map((event, index) => {
  	return <span className="event" key={index}><Link to="/articles">{event.summary}</Link></span>
})
let articles = props.state.articles.map((article, index) => {
  	return <li className="article" key={index}>{article.description}</li>
})
let img = props.state.articles.map((img, index) => {
    return <img src={img.img} key={index}/>
})

  return (
    <main> 
      <Switch> 
        <Route exact path='/' render={props => <Catagories {...props} cat={categories}/>}></Route> 
        <Route path='/events' render={props => <Events {...props} events={events}/>}></Route> 
        <Route path='/articles' render={props => <Articles {...props} img={img} articles={articles}/>}></Route> 
        <Route path='/signup' render={props => <Signup {...props} />}></Route> 
        <Route path='/signin' render={props => <Signin {...props} />}></Route> 
      </Switch>
    </main>
)}
 
   
export default Main;  