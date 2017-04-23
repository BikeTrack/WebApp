import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bake_cookie, read_cookie } from 'sfcookies';

import TopNavbar from './Navbar';
import { API_KEY, BASE_URL } from '../constants'
import '../img/App.css';

class SignIn extends Component {
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

  signIn() {
    const { email, password } = this.state;
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "authenticate";
    let success = false;

    request.open('POST', FETCH_URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    if (this.status === 200) {
        success = true;
        let myObj = JSON.parse(this.response);
        bake_cookie('token', myObj.token);
        bake_cookie('userId', myObj.userId);
      }
    };
    let body = {
      'mail': email,
      'password': password
    };
    request.send(JSON.stringify(body));
    setTimeout(function() {
        if (success) {
          browserHistory.push('/app');
        } else {
          browserHistory.push('/failure');
        }
      }, 2000)
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <h2 className="intro-text">Signin for the Biketrack's Web Platform</h2>
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
                this.signIn()
                }
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => this.signIn()}
              >
                Sign In
            </button>
          </div>
          <div>{this.state.error.message}</div>
          <div><Link to={'/signup'}>Signup Instead</Link></div>
        </div>
      </div>
    )
  }
}

export default SignIn;
