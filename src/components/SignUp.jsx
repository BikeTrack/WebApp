import React, { Component } from 'react';
import { Link } from 'react-router';

import { API_KEY, BASE_URL } from '../constants'
import TopNavbar from './Navbar';
import './App.css';
import axios from 'axios';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      apiKey: API_KEY,
      error: {
        message: ''
      }
    }
  }

  signUp() {
    const { email, password } = this.state;
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "signup";

    request.open('POST', FETCH_URL);

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };
    console.log('this.state.apiKey', this.state.apiKey);
    console.log('this.state.email', this.state.email);
    console.log('this.state.password', this.state.password);

    let body = {
      'mail': email,
      'password': password
    };
    request.send(JSON.stringify(body));

  // let instance = axios.create({
  //     baseURL: BASE_URL,
  //     timeout: 1000,
  //     headers: {'Content-Type': 'application/json',
  //               'Authorization': this.state.apiKey},
  //   });

  //   axios.post('/signup', {
  //     mail: email,
  //     password: password
  //     })
 }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <h2>Sign up for Biketrack's Web Platform</h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              style={{marginRight: '5px'}}
              placeholder="email"
              onChange={event => this.setState({email: event.target.value})}
            />
            <input
              className="form-control"
              type="password"
              style={{marginRight: '5px'}}
              placeholder="password"
              onChange={event => this.setState({password: event.target.value})}
              onKeyPress={event => {
                if (event.key === "Enter") {
                this.signUp()
                }
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => this.signUp()}
              >
                Sign Up
            </button>
          </div>
        <div>{this.state.error.message}</div>
        <div><Link to={'/signin'}>Already a user?</Link></div>
      </div>
    </div>
    )
  }
}

export default SignUp;
