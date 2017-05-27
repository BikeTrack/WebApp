import React, { Component } from 'react';
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
      mail:'',
      id:'',
      created:'',
      updated:'',
      bikes: '',
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
    let that = this;

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
    if (this.status === 200)  {

      let myObj = JSON.parse(this.response);

      that.setState({
            id: myObj.user._id,
            mail: myObj.user.mail,
            created: myObj.user.created,
            updated: myObj.user.updated,
            bikes: myObj.user.bikes
          });

      // console.log('myObj mail : ', myObj.user.mail);
      // console.log('myObj create : ', myObj.user.created);
      // console.log('myObj update : ', myObj.user.updated);
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
          <p>Mail : {this.state.mail}</p>
          <p>Id : {this.state.id}</p>
          <p>Creation : {this.state.created}</p>
          <p>Last Modified : {this.state.updated}</p>
          <div className="form-group">
            <button
              className="btn btn-danger"
              onClick={() => this.deleteUser()}
              >
                Delete User
            </button>
          </div>
          <div className="form-group">
          </div>
          <div>{this.state.error.message}</div>
        </div>
      </div>
    )
  }
}

export default Profile;
