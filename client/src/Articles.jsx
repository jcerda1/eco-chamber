import React from 'react';




const Articles = (props) => {
  return (
  	<div>
  	<div className="articles-event"> Title </div>
    <ul className="articles-container">
      {props.articles}
    </ul> 
    </div>
  )
  
}
 


 

export default Articles; 