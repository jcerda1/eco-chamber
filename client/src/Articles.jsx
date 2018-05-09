import React from 'react';
import Outlets from './Outlets.jsx';
import HuffPost from './HuffPost.jsx';
import MSNBC from './MSNBC.jsx';
import AP from './AP.jsx';
import NYT from './NYT.jsx';
import Hill from './Hill.jsx'
import Fox from './Fox.jsx'
import Breitbart from './Breitbart.jsx'




const Articles = (props) => {
  return (
  	<div>
  	<h1 className="articles-event">{props.currentCat}</h1>
    <ul className="articles-container">
      <Outlets outlets={props.outlets}/>
      <HuffPost articles={props.articles} />
      <MSNBC articles={props.articles} />
      <AP articles={props.articles} />
      <NYT articles={props.articles} />
      <Hill articles={props.articles} />
      <Fox articles={props.articles} />
      <Breitbart articles={props.articles} />
    </ul> 
    </div>
  )
  
}
 


  
 
export default Articles;  