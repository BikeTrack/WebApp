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

class delBikeSuccess extends Component {

  backPage() {
    browserHistory.replace('/app');
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <div className="successTitle">{activeLang.detailsRemove}</div>
          <div style={{textAlign: 'center'}}>
            <button
            className="SignButton"
            type="button"
            onClick={() => this.backPage()}
            >{activeLang.buttBackBike}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default delBikeSuccess;
