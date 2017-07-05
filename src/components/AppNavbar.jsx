import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { delete_cookie, bake_cookie, read_cookie } from 'sfcookies';
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

class AppNavbar extends Component {
  changePage(page) {
    browserHistory.push(page);
  }

  changeLanguage(lang) {
    if (lang) {
      bake_cookie('lang', lang);
    }
    location.reload();
  }

  destroyToken() {
    delete_cookie("token");
    delete_cookie("userId");
    browserHistory.push("welcome")
  }

  render() {
    return (
      <div className="App">
        <div className="App-header" role="navigation">
          <ul>
            <li className="App-logo" style={{marginTop: '4px', marginBottom: '4px'}}><img src={logo} alt="logo" /></li>
            <button className="SignButtonNav" onClick={() => this.changePage("profile")}>{activeLang.buttProfile}</button>
            <button className="SignButtonNav" onClick={() => this.changePage("app")}>{activeLang.buttBikes}</button>
            <button className="SignButtonOut" onClick={() => this.destroyToken()}></button>
            <button className="SignButtonEn" onClick={() => this.changeLanguage("EN")}></button>
            <button className="SignButtonFr" onClick={() => this.changeLanguage("FR")}></button>
          </ul>
        </div>
      </div>
    )
  }
}

export default AppNavbar;
