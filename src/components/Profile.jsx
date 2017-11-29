import React, { Component } from 'react';
import { read_cookie } from 'sfcookies';
import { browserHistory } from 'react-router';

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

class Profile extends Component {

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

  /* Push new page */
  changePage(page) {
    browserHistory.push(page);
  }

  render() {
    return (
      <div className="App bgGen bgProfile">
        <AppNavbar />
        <div className="gen-box">
          <div className="form-inline" style={{margin: '5px'}}>
            <button className="editButton" onClick={() => this.changePage("editprofile")}></button>
            <div className="bgSpacerMicro"></div>
            <h2 className="App-intro">{activeLang.profileHead}</h2>
            {/* <br/><br/><br/><br/><br/><br/>INSERER IMAGE UTILISATEUR ICI<br/><br/><br/><br/><br/><br/><br/><br/> */}
            <p className="intro-text profileInfo">{activeLang.genFName} : {this.state.fname}</p>
            <p className="intro-text profileInfo">{activeLang.genLName} : {this.state.lname}</p>
            <p className="intro-text profileInfo">{activeLang.genBday} : {this.state.birthday}</p>
            <p className="intro-text profileInfo">{activeLang.genMail} : {this.state.email}</p>
            <p className="intro-text profileInfo">{activeLang.genID} : {this.state.id}</p>
            <p className="intro-text profileInfo">{activeLang.genCreated} : {this.state.created}</p>
            <p className="intro-text profileInfo">{activeLang.genUpdated} : {this.state.updated}</p>
            <div className="form-group">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
