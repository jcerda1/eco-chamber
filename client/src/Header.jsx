import React, { Component } from 'react';
import styles from './styles.css';




const Header = () => {
return (
  <div class="header"> 
    <h2>Eco-Chamber</h2>
    <form name="login">
      Username  <input type="text" name="userid"/>
      Password  <input type="password" name="pswrd"/>
      <input type="button" value="Login"/> <input type="reset" value="Cancel"/>
    </form>
  </div>
)};


export default Header;
