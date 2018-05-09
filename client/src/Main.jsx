import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Categories from './Categories.jsx';
import Events from './Events.jsx';
import Articles from './Articles.jsx'
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';  

 
  
 
const Main = (props) => {

let currentCat = props.state.currentCat;
let outlets = props.state.outlets;
 
let categories = props.state.categories.map((cat, index) => {
  return <Link to='/'style={{"text-decoration": "none", "color": "black"}}><div key={index}>{cat.name}</div></Link>
});

let events = props.state.events.map((event, index) => {
  	return <li>
             <Link to="/articles" style={{"text-decoration": "none", "color": "black", "padding": "10px"}}><h2 onClick={(id) => {props.handleEvent(event.id)}} className="li-header">{event.title}</h2></Link>
             <div value={event.id} className="body"><p>{event.summary}</p></div>
           </li>
});

let articles = props.state.articles
// .map((article, index) => { 
//   	return <li key={index}>
//              <ul className="article-body">
//                <a style={{"textDecoration": "none", "color": "black"}} href={article.url}>{article.title}</a> 
//              </ul> 
//            </li> 
// });

  return (
    <main> 
      <Switch> 
        <Route exact path='/' render={props => <Events {...props} events={events} />}></Route> 
        <Route path='/events' render={props => <Events {...props} events={events}/>}></Route> 
        <Route path='/articles' render={props => <Articles {...props} currentCat={currentCat} outlets={outlets} articles={articles}/>}></Route> 
        <Route path='/signup' render={props => <Signup {...props} />}></Route> 
        <Route path='/signin' render={props => <Signin {...props} />}></Route> 
      </Switch>
    </main>
)};
 
   
export default Main;  