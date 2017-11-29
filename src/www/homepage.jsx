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

class HomePage extends Component {

  render() {
    return (

      <div className="App bgGen bgWebsite">
        <TopNavbar />
        <div className="form-inline">
          <div className="bgSpacer"></div>

          {/* Group IMG */}
          <div className="iconsLiner statPres">Our fantastic team!</div>
          <div className="contBlock300 iconsLiner">
            <div className="insiderBlock33">
              <div className="bubbleImg felixImg"></div>
              <div className="iconText textSize25">Felix Moulin</div>
              <div className="textSize15">Hardware</div>
            </div>
            <div className="insiderBlock33">
              <div className="bubbleImg alexImg"></div>
              <div className="iconText textSize25">Alexandre Luternauer</div>
              <div className="textSize15">API developer</div>
            </div>
            <div className="insiderBlock33">
              <div className="bubbleImg damienImg"></div>
              <div className="iconText textSize25">Damien Lohmeyer</div>
              <div className="textSize15">Hardware</div>
            </div>
            <div className="insiderBlock33">
              <div className="bubbleImg adrienImg"></div>
              <div className="iconText textSize25">Adrien Schricke</div>
              <div className="textSize15">Android Developer</div>
            </div>
            <div className="insiderBlock33">
              <div className="bubbleImg valentinImg"></div>
              <div className="iconText textSize25">Valentin Wallet</div>
              <div className="textSize15">iOS Developer</div>
            </div>
            <div className="insiderBlock33">
              <div className="bubbleImg gabrieleImg"></div>
              <div className="iconText textSize25">Gabriele Marsili</div>
              <div className="textSize15">WebApp Developer</div>
            </div>
          </div>

          {/* Stats */}
          <div className="bgSpacerSmall" style={{borderBottom:'solid black 3px'}}></div>
          <div className="bgSpacerMini"></div>
          <div className="iconsLiner statPres">A few numbers about bikes, just to explain WHY our project is interesting :</div>
          <div className="contBlock150 iconsLiner" style={{borderBottom:'solid black 3px'}}>
            <div className="insiderBlock25">
              <div className="flaticons flaticonBought"></div>
              <div className="iconText textSize30">3M bought every year</div>
            </div>
            <div className="insiderBlock25">
              <div className="flaticons flaticonEuro"></div>
              <div className="iconText textSize30">900 avg price</div>
            </div>
            <div className="insiderBlock25">
              <div className="flaticons flaticonSuitcase"></div>
              <div className="iconText textSize30">400K Stolen</div>
            </div>
            <div className="insiderBlock25">
              <div className="flaticons flaticonLike"></div>
              <div className="iconText textSize30">100K Found</div>
            </div>
          </div>

          <div className="bgSpacerMini"></div>
          {/* Thankings */}
          <div className="iconsLiner statPres">A special thank you to our principal partners</div>
          <div className="contBlock200 iconsLiner">
            <div className="insiderBlock33">
              <div className="epitechIcon"></div>
              <div className="iconText textSize30">EPITECH</div>
            </div>
            <div className="insiderBlock33">
              <div className="specializedIcon"></div>
              <div className="iconText textSize30">Specialized</div>
            </div>
          </div>
          <div className="iconsLiner">BikeTrack, since 2015 ©</div>
        </div>
        <br/><br/>
      </div>
    )
  }
}

export default HomePage;
