import React, { Component } from 'react';
// import { read_cookie } from 'sfcookies';

import TopNavbar from '../components/Navbar';

import '../img/App.css';
import '../img/website.css';

/*import fra from '../lang/fr.js'
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
}*/

class Products extends Component {

    render() {
      return (

        <div className="App bgGen bgWebsite">
          <TopNavbar />
          <div className="form-inline">
            <div className="bgSpacer"></div>

            {/* Group IMG */}
            <div className="iconsLiner statPres">Our product will be sold in two different versions.</div>
            <div className="iconsLiner statPres textSize20">The principle is exactely the same, all it changes it's the form. Even the price will be the same, both around 80-100€</div>

            <div className="bgSpacerMini"></div>
            <div className="contBlock300 iconsLiner">
            <div className="imgPotence insiderBlock33"></div>
            <div className="textSize20 insiderBlock33">The first product, the Connected Stam, looks like a simple bike part, but inside it it's hidden a GPS tracker that will lead you right to your bike in case of theft</div>

            </div>
                <div className="bgSpacerSmall"  style={{borderBottom:'solid black 3px'}}></div>

            <div className="bgSpacerMini"></div>
            <div className="contBlock300 iconsLiner">
                <div className="imgStick insiderBlock33"></div>
                <div className="textSize20 insiderBlock33" style={{marginTop: '-200px' }}>The second product, the Stick, follows the same concept, except for the fact that this time you'll be able to use it for any kind of vehicle (bike, car, motorbike, wife etc ).</div>
                <div className="bgSpacerMini"></div>
                <div className="bgSpacerMini"></div>
                <div className="iconText textSize20">Both the products work with our three applications: iOS, Android and Web.</div><br/>
                <div className="iconText textSize20">Once connected the device to our account, you will be a click away from being able to track every movement of your bike.</div>

            </div>
            <div className="bgSpacerSmall"></div>
            <div className="bgSpacerMini"></div>
            <div className="iconsLiner">BikeTrack, since 2015 ©</div>
          </div>
          <br/><br/>
        </div>
      )
    }
  }

export default Products;
