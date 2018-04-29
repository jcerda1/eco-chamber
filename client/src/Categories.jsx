import React, {Component} from 'react';
import { Link } from 'react-router-dom'


const Categories = (props) => (
  <div>
    <div className="categories-container">
      {props.cat}
    </div>
    <ul className="events-container">
      {props.events}
    </ul>
  </div>
)

 




export default Categories;  