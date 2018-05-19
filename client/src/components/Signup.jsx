import React from 'react';
import { Link } from 'react-router-dom'



const Signup = () => (
  <form>
    <div>
      <h1>Register</h1>
      <p>Please fill in this form to create an account.</p>
      <hr/>

      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" required></input>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required></input>

      <label for="psw-repeat"><b>Repeat Password</b></label>
      <input type="password" placeholder="Repeat Password" name="psw-repeat" required></input>
      <hr/>
      <p>By creating an account you agree to our <Link to="/">Terms & Privacy</Link>.</p>

      <button type="submit" class="registerbtn">Register</button>
    </div>
    <div class="container-signin">
      <p>Already have an account? <Link to="/signin">Sign in</Link>.</p>
    </div>
  </form>
)

 

export default Signup; 
