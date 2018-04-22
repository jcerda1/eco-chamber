import React from 'react';




const Articles = (props) => {
  return (
    <div className="articles-container">
      <div className="img-container">
        <img src="https://www.npr.org/about/images/press/Logos/NPRLogo_RGB.png"/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Fox_News_Channel_logo.svg"/>
        <img src="https://www.npr.org/about/images/press/Logos/NPRLogo_RGB.png"/>
        <img src="https://www.npr.org/about/images/press/Logos/NPRLogo_RGB.png"/>
      </div>
      <div>{props.articles}</div> 
    </div>
  )
  
}





export default Articles; 