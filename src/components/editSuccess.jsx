import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie } from 'sfcookies';

import AppNavbar from './AppNavbar';
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

class editSuccess extends Component {

  backPage() {
    browserHistory.replace('/app');
  }

  render() {
    return (
      <div className="App bgGen bgSucc">
        <AppNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <div className="bgSpacer"></div>
          <div className="successTitle">{activeLang.infoSuccEdit}</div>
          <div className="bgSpacerMini"></div>
          <div style={{textAlign: 'center'}}>
            <button
            className="SignButton"
            type="button"
            onClick={() => this.backPage()}
            >{activeLang.buttBackList}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default editSuccess;
