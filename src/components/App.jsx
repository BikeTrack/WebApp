import React, { Component } from 'react';
import { connect } from 'react-redux';
import { read_cookie } from 'sfcookies';
import { browserHistory } from 'react-router';

import '../img/App.css';
import { API_KEY, BASE_URL } from '../constants'
import AppNavbar from './AppNavbar';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      name: '',
      color: '',
      brand: '',
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
// signout function here

  deleteUser() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "profile";
    let success = false;

    console.log('Token', JWTToken);
    console.log('usrId', userId);

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

  addBike() {
    const { name, color, brand } = this.state;
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "bike";
    let success = false;

    console.log('Token', JWTToken);
    console.log('usrId', userId);

    request.open('POST', FETCH_URL);
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
      'bikeInfo': {
        'name': name,
        'color': color,
        'brand': brand,
      }
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
          <h2 className="intro-text">Welcome to your personal Biketrack space</h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              style={{marginRight: '5px'}}
              placeholder="name"
              onChange={event => this.setState({name: event.target.value})}
            />
            <input
              className="form-control"
              type="text"
              style={{marginRight: '5px'}}
              placeholder="color"
              onChange={event => this.setState({color: event.target.value})}
            />
            <input
              className="form-control"
              style={{marginRight: '5px'}}
              placeholder="brand"
              onChange={event => this.setState({brand: event.target.value})}
              onKeyPress={event => {
                if (event.key === "Enter") {
                this.addBike()
                }
              }}
            />
          <br/>
            <button
              className="btn btn-danger"
              style={{marginTop: '10px'}}
              onClick={() => this.addBike()}
              >
                Add a New Bike
            </button>

          </div>
          <div>{this.state.error.message}</div>
        </div>
      </div>
    )
  }
}

export default App;
