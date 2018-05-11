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
 

let hp = props.state.articles[3] ? props.state.articles[3].Articles.map((event, index) => {
    return <li className="article-body" key={index}><a style={{"text-decoration": "none", "color": "black"}}href={event.url}>{`${event.title}  ${event.date}`}</a></li>
}) :   <div> There is Nothing to Report </div>

let msnbc = props.state.articles[4] ? props.state.articles[4].Articles.map((event, index) => {
    return <li className="article-body" key={index}><a style={{"text-decoration": "none", "color": "black"}} href={event.url}>{`${event.title}  ${event.date}`}</a></li>
}) :   <div> There is Nothing to Report </div>

let ap = props.state.articles[0] ? props.state.articles[0].Articles.map((event, index) => {
    return <li className="article-body" key={index}><a style={{"text-decoration": "none", "color": "black"}} href={event.url}>{`${event.title}  ${event.date}`}</a></li>
}) :   <div> There is Nothing to Report </div>

let nyt = props.state.articles[6] ? props.state.articles[6].Articles.map((event, index) => {
    return <li className="article-body" key={index}><a style={{"text-decoration": "none", "color": "black"}} href={event.url}>{`${event.title}  ${event.date}`}</a></li>
}) :   <div> There is Nothing to Report </div>

let hill = props.state.articles[5] ? props.state.articles[5].Articles.map((event, index) => {
    return <li className="article-body" key={index}><a style={{"text-decoration": "none", "color": "black"}} href={event.url}>{`${event.title}  ${event.date}`}</a></li>
}) :   <div> There is Nothing to Report </div>

let fox = props.state.articles[1] ? props.state.articles[1].Articles.map((event, index) => {
    return <li className="article-body" key={index}><a style={{"text-decoration": "none", "color": "black"}} href={event.url}>{`${event.title}  ${event.date}`}</a></li>
}) :   <div> There is Nothing to Report </div>

let breitbart = props.state.articles[2] ? props.state.articles[2].Articles.map((event, index) => {
    return <li className="article-body" key={index}><a style={{"text-decoration": "none", "color": "black"}} href={event.url}>{`${event.title}  ${event.date}`}</a></li>
}) :   <li> There is Nothing to Report </li>

  return (
    <main> 
      <Switch> 
        <Route exact path='/' render={props => <Events {...props} events={events} />}></Route> 
        <Route path='/events' render={props => <Events {...props} events={events}/>}></Route> 
        <Route path='/articles' render={props => <Articles {...props} hp={hp} msnbc={msnbc} ap={ap} nyt={nyt} hill={hill} fox={fox} breitbart={breitbart} currentCat={currentCat} outlets={outlets} />}></Route> 
        <Route path='/signup' render={props => <Signup {...props} />}></Route> 
        <Route path='/signin' render={props => <Signin {...props} />}></Route> 
      </Switch>
    </main>
)};
 
   
export default Main;  