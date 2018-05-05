import React from 'react';
import Outlets from './Outlets.jsx'




const Articles = (props) => {
  return (
  	<div>
  	<h1 className="articles-event">{props.currentCat}</h1>
    <ul className="articles-container">
      <Outlets outlets={props.outlets}/>
      {props.articles}
    </ul> 
    </div>
  )
  
}
 


 

export default Articles;  