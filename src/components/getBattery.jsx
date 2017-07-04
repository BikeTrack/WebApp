import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie, bake_cookie } from 'sfcookies';
import { API_KEY, BASE_URL } from '../constants'
import '../img/App.css';
import logo from '../img/logo-small.png'
import fra from '../lang/fr'
import eng from '../lang/en'
import normal from '../img/battery.png';
import critical from '../img/batteryCritical.png';
import low from '../img/batteryLow.png';

let activeLang;
let lang = read_cookie('lang');
if (lang === "FR") {
  activeLang = fra;
} else {
  activeLang = eng;
}


class Battery extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      batteryP: '',
      batteryS: '',
      error: {
        message: ''
      }
    }
  }

  componentDidMount() {

	let userId = read_cookie('userId');
	let JWTToken = read_cookie('token');
	let request = new XMLHttpRequest();
	let FETCH_URL = BASE_URL + "tracker/71test";
	let that = this;
	console.log('Token', JWTToken);
	console.log('usrId', userId);
    console.log(' DIOCANE : ');
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
        let perc =  myObj.tracker.battery[0].pourcentage;
        let stat;
        if (perc < 10) {
          stat = -1
        } else if (perc >= 10 && perc < 30){
          stat = 0
        } else {
          stat = 1
        }
        console.log('stat : ', stat);
        console.log('perc : ', perc);
        that.setState({
          batteryP: perc,
          batteryS : stat,
        });
        }
      }
      request.send(JSON.stringify());
    }



  render() {
    return (
      <div className="App">
        {this.state.batteryS === 0 &&
          <img src={low} role="presentation" className="iconDiv"/>
        }
        {this.state.batteryS === -1 &&
          <img src={critical} role="presentation" className="iconDiv"/>
        }
        {this.state.batteryS === 1 &&
          <img src={normal} role="presentation" className="iconDiv"/>
        }
        {Math.round(this.state.batteryP)}%
      </div>
    )
  }
}

export default Battery;
