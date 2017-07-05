import React, { Component } from 'react';
import { read_cookie, bake_cookie } from 'sfcookies';
import { browserHistory } from 'react-router';

import '../img/App.css';
import { API_KEY, BASE_URL } from '../constants'
import AppNavbar from './AppNavbar';
import Battery from './getBattery';

import low from '../img/batteryLow.png';
import normal from '../img/battery.png';
import critical from '../img/batteryCritical.png';
import plus from '../img/add.png';
import bike from '../img/bicycle.png';
import fra from '../lang/fr.js'
import eng from '../lang/en.js'

let activeLang;
let lang = read_cookie('lang');

if (lang === "FR") {
  activeLang = fra;
} else {
  activeLang = eng;
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      name: '',
      brand: '',
      mail:'',
      id:'',
      created:'',
      updated:'',
      bikes: '',
      bName: '',
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

    // console.log('Token', JWTToken);
    // console.log('usrId', userId);

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

  bikeDetails(bike) {
    bake_cookie('bike', bike);
    browserHistory.push('/bikedetails');
  }

  addBike() {
    browserHistory.push('/addbike');
  }

  // getName(bikeId) {
  //   let userId = read_cookie('userId');
  //   let JWTToken = read_cookie('token');
  //   let request = new XMLHttpRequest();
  //   let FETCH_URL = BASE_URL + "bike/" + bikeId;
  //
  //   console.log('Token', JWTToken);
  //   console.log('usrId', userId);
  //
  //   request.open('GET', FETCH_URL);
  //   request.setRequestHeader('Content-Type', 'application/json');
  //   request.setRequestHeader('Authorization', this.state.apiKey);
  //   request.setRequestHeader('x-access-token', JWTToken);
  //   request.onreadystatechange = function () {
  //   if (this.readyState === 4) {
  //       console.log('Status:', this.status);
  //       console.log('Headers:', this.getAllResponseHeaders());
  //       console.log('Body:', this.responseText);
  //     }
  //   if (this.status === 200)  {
  //
  //     let myObj = JSON.parse(this.response);
  //
  //     console.log('PITRIPITRIPITRIPITRIPITRIPITRIPITRIPITRIPITRIPITRI');
  //     return (myObj.bike.brand + "-" + myObj.bike.name);
  //     }
  //   };
  //   request.send(JSON.stringify());
  // }


  render() {
    /* This brings dynamicity and performance to the code but still don't know how to implement it properly for it to work on DELETES and DETAILS of bikes */

    // var bikeList = [];
    // for (var i = 0; this.state.bikes[i]; i++) {
    //   bikeList.push(            <div className="bike-box">
    //                 Velo {i + 1}:
    //                 <button
    //                   className="btn"
    //                   style={{marginTop: '10px'}}
    //                   // onClick={() => this.bikeDetails(this.state.bikes[0])}
    //                   >
    //                   {this.state.bikes[i]}
    //                 </button>
    //               </div>
    //             );
    // }

    return (
      <div className="App">
        <AppNavbar />
        <div className="gen-box">
          <div className="form-inline" style={{margin: '5px'}}>
            <br/><br/><h2 className="App-intro">{activeLang.appHead}</h2>
            <h3 className="intro-text">{activeLang.appList}</h3>

            {/* Part 2 of the dynamicity of the code*/}

            {/* <div>
             {bikeList}
            </div> */}

            {/* This is just disgusting, but it's the only way i have now to make it work at the moment */}
            {/* Remove ASAP from : */}
            {/* START */}

            {!this.state.bikes[0] &&
              <div className="bike-box">
                <h3 className="intro-text">{activeLang.appStarted}</h3>
              </div>
            }

            {this.state.bikes[0] &&
              <div className="bike-box">
                <img src={bike} role="presentation" className="iconDiv"/>
                {activeLang.appBike} :
                <button
                  className="SignButton"
                  style={{marginTop: '10px'}}
                  onClick={() => this.bikeDetails(this.state.bikes[0])}
                  >
                  {this.state.bikes[0]}
                </button>
                <Battery />
              </div>
            }

            {this.state.bikes[1] &&
              <div className="bike-box">
                <img src={bike} role="presentation" className="iconDiv" />
                {activeLang.appBike} :
                <button
                  className="SignButton"
                  style={{marginTop: '11px'}}
                  onClick={() => this.bikeDetails(this.state.bikes[1])}
                  >
                  {this.state.bikes[1]}
                </button>
                <Battery />
                {/* <img src={low} role="presentation" className="iconDiv"/> */}
              </div>
            }

            {this.state.bikes[2] &&
              <div className="bike-box">
                <img src={bike} role="presentation" className="iconDiv"/>
                {activeLang.appBike} :
                <button
                  className="SignButton"
                  style={{marginTop: '12px'}}
                  onClick={() => this.bikeDetails(this.state.bikes[2])}
                  >
                  {this.state.bikes[2]}
                </button>
                <Battery />
                {/* <img src={critical} role="presentation" className="iconDiv"/> */}
              </div>
            }

            {this.state.bikes[3] &&
              <div className="bike-box">
                <img src={bike} role="presentation" className="iconDiv"/>
                {activeLang.appBike} :
                <button
                  className="SignButton"
                  style={{marginTop: '13px'}}
                  onClick={() => this.bikeDetails(this.state.bikes[3])}
                  >
                  {this.state.bikes[3]}
                </button>
                <Battery />
                {/* <img src={low} role="presentation" className="iconDiv"/> */}
              </div>
            }

            {this.state.bikes[4] &&
              <div className="bike-box">
                <img src={bike} role="presentation" className="iconDiv"/>
                {activeLang.appBike} :
                <button
                  className="SignButton"
                  style={{marginTop: '14px'}}
                  onClick={() => this.bikeDetails(this.state.bikes[4])}
                  >
                  {this.state.bikes[4]}
                </button>
                <Battery />
                {/* <img src={normal} role="presentation" className="iconDiv"/> */}
              </div>
            }

            {this.state.bikes[5] &&
              <div className="bike-box">
                <img src={bike} role="presentation" className="iconDiv"/>
                {activeLang.appBike} :
                <button
                  className="SignButton"
                  style={{marginTop: '14px'}}
                  onClick={() => this.bikeDetails(this.state.bikes[4])}
                  >
                  {this.state.bikes[5]}
                </button>
                <Battery />
                {/* <img src={low} role="presentation" className="iconDiv"/> */}
              </div>
            }

            <br/><br/><br/>
            <img src={plus} alt="Add a New Bike"  className="iconDiv plusButton" onClick={() => this.addBike()}/>
            </div>
          </div>
          <div>{this.state.error.message}</div>
        </div>
    )
  }
}

export default App;
