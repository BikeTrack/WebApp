import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie } from 'sfcookies';

import TopNavbar from './Navbar';
import '../img/App.css';
import fra from '../lang/fr.js'
import eng from '../lang/en.js'

let activeLang;
let lang = read_cookie('lang');
if (lang === "FR") {
  activeLang = fra;
} else {
  activeLang = eng;
}

class Failure extends Component {

  changePage(page) {
    browserHistory.replace(page);
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline">
          <div className="successTitle">Signup/signin failed, some of the informations you gave are not valid.</div>
          <div className="form-group">
          <div style={{textAlign: 'center'}}>
            <button
              className="SignButton"
              type="button"
              onClick={() => this.changePage("welcome")}
              >{activeLang.buttBackHome}
            </button>
            <button
              className="SignButton"
              type="button"
              onClick={() => this.changePage("signup")}
              >{activeLang.buttBackSignup}
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Failure;
