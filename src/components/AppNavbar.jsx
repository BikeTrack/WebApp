import React, { Component } from 'react';
import { Link } from 'react-router';
import '../img/App.css';
import logo from '../img/logo.png'

class AppNavbar extends Component {
  render() {
    return (
      <div className="App">
        <div className="navbar-inverse navbar-default" role="navigation">
          <ul>
            <li className="App-logo" style={{marginTop: '4px', marginBottom: '4px'}}><img src={logo} alt="logo" /></li>
            {/* <li className="header-text-website"><a href="https://www.biketrack.eu">WebSite</a></li> */}
            {/* <li className="header-text-website"><a href="http://eip.epitech.eu/2018/biketrack/">WebSite</a></li> */}
            <li className="header-text"><Link to={'/profile'}>Profile</Link></li>
            <li className="header-text"><Link to={'/app'}>Bike List</Link></li>
            <li className="header-text"><Link to={'/signup'}>Logout</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default AppNavbar;
