import React from 'react';




const Articles = (props) => {
  return (
  	<div>
  	<h1 className="articles-event">{props.currentCat}</h1>
    <ul className="articles-container">
      {props.articles}
    </ul> 
    </div>
  )
  
}
 


 

export default Articles; 