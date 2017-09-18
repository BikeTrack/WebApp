import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie } from 'sfcookies';

import TopNavbar from './Navbar';
import '../img/App.css';
import fra from '../lang/fr.js'
import eng from '../lang/en.js'
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

class Failure extends Component {

  changePage(page) {
    browserHistory.replace(page);
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline">
          <div className="successTitle">{activeLang.signFail}</div>
          <div style={{textAlign: 'center'}}>
            <button
              className="SignButton center"
              type="button"
              onClick={() => this.changePage("welcome")}
              >{activeLang.buttBackHome}
            </button>
            <button
              className="SignButton center"
              type="button"
              onClick={() => this.changePage("signup")}
              >{activeLang.buttBackSignup}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Failure;
