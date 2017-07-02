import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import '../img/App.css';
import TopNavbar from './Navbar';
import gPlay from '../img/GooglePlay.png'
import aStore from '../img/AppStore.png'

class Welcome extends Component {
    changePage(page) {
      browserHistory.push('/sign' + page)
    }

  render() {
    return (
      <div className="App">
            <TopNavbar />
            <div className="form-inline" style={{margin: '5px'}}>
              <br/><h2 className="App-intro">Welcome on Biketrack's Web Platform</h2>
              <br/><br/><br/><br/>
              <p className="intro-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.</p>
                <br/><br/>
              <div className="stores">

                <button className="SignButton"
                  onClick={() => this.changePage("up")}>Sign Up</button>
                <button className="SignButton"
                  onClick={() => this.changePage("in")}>Sign In</button>
              </div>
            </div>
            <div className="stores">
              <img src={gPlay} alt="Google Play" style={{padding: '50px'}}/>
              <img src={aStore} alt="Apple Store"  style={{padding: '50px'}}/>
            </div>
        </div>
    )
  }
}

export default Welcome;
