import React, { Component } from 'react';
import Search from './Search.jsx'




const Header = () => {
return (
  <div className="header"> 
    <h2 className="title">Eco-Chamber</h2>
    <form className="login">
      username  <input type="text" name="userid"/>
      password  <input type="password" name="pswrd"/>
      <input type="button" value="Login"/> <input type="reset" value="Cancel"/>
    </form>
     <Search/>
  </div>
)}; 


export default Header;
