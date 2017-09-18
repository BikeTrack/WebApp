import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie, bake_cookie } from 'sfcookies';
import '../img/App.css';
import logo from '../img/logo-small.png'
import fra from '../lang/fr';
import eng from '../lang/en';
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

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

class TopNavbar extends Component {
  changePage(page) {
    browserHistory.push(page);
  }

    changeLanguage(lang) {
      if (lang) {
        bake_cookie('lang', lang);
      }
      location.reload();
    }

    myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

  render() {
    return (
      <div className="App">
        <div className="App-header" role="navigation">
          <ul>
            <li className="App-logo"><img src={logo} alt="logo" /></li>
            <button className="SignButtonNav" onClick={() => this.changePage("welcome")}>{activeLang.buttHome}</button>
            <button className="SignButtonNav" onClick={() => this.changePage("signin")}>{activeLang.buttSignin}</button>
            <button className="SignButtonNav" onClick={() => this.changePage("signup")}>{activeLang.buttSignup}</button>
            <li className="header-text-website"><a href="http://eip.epitech.eu/2018/biketrack/">{activeLang.buttWebSite}</a></li>
            <div className="dropdown">
               <button className="dropbtn" onClick={() => this.myFunction()}></button>
               <div className="dropdown-content" id="myDropdown">
                 <button className="SignButtonEn" onClick={() => this.changeLanguage("EN")}></button>
                 <button className="SignButtonFr" onClick={() => this.changeLanguage("FR")}></button>
                 <button className="SignButtonIt" onClick={() => this.changeLanguage("IT")}></button>
               </div>
             </div>
          </ul>
        </div>
      </div>
    )
  }
}

export default TopNavbar;
