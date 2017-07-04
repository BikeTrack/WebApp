import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie, bake_cookie } from 'sfcookies';
import '../img/App.css';
import logo from '../img/logo-small.png'
import fra from '../lang/fr.js'
import eng from '../lang/en.js'

let activeLang;
let lang = read_cookie('lang');
if (lang === "FR") {
  activeLang = fra;
} else {
  activeLang = eng;
}


class TopNavbar extends Component {
  changePage(page) {
    browserHistory.push(page);
  }

    changeLanguage(lang) {
      if (lang) {
        bake_cookie('lang', lang);
      }
      location.reload();
    }

  render() {
    return (
      <div className="App">
        <div className="App-header" role="navigation">
          <ul>
            <li className="App-logo"><img src={logo} alt="logo" /></li>
            <button className="SignButtonNav" onClick={() => this.changePage("welcome")}>{activeLang.buttHome}</button>
            <button className="SignButtonNav" onClick={() => this.changePage("signin")}>{activeLang.buttSignin}</button>
            <button className="SignButtonNav" onClick={() => this.changePage("signup")}>{activeLang.buttSignup}</button>
            <li className="header-text-website"><a href="http://eip.epitech.eu/2018/biketrack/">{activeLang.buttWebSite}</a></li>
            <button className="SignButtonEn" onClick={() => this.changeLanguage("EN")}></button>
            <button className="SignButtonFr" onClick={() => this.changeLanguage("FR")}></button>
          </ul>
        <div>
        </div>
        </div>
      </div>
    )
  }
}

export default TopNavbar;
