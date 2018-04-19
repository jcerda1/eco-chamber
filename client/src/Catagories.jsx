import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import styles from './styles.css';

const Catagories = () => {
  return (
  <div class="wrapper">
    <div class="box a"><Link to='/events'>World</Link></div>
    <div class="box a"><Link to='/events'>US</Link></div>
    <div class="box a"><Link to='/events'>Politics</Link></div>
    <div class="box a"><Link to='/events'>Business</Link></div>
    <div class="box a"><Link to='/events'>Tech</Link></div>
    <div class="box a"><Link to='/events'>Art</Link></div>
    <div class="box a"><Link to='/events'>Science</Link></div>
    <div class="box a"><Link to='/events'>Sport</Link></div>
    <div class="box a"><Link to='/events'>Food</Link></div>
  </div>
  )
}






export default Catagories;