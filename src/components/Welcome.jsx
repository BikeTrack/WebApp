import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { read_cookie, bake_cookie } from 'sfcookies';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { API_KEY, BASE_URL } from '../constants'
import '../img/App.css';
import TopNavbar from './Navbar';
import gPlay from '../img/GooglePlay.png'
import aStore from '../img/AppStore.png'
import blLogo from '../img/bigBlackLogo1.png'
import fra from '../lang/fr'
import eng from '../lang/en'
import ita from '../lang/it-IT';

var _reactDom = require('react-dom');

let activeLang;
let lang = read_cookie('lang');
// eslint-disable-next-line
if (lang == "") {
  lang = "FR";
  bake_cookie('lang', 'FR')
}
if (lang === "FR") {
  activeLang = fra;
} else if (lang === "IT") {
  activeLang = ita;
} else {
  activeLang = eng;
}
class Welcome extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      apiKey: API_KEY,
      passwordCheck: '',
      lname: '',
      fname: '',
      birthday: '',
      error: {
        message: ''
      }
    }
  }

  componentDidMount() {
  	let token = read_cookie('token');
    let usr = read_cookie('userId');

    // eslint-disable-next-line
    if (token !== "" && usr != ""){
      browserHistory.push('app');
    }
  }

  changePage(page) {
    browserHistory.push(page);
  }

 /*
 *  Diviser en blocks l'affichage de la page de façon que ce soit géré comme sur le site paypal
 */

 signInReq() {
   if (this.state.email && this.state.password) {
     const { email, password } = this.state;
     let request = new XMLHttpRequest();
     let FETCH_URL = BASE_URL + "authenticate";
     let success = false;

     request.open('POST', FETCH_URL);
     request.setRequestHeader('Content-Type', 'application/json');
     request.setRequestHeader('Authorization', this.state.apiKey);
     request.onreadystatechange = function () {
     if (this.readyState === 4) {
       // Debugging
         // console.log('Status:', this.status);
         // console.log('Headers:', this.getAllResponseHeaders());
         // console.log('Body:', this.responseText);
       }
     if (this.status === 200) {
         success = true;
         let myObj = JSON.parse(this.response);
         bake_cookie('token', myObj.token);
         bake_cookie('userId', myObj.userId);
       }
     };
     let body = {
       'mail': email,
       'password': password
     };
     request.send(JSON.stringify(body));
     setTimeout(function() {
         if (success) {
           browserHistory.push('/app');
         } else {
           browserHistory.push('/failure');
         }
       }, 3000)
     }
   }


   signUpReq() {
     const { email, password, passwordCheck, lname, fname, birthday} = this.state;
     if (email && password && fname && lname && password === passwordCheck) {
       let request = new XMLHttpRequest();
       let FETCH_URL = BASE_URL + "signup";
       let success = false;
       request.open('POST', FETCH_URL);

       request.setRequestHeader('Content-Type', 'application/json');
       request.setRequestHeader('Authorization', this.state.apiKey);
       request.onreadystatechange = function () {
         if (this.readyState === 4) {
           // Debugging
           console.log('Status:', this.status);
           console.log('Headers:', this.getAllResponseHeaders());
           console.log('Body:', this.responseText);
         }
         if (this.status === 200) {
             success = true;
         }
       };
       // Debugging
       // console.log('this.state.apiKey', this.state.apiKey);
       // console.log('this.state.email', this.state.email);
       // console.log('this.state.password', this.state.password);
       let body = {
         'mail': email,
         'password': password,
         'lastname': lname,
         'name': fname,
         'dob': birthday,
       };
       request.send(JSON.stringify(body));
       setTimeout(function() {
           if (success) {
             browserHistory.push('/success');
           } else {
             browserHistory.push('/failure');
           }
         }, 3000)
       }
     }

