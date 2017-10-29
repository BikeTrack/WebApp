import React, { Component } from 'react';
import { read_cookie } from 'sfcookies';
import { browserHistory } from 'react-router';

import '../img/App.css';
import { API_KEY, BASE_URL } from '../constants';
import AppNavbar from './AppNavbar';
import Battery from './getBattery';
import Map from './getMap';
import fra from '../lang/fr';
import eng from '../lang/en';
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

class bikeDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      name: '',
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
        // console.log('Body:', this.responseText);
      }
    if (this.status === 200)  {

      let myObj = JSON.parse(this.response);

      console.log('MyObj : ', myObj);
      that.setState({
            userID: userId,
            bikeId: myObj.bike._id,
            name: myObj.bike.name,
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
        // console.log('Body:', this.responseText);
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
        // console.log('Body:', this.responseText);
      }
    if (this.status === 200) {
        success = true;
        }
    };
    let body = {
      'bikeId': this.state.bikeId,
      'update': {
        name: this.state.name,
        brand: this.state.brand,
        // updated: Date.now()
      }
    };
    request.send(JSON.stringify(body));
    setTimeout(function() {
        if (success) {
          browserHistory.push('/editSuccess');
        } else {
          browserHistory.push('/failure');
        }
      }, 3000)
  }

  render() {
    return (

      <div className="App bgGen bgTrack">
        <AppNavbar />
        <div className="form-inline" type="text">
          <div className="center">
            <div className="bgSpacer"></div>
            <h3 className="App-intro">{activeLang.detailsHead}</h3>
            <div className="bike-detail-box">
              <div><Battery/></div>
              <div>{activeLang.genName}: {this.state.name}</div>
              <div>{activeLang.genBikeID}: {this.state.bikeId}</div>
              <div>{activeLang.genBrand}: {this.state.brand}</div>
              <div>{activeLang.genTracker}: {this.state.tracker}</div>
              <div>{activeLang.genCreated}: {this.state.created}</div>
              <div>{activeLang.genUpdated}: {this.state.updated}</div>
              <button
                className="btn btn-danger"
                style={{marginTop: '10px'}}
                onClick={() => this.deleteBike(this.state.bikeId)}
                >
                  {activeLang.buttDelBike}
              </button>
            </div>
          <div className="mapid">
          <Map />
          </div><br/>
          <div className="form-group">
            <h4 className="intro-text">{activeLang.detailsEdit}</h4>
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
                {activeLang.buttEditBike}
            </button>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default bikeDetails;
