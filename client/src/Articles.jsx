import React from 'react';




const Articles = (props) => {
  return (
    <div className="articles-container">
      <div className="img-container">
        {props.img}
      </div>
      <div>{props.articles}</div>
    </div>
  )
  
}
 




export default Articles; 