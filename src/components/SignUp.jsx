import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { read_cookie } from 'sfcookies';
import FacebookLogin from 'react-facebook-login';

import { API_KEY, BASE_URL } from '../constants'
import TopNavbar from './Navbar';
import '../img/App.css';
import fra from '../lang/fr'
import eng from '../lang/en'
import ita from '../lang/it-IT';

let activeLang;
let lang = read_cookie('lang');
if (lang === "FR") {
  activeLang = fra;
} else if (lang === "IT") {
  activeLang = ita;
} else {
  activeLang = eng;
}

const responseFacebook = (response) => {
  console.log(response);
}

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordCheck: '',
      lname: '',
      fname: '',
      birthday: '',
      apiKey: API_KEY,
      error: {
        message: ''
        }
      }
    }

    myFunction() {
        document.getElementById("checked").classList.toggle("checked");
    }

  signUp() {
    const { email, password, passwordCheck, lname, fname, birthday} = this.state;
    if (email && password && fname && lname && password === passwordCheck) {
      let request = new XMLHttpRequest();
      let FETCH_URL = BASE_URL + "signup";
      let success = false;
      request.open('POST', FETCH_URL);

      request.setRequestHeader('Content-Type', 'application/json');
      request.setRequestHeader('Authorization', this.state.apiKey);
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          // Debugging
          // console.log('Status:', this.status);
          // console.log('Headers:', this.getAllResponseHeaders());
          // console.log('Body:', this.responseText);
        }
        if (this.status === 200) {
            success = true;
        }
      };
      // Debugging
      // console.log('this.state.apiKey', this.state.apiKey);
      // console.log('this.state.email', this.state.email);
      // console.log('this.state.password', this.state.password);

      let body = {
        'email': email,
        'password': password,
        'lastname': lname,
        'name': fname,
        'dob': birthday,
      };
      request.send(JSON.stringify(body));
      setTimeout(function() {
          if (success) {
            browserHistory.push('/success');
          } else {
            browserHistory.push('/failure');
          }
        }, 3000)
      }
    }

  render() {
    return (
      <div className="App bgGen bgSign">
        <TopNavbar />
        <div className="bgSignSpacer"></div>
        <div className="bgSpacerMini"></div>
        <div className="form-inline" style={{margin: '5px'}}>
          <h2 className="App-intro ">{activeLang.signupHead}</h2>
          <div className="gen-box">
            <div className="log-box">
              <input
                className="form-control"
                type="text"
                placeholder="First Name"
                required="required"
                onChange={event => this.setState({fname: event.target.value})}
              /><br/><br/>
              <input
                className="form-control"
                type="text"
                placeholder="Last Name"
                required="required"
                onChange={event => this.setState({lname: event.target.value})}
              /><br/><br/>
              <input
                className="form-control"
                type="text"
                placeholder="Bithday"
                onChange={event => this.setState({birthday: event.target.value})}
              /><br/><br/>
              <input
                className="form-control"
                type="text"
                placeholder="email"
                required="required"
                onChange={event => this.setState({email: event.target.value})}
              /><br/><br/>
              <input
                className="form-control"
                type="password"
                placeholder="password"
                required="required"
                onChange={event => this.setState({password: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.signUp()
                  }
                }}
              /><br/><br/>
              <input
                id="checked"
                className="form-control"
                type="password"
                placeholder="Repeat password"
                required="required"
                onChange={event => this.setState({passwordCheck: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.signUp()
                  }
                }}
              /><br/>
            </div><br/>
            <button
              className="SignButton"
              type="button"
              onClick={() => this.signUp()}
              >
                {activeLang.buttSignup}
            </button>
            <FacebookLogin
              appId="126603321331623"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"/>
          </div>
        <div>{this.state.error.message}</div>
        <div type="text" className="center"><Link to={'/signin'}>{activeLang.buttSigninAlt}</Link></div>
      </div>
    </div>
    )
  }
}

export default SignUp;
