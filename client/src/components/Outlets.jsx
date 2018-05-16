import React from 'react';


const Outlets = (props) => {
  return props.outlets.map(img => {
  	return <img className="article-img" src={img.img}/>
  })
}



export default Outlets;