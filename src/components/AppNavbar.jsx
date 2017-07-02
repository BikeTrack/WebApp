import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { delete_cookie } from 'sfcookies';
import '../img/App.css';
import logo from '../img/logo.png'

class AppNavbar extends Component {
  changePage(page) {
    browserHistory.push(page)
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
            <button className="SignButtonNav" onClick={() => this.changePage("profile")}>Profile</button>
            <button className="SignButtonNav" onClick={() => this.changePage("app")}>Bikes</button>
            <button className="SignButtonOut" onClick={() => this.destroyToken()}></button>
          </ul>
        <div>
        </div>
        </div>
      </div>
    )
  }
}

export default AppNavbar;
