import React, { Component } from 'react';
import { connect } from 'react-redux';
import { read_cookie } from 'sfcookies';
import { browserHistory } from 'react-router';

import '../img/App.css';
import { API_KEY, BASE_URL } from '../constants'
import AppNavbar from './AppNavbar';

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      error: {
        message: ''
      }
    }
  }

  componentDidMount() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "profile/" + userId;

    console.log('Token', JWTToken);
    console.log('usrId', userId);

    request.open('GET', FETCH_URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.setRequestHeader('x-access-token', JWTToken);
    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };
    request.send(JSON.stringify());
  }

  deleteUser() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "profile";
    let success = false;

    /*console.log('Token', JWTToken);
    console.log('usrId', userId);*/

    request.open('DELETE', FETCH_URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.setRequestHeader('x-access-token', JWTToken);
    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    if (this.status === 200) {
        success = true;
        }
    };
    let body = {
      'userId': userId,
    };
    request.send(JSON.stringify(body));
    setTimeout(function() {
        if (success) {
          browserHistory.push('/delSuccess');
        } else {
          browserHistory.push('/failure');
        }
      }, 2000)
  }

  render() {
    return (
      <div className="App">
        <AppNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <h2 className="intro-text">Profile Preview</h2>
          <p>Mail :</p>
          <p>Id :</p>
          <p>Creation :</p>
          <p>Last Modified :</p>
          <div className="form-group">
            <button
              className="btn btn-danger"
              onClick={() => this.deleteUser()}
              >
                Delete User
            </button>
          </div>
          <div>{this.state.error.message}</div>
        </div>
      </div>
    )
  }
}

export default Profile;
