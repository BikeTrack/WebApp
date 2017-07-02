import React, { Component } from 'react';
import { read_cookie } from 'sfcookies';
import { browserHistory } from 'react-router';

import '../img/App.css';
import { API_KEY, BASE_URL } from '../constants'
import AppNavbar from './AppNavbar';
import Map from './getMap';

class bikeDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      name: '',
      color: '',
      brand: '',
      userId:'',
      bikeId:'',
      created:'',
      updated:'',
      tracker: '',
      error: {
        message: ''
      }
    }
  }

  componentDidMount() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let bikeId = read_cookie('bike');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "bike/" + bikeId;
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

      console.log('MyObj : ', myObj);
      that.setState({
            userID: userId,
            bikeId: myObj.bike._id,
            name: myObj.bike.name,
            color: myObj.bike.color,
            brand: myObj.bike.brand,
            created: myObj.bike.created,
            updated: myObj.bike.updated,
            tracker: myObj.bike.tracker
          });
      }
    };
    request.send(JSON.stringify());
  }

  deleteBike(bike) {
    let JWTToken = read_cookie('token');
    let userId = read_cookie('userId');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "bike";
    let success = false;

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
      'userId' : userId,
      'bikeId': bike
    };
    request.send(JSON.stringify(body));
    setTimeout(function() {
        if (success) {
          browserHistory.push('/delBikeSuccess');
        } else {
          browserHistory.push('/failure');
        }
      }, 3000)
  }

  editBike() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "bike";
    let success = false;

    request.open('PATCH', FETCH_URL);
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
      'bikeId': this.state.bikeId,
      'update': {
        name: this.state.name,
        color: this.state.color,
        brand: this.state.brand
      }
    };
    request.send(JSON.stringify(body));
    setTimeout(function() {
        if (success) {
          browserHistory.push('/delBikeSuccess');
        } else {
          browserHistory.push('/failure');
        }
      }, 3000)
  }

  render() {
    var position = [51.505, -0.09];

    return (

      <div className="App">
        <AppNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <h3 className="intro-text">Bike Details</h3>

          <div className="bike-box">
            <div>Name: {this.state.name}</div>
            <div>Bike ID: {this.state.bikeId}</div>
            <div>Color: {this.state.color}</div>
            <div>Brand: {this.state.brand}</div>
            <div>Tracker: {this.state.tracker}</div>
            <div>Created: {this.state.created}</div>
            <div>Updated: {this.state.updated}</div>
            <div className="mapid">
              <Map />
            </div>

            <button
              className="btn btn-danger"
              style={{marginTop: '10px'}}
              onClick={() => this.deleteBike(this.state.bikeId)}
              >
                Delete bike
            </button>
          </div>
          <div className="form-group">
            <h4 className="intro-text">Modify your bike informations</h4>
            <input
              className="form-control"
              style={{marginRight: '5px'}}
              placeholder="Name"
              onChange={event => this.setState({name: event.target.value})}
              onKeyPress={event => {
                if (event.key === "Enter") {
                this.editBike()
                }
              }}
            />
            <input
              className="form-control"
              style={{marginRight: '5px'}}
              placeholder="Color"
              onChange={event => this.setState({color: event.target.value})}
              onKeyPress={event => {
                if (event.key === "Enter") {
                this.editBike()
                }
              }}
            />
            <input
              className="form-control"
              style={{marginRight: '5px'}}
              placeholder="Brand"
              onChange={event => this.setState({brand: event.target.value})}
              onKeyPress={event => {
                if (event.key === "Enter") {
                this.editBike()
                }
              }}
            />

          <br/>
            <button
              className="SignButton"
              style={{marginTop: '10px'}}
              onClick={() => this.editBike()}
              >
                Modify Bike
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default bikeDetails;
