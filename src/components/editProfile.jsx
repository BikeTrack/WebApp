import React, { Component } from 'react';
import { read_cookie, delete_cookie } from 'sfcookies';
import { browserHistory } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import '../img/App.css';
import { API_KEY, BASE_URL } from '../constants'
import AppNavbar from './AppNavbar';
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

class editProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      email:'',
      id:'',
      fname:'',
      lname:'',
      created:'',
      updated:'',
      bikes: '',
      birthday: '',
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
        // console.log('Status:', this.status);
        // console.log('Headers:', this.getAllResponseHeaders());
        // console.log('Body:', this.responseText);
      }
    if (this.status === 200)  {

      let myObj = JSON.parse(this.response);

      that.setState({
            id: myObj.user._id,
            email: myObj.user.email,
            fname: myObj.user.name,
            lname: myObj.user.lastname,
            created: myObj.user.created,
            updated: myObj.user.updated,
            bikes: myObj.user.bikes,
            birthday: myObj.user.dob
          });
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
    if (this.readyState === 4 & this.status === 200) {
        // DEBUGGING
        // console.log('Status:', this.status);
        // console.log('Headers:', this.getAllResponseHeaders());
        // console.log('Body:', this.responseText);
        browserHistory.push('/delSuccess');
        delete_cookie("token");
        delete_cookie("userId");
      } else if (this.readyState === 4 & this.status !== 200) {
        browserHistory.push('/failure');
      }
    };
    let body = {
      'userId': userId,
    };
    request.send(JSON.stringify(body));
  }

  editUser() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "profile";
    let success = false;

    request.open('PATCH', FETCH_URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.setRequestHeader('x-access-token', JWTToken);
    request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        // DEBUGGING
        // console.log('Status:', this.status);
        // console.log('Headers:', this.getAllResponseHeaders());
        // console.log('Body:', this.responseText);
        browserHistory.push('/editSuccess');
      } else if (this.readyState === 4 && this.status === 200) {
        browserHistory.push('/failure');
      }
    };
    let body = {
      'userId': userId,
      'update': {
        email: this.state.email,
        name: this.state.fname,
        lastname: this.state.lname,
        dob: this.state.birthday,
      }
    };
    request.send(JSON.stringify(body));
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Do you really want to delete your biketrack account?',
      // childrenElement: () => <div>Custom UI</div>,           // Custom UI or Component
      confirmLabel: 'Yes',
      cancelLabel: 'No',
      onConfirm: () => this.deleteUser(),
      // onCancel:
    })
  };

  render() {
    return (
      <div className="App bgGen bgProfile">
        <AppNavbar />
        <div className="gen-box">
          <div className="form-inline" style={{margin: '5px'}}>
            <div className="bgSpacer"></div>
            <h2 className="App-intro">{activeLang.profileEdit}</h2>
            {/* <br/><br/><br/><br/><br/><br/>INSERER IMAGE UTILISATEUR ICI<br/><br/><br/><br/><br/><br/><br/><br/> */}
            <div className="form-group">
              <p className="intro-text profileInfo">{activeLang.genFName} : {this.state.fname}</p>
              <input
                className="form-control"
                style={{marginRight: '5px'}}
                placeholder="First Name"
                onChange={event => this.setState({fname: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.editUser()
                  }
                }}
              />
            <p className="intro-text profileInfo">{activeLang.genLName} : {this.state.lname}</p>
              <input
                className="form-control"
                style={{marginRight: '5px'}}
                placeholder="Last Name"
                onChange={event => this.setState({lname: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.editUser()
                  }
                }}
              />
            <p className="intro-text profileInfo">{activeLang.genBday} : {this.state.birthday}</p>
              <input
                className="form-control"
                style={{marginRight: '5px'}}
                placeholder="Birthday"
                onChange={event => this.setState({birthday: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.editUser()
                  }
                }}
              />
            <p className="intro-text profileInfo">{activeLang.genMail} : {this.state.email}</p>
              <input
                className="form-control"
                style={{marginRight: '5px'}}
                placeholder="Email"
                onChange={event => this.setState({email: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.editUser()
                  }
                }}
              />
              <div className="bgSpacerMicro"></div>
              <button
                className="SignButton"
                style={{marginTop: '10px'}}
                onClick={() => this.editUser()}
                >
                  {activeLang.buttEditUser}
              </button>
            </div>
            <div className="form-group">
              <button
                className="deleteUser"
                onClick={this.submit}
                >
                  {/* {activeLang.buttDelUser} */}
              </button>
            </div>

            <div>{this.state.error.message}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default editProfile;
