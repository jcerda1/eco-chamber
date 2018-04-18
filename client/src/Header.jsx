import React, { Component } from 'react';
import styles from './styles.css';




const Header = () => {
return (
  <div class="header"> 
    <h3>Eco-Chamber</h3>
    <form name="login">
      Username  <input type="text" name="userid"/>
      Password  <input type="password" name="pswrd"/>
      <input type="button" value="Login"/> <input type="reset" value="Cancel"/>
    </form>
  </div>
)};


export default Header;
