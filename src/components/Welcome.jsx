import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie, bake_cookie } from 'sfcookies';
import '../img/App.css';
import TopNavbar from './Navbar';
import gPlay from '../img/GooglePlay.png'
import aStore from '../img/AppStore.png'
import fra from '../lang/fr.js'
import eng from '../lang/en.js'

let activeLang;
let lang = read_cookie('lang');
// eslint-disable-next-line
if (lang == "") {
  lang = "FR";
  bake_cookie('lang', 'FR')
}
if (lang === "FR") {
  activeLang = fra;
} else {
  activeLang = eng;
}

class Welcome extends Component {

    changePage(page) {
      browserHistory.push('/sign' + page)
    }

  render() {
    return (
      <div className="App">
            <TopNavbar />
            <div className="form-inline" style={{margin: '5px'}}>
              <br/><br/><h2 className="App-intro">{activeLang.welcomeHead}</h2>
              <br/><br/><br/><br/>
              <p className="intro-text">{activeLang.welcomeIntro}</p>
                <br/><br/>
              <div className="stores">

                <button className="SignButton"
                  onClick={() => this.changePage("up")}>{activeLang.buttSignup}</button>
                <button className="SignButton"
                  onClick={() => this.changePage("in")}>{activeLang.buttSignin}</button>
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
