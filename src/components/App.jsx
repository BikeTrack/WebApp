import React, { Component } from 'react';
import { connect } from 'react-redux';
import { read_cookie } from 'sfcookies';

import '../img/App.css';
import { API_KEY, BASE_URL } from '../constants'
import TopNavbar from './Navbar';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      error: {
        message: ''
      }
        }
  }
// signout function here
  getProfile() {
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

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div style={{margin: '5px'}}>
          <h3> Add a Bike </h3>
          <hr />
          <h4> Bikes list </h4>
          <hr />
          <h4> Deleted Bikes </h4>
          <hr />
          <button
            className="btn bck-btn"
            onClick={() => this.getProfile()}
            >
              Retrieve Profile Info
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log('state', state);
  return {};
}

export default connect(mapStateToProps, null)(App);
