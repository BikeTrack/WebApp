import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie, bake_cookie } from 'sfcookies';
import '../img/App.css';
import TopNavbar from './Navbar';
import gPlay from '../img/GooglePlay.png'
import aStore from '../img/AppStore.png'
import blLogo from '../img/bigBlackLogo1.png'
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
    // eslint-disable-next-line
    if (token !== "" && usr != ""){
      browserHistory.push('app');
    }
  }

  changePage(page) {
    browserHistory.push(page);
  }

 /*
 *  Diviser en blocks l'affichage de la page de façon que ce soit géré comme sur le site paypal
 */


  render() {
    return (
      <div className="App bgGen bgHome">
            <TopNavbar />
            <div className="form-inline">
              <div className="princLogo">
                <img src={blLogo} role="presentation"/>
              </div>
              <h2 className="App-intro">{activeLang.welcomeHead}</h2>
              {/* <p className="intro-text">{activeLang.welcomeIntro}</p> */}
                <br/>
              <div className="stores">
                <button className="SignButton"
                  onClick={() => this.changePage("signup")}>{activeLang.buttSignup}</button>
                <button className="SignButton"
                  onClick={() => this.changePage("signin")}>{activeLang.buttSignin}</button>
              </div>
              <div style={{textAlign:'center', color:'red'}}>Forgot your password?</div>
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
