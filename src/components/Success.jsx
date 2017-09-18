import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie } from 'sfcookies';

import TopNavbar from './Navbar';
import '../img/App.css';
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

class Success extends Component {

  backPage() {
    browserHistory.replace('/welcome');
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline">
          <div className="successTitle">{activeLang.signupSucc}</div>
          <div style={{textAlign: 'center'}}>
            <button
            className="SignButton center"
            type="button"
            onClick={() => this.backPage()}
            >{activeLang.buttBackHome}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Success;
