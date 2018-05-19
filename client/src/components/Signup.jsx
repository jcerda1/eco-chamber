import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Api from '../helpers/Api';
import Auth from '../helpers/Auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onClick = () => {
    Api.post('/users', this.state)
      .then(() => {
        return Api.get('/auth/login', this.state);
      })
      .then(jwt => {
        Auth.setJWT(jwt);
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr/>

          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange} required></input>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange} required></input>

          <hr/>
          <p>By creating an account you agree to our <Link to="/">Terms & Privacy</Link>.</p>

          <button type="submit" class="registerbtn" onClick={this.onClick}>Register</button>
        </div>
        <div class="container-signin">
          <p>Already have an account? <Link to="/signin">Sign in</Link>.</p>
        </div>
      </div>
    );
  }
}

export default Signup; 
