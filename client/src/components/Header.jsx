import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Route } from 'react-router-dom';
import Categories from './Categories.jsx';

const Header = (props) => {

  let categories = props.categories.map((cat, index) => {
    return  (
      <Link to='/'style={{"text-decoration": "none", "color": "black"}}>
        <div onClick={(e, value) =>{props.catClick(e, cat.id)}} value={cat.id} id={cat.name} key={index}>
          {cat.name}
        </div>
      </Link>
    )
  });

  return ( 
    <nav className="navbar">  
      <div className="navbar-container"> 
        <Link to="/" className="title">
          <h1>Eco-Chamber</h1>
        </Link>
        <ul >
          <li className="signup">
            <Link style={{"text-decoration": "none", "color": "black"}} to="/signup">Sign Up</Link>  
          </li>
          <li className="login">
            <Link style={{"text-decoration": "none", "color": "black"}} to="/signin">Log in</Link>
          </li>
        </ul>
      </div>
      <Categories cat={categories}/>
    </nav> 
    )
  }
 
export default Header;
 