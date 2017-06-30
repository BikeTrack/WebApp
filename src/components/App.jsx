import React, { Component } from 'react';
import { read_cookie, bake_cookie } from 'sfcookies';
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
      console.log('myObj mail : ', myObj.user.mail);
      console.log('myObj create : ', myObj.user.created);
      console.log('myObj update : ', myObj.user.updated);
      }
    };
    request.send(JSON.stringify());
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
        'tracker' : userId + "Trxr"
      }
    };
    request.send(JSON.stringify(body));
    setTimeout(function() {
        if (success) {
          browserHistory.push('/addSuccess');
        } else {
          browserHistory.push('/failure');
        }
      }, 3000)
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
          browserHistory.push('/delbikesuccess');
        } else {
          browserHistory.push('/failure');
        }
      }, 3000)
  }

  bikeDetails(bike) {
    bake_cookie('bike', bike);
    browserHistory.push('/bikedetails');
  }

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
    //                 <button
    //                   className="btn btn-danger"
    //                   style={{marginTop: '10px'}}
    //                   onClick={() => this.deleteBike(this.state.bikes[i])}
    //                   >
    //                     Delete bike
    //                 </button>
    //
    //               </div>
    //             );
    // }

    return (
      <div className="App">
        <AppNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <h2 className="intro-text">Welcome to your personal Biketrack space</h2>
          <h3 className="intro-text">Bike List</h3>

          {/* Part 2 of the dynamicity of the code*/}

          {/* <div>
           {bikeList}
          </div> */}


          {/* This is just disgusting, but it's the only way i have now to make it work at the moment */}
          {/* Remove ASAP from : */}
          {/* START */}
          {this.state.bikes[0] &&
            <div className="bike-box">
              Velo 1 :
              <button
                className="btn"
                style={{marginTop: '10px'}}
                onClick={() => this.bikeDetails(this.state.bikes[0])}
                >
                {this.state.bikes[0]}
              </button>
              <button
                className="btn btn-danger"
                style={{marginTop: '10px'}}
                onClick={() => this.deleteBike(this.state.bikes[0])}
                >
                  Delete bike
              </button>
            </div>
          }

          {this.state.bikes[1] &&
            <div className="bike-box">
              Velo 2 :
              <button
                className="btn"
                style={{marginTop: '11px'}}
                onClick={() => this.bikeDetails(this.state.bikes[1])}
                >
                {this.state.bikes[1]}
              </button>
              <button
                className="btn btn-danger"
                style={{marginTop: '11px'}}
                onClick={() => this.deleteBike(this.state.bikes[1])}
                >
                  Delete bike
              </button>
            </div>
          }

          {this.state.bikes[2] &&
            <div className="bike-box">
              Velo 3 :
              <button
                className="btn"
                style={{marginTop: '12px'}}
                onClick={() => this.bikeDetails(this.state.bikes[2])}
                >
                {this.state.bikes[2]}
              </button>
              <button
                className="btn btn-danger"
                style={{marginTop: '12px'}}
                onClick={() => this.deleteBike(this.state.bikes[2])}
                >
                  Delete bike
              </button>
            </div>
          }


          {this.state.bikes[3] &&
            <div className="bike-box">
              Velo 4 :
              <button
                className="btn"
                style={{marginTop: '13px'}}
                onClick={() => this.bikeDetails(this.state.bikes[3])}
                >
                {this.state.bikes[3]}
              </button>
              <button
                className="btn btn-danger"
                style={{marginTop: '13px'}}
                onClick={() => this.deleteBike(this.state.bikes[3])}
                >
                  Delete bike
              </button>
            </div>
          }


          {this.state.bikes[4] &&
            <div className="bike-box">
              Velo 5 :
              <button
                className="btn"
                style={{marginTop: '14px'}}
                onClick={() => this.bikeDetails(this.state.bikes[4])}
                >
                {this.state.bikes[4]}
              </button>
              <button
                className="btn btn-danger"
                style={{marginTop: '14px'}}
                onClick={() => this.deleteBike(this.state.bikes[4])}
                >
                  Delete bike
              </button>
            </div>
          }
          {/* END */}



          <div className="form-group">
            <input
              className="form-control"
              type="text"
              style={{marginRight: '7px'}}
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
