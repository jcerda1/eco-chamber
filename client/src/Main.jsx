import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Categories from './Categories.jsx';
import Events from './Events.jsx';
import Articles from './Articles.jsx'
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';  

 

 
const Main = (props) => {
 
let categories = props.state.categories.map((cat, index) => {
  return <div key={index}><Link to='/events'>{cat.baseUri}</Link></div>
})

let events = props.state.events.map((event, index) => {
  	return <li>
             <Link to="/articles"><h2 className="li-header">{event.title}</h2></Link>
             <div className="body"><p>{event.summary}</p></div>
             <div className="source"><p>{event.category}</p></div>
           </li>
})
let articles = props.state.articles.map((article, index) => { 
  	return <li key={index}>
             <div className="article-img"><img  src={article.img}/></div>
             <ul className="article-body">
               <li>{article.title}</li>
             </ul> 
           </li>
})

  return (
    <main> 
      <Switch> 
        <Route exact path='/' render={props => <Categories {...props} events={events} cat={categories}/>}></Route> 
        <Route path='/events' render={props => <Events {...props} events={events}/>}></Route> 
        <Route path='/articles' render={props => <Articles {...props} articles={articles}/>}></Route> 
        <Route path='/signup' render={props => <Signup {...props} />}></Route> 
        <Route path='/signin' render={props => <Signin {...props} />}></Route> 
      </Switch>
    </main>
)}
 
   
export default Main;  