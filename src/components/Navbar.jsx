import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import '../img/App.css';
import logo from '../img/logo.png'

class TopNavbar extends Component {
  changePage(page) {
    browserHistory.push(page)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header" role="navigation">
          <ul>
            <li className="App-logo" style={{marginTop: '4px', marginBottom: '4px'}}><img src={logo} alt="logo" /></li>
            <button className="SignButtonNav" onClick={() => this.changePage("welcome")}>Home</button>
            <button className="SignButtonNav" onClick={() => this.changePage("signin")}>Sign In</button>
            <button className="SignButtonNav" onClick={() => this.changePage("signup")}>Sign Up</button>
            <li className="header-text-website"><a href="http://eip.epitech.eu/2018/biketrack/">WebSite</a></li>
          </ul>
        <div>
        </div>
        </div>
      </div>
    )
  }
}

export default TopNavbar;