closeChange = (sign) => {
  var target = document.getElementById('react-confirm-alert');
  _reactDom.unmountComponentAtNode(target);
  target.parentNode.removeChild(target);
  var svg = document.getElementById('react-confirm-alert-firm-svg');
  svg.parentNode.removeChild(svg);
  document.body.children[0].classList.remove('react-confirm-alert-blur');
  if (sign === "in") {
    this.signin();
  } else {
    this.signup();
  }

}

 signin = () => {
   confirmAlert({
     title: 'Bien retournés!',
     message: 'Connexion à l\'espace personnel',
     childrenElement: () =>
          <div className="form-inline contBlock150 iconsLiner">
            <input
               className="form-control insiderBlock33 signupBlockRound"
               type="text"
               placeholder="Email"
               required
               onChange={event => this.setState({email: event.target.value})}
            /><br/>
            <input
               className="form-control insiderBlock33 signupBlockRound"
               type="password"
               placeholder="Password"
               required
               onChange={event => this.setState({password: event.target.value})}
             /><br/>
            <button className="linkButton" onClick={() => this.closeChange("up")} >{activeLang.buttSignupAlt}</button>
        </div>, // Custom UI or Component
     confirmLabel: 'Connexion',
     // cancelLabel: 'No',
     onConfirm: () => this.signInReq(),
     // onCancel:
   })
 };

 signup = () => {
   confirmAlert({
     title: 'Inscription Biketrack!',
     message: 'Trouvez votre vélo partout',
     childrenElement: () =>
          <div className="form-inline contBlock350 iconsLiner">
            <br/>
            <input
              className="form-control insiderBlock33 signupBlockRound"
              type="text"
              placeholder="First Name"
              required="required"
              onChange={event => this.setState({fname: event.target.value})}
            />
            <input
              className="form-control insiderBlock33 signupBlockRound"
              type="text"
              placeholder="Last Name"
              required="required"
              onChange={event => this.setState({lname: event.target.value})}
            /><br/>
            <input
              className="form-control insiderBlock33 signupBlockRound"
              type="text"
              placeholder="Bithday"
              onChange={event => this.setState({birthday: event.target.value})}
            />
            <input
              className="form-control insiderBlock33 signupBlockRound"
              type="text"
              placeholder="email"
              required="required"
              onChange={event => this.setState({email: event.target.value})}
            /><br/>
            <input
              className="form-control insiderBlock33 signupBlockRound"
              type="password"
              placeholder="password"
              required="required"
              onChange={event => this.setState({password: event.target.value})}
            />
            <input
              id="checked"
              className="form-control insiderBlock33 signupBlockRound"
              type="password"
              placeholder="Repeat password"
              required="required"
              onChange={event => this.setState({passwordCheck: event.target.value})}
            /><br/>
            <button className="linkButton" onClick={() => this.closeChange("in")} >{activeLang.buttSigninAlt}</button>
        </div>, // Custom UI or Component
     confirmLabel: 'Connexion',
     // cancelLabel: 'No',
     onConfirm: () => this.signUpReq(),
     // onCancel:
   })
 };

  render() {
    return (
      <div className="App bgGen bgHome">
            <TopNavbar />
            <div className="form-inline">
              <div className="princLogo">
                <img src={blLogo} role="presentation"/>
              </div>
              <div className="bgSpacerMini"></div>
              <h2 className="App-intro">{activeLang.welcomeHead}</h2>
              <p className="intro-text">{activeLang.welcomeIntro}</p>
                <br/>
              <div className="stores">
                <button className="SignButton"
                  onClick={this.signup}>
                  {/* onClick={() => this.changePage("signup")}> */}
                  {activeLang.buttSignup}
                </button>
                <button className="SignButton"
                  onClick={this.signin}>
                  {/* onClick={() => this.changePage("signin")}> */}
                  {activeLang.buttSignin}
                </button>
              </div>
              <div style={{textAlign:'center', color:'red'}}>{activeLang.buttForgot}</div>
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
