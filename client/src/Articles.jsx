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
      <HuffPost hp={props.hp}  />
      <MSNBC msnbc={props.msnbc}  />
      <AP ap={props.ap}  />
      <NYT nyt={props.nyt}  />
      <Hill hill={props.hill}  />
      <Fox fox={props.fox}  />
      <Breitbart breitbart={props.breitbart}  />
    </ul> 
    </div>
  )
}
  


  
 
export default Articles;  