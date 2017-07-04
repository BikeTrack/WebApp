import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { read_cookie, bake_cookie } from 'sfcookies';

import TopNavbar from './Navbar';
import { API_KEY, BASE_URL } from '../constants'
import '../img/App.css';
import fra from '../lang/fr.js'
import eng from '../lang/en.js'

let activeLang;
let lang = read_cookie('lang');
if (lang === "FR") {
  activeLang = fra;
} else {
  activeLang = eng;
}

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
      }, 3000)
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <br/><br/><h2 className="App-intro ">{activeLang.signinHead}</h2>
          <div className="gen-box">
            <div className="log-box">
              <input
                className="form-control"
                type="text"
                placeholder="email"
                onChange={event => this.setState({email: event.target.value})}
              /><br/><br/>
              <input
                className="form-control"
                type="password"
                placeholder="password"
                onChange={event => this.setState({password: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.signIn()
                  }
                }}
              /><br/>
            </div><br/>
            <button
              className="SignButton"
              type="button"
              onClick={() => this.signIn()}
              >
                {activeLang.buttSignin}
            </button>
          </div>
          <div>{this.state.error.message}</div>
          <div type="text" className="center"><Link to={'/signup'}>{activeLang.buttSignupAlt}</Link></div>
        </div>
      </div>
    )
  }
}

export default SignIn;
