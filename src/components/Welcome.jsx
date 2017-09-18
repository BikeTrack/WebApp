import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie, bake_cookie } from 'sfcookies';
import '../img/App.css';
import TopNavbar from './Navbar';
import gPlay from '../img/GooglePlay.png'
import aStore from '../img/AppStore.png'
import fra from '../lang/fr'
import eng from '../lang/en'
import ita from '../lang/it-IT';

let activeLang;
let lang = read_cookie('lang');
// eslint-disable-next-line
if (lang == "") {
  lang = "FR";
  bake_cookie('lang', 'FR')
}
if (lang === "FR") {
  activeLang = fra;
} else if (lang === "IT") {
  activeLang = ita;
} else {
  activeLang = eng;
}
class Welcome extends Component {

  componentDidMount() {
  	let token = read_cookie('token');
    let usr = read_cookie('userId');
    if (token !== "" && usr != ""){
      browserHistory.push('app');
    }
  }

  changePage(page) {
    browserHistory.push(page);
  }

  render() {
    return (
      <div className="App testtest">
            <TopNavbar />
            <div className="form-inline">
              <br/><br/><h2 className="App-intro">{activeLang.welcomeHead}</h2>
              <br/><br/><br/><br/>
              <p className="intro-text">{activeLang.welcomeIntro}</p>
                <br/><br/>
              <div className="stores">
                <button className="SignButton"
                  onClick={() => this.changePage("signup")}>{activeLang.buttSignup}</button>
                <button className="SignButton"
                  onClick={() => this.changePage("signin")}>{activeLang.buttSignin}</button>
              </div>
            </div>
            <div className="stores">
              <img src={gPlay} alt="Google Play" style={{padding: '50px'}}/>
              <img src={aStore} alt="Apple Store"  style={{padding: '50px'}}/>
            </div>
        </div>
    )
  }
}

export default Welcome;
