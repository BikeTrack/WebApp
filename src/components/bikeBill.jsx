import React, { Component } from 'react';
import { read_cookie } from 'sfcookies';
import { browserHistory } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import '../img/App.css';
import { API_KEY, BASE_URL } from '../constants';
import AppNavbar from './AppNavbar';
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

class bikeBill extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      name: '',
      brand: '',
      bikeBill: '',
      userId:'',
      bikeId:'',
      error: {
        message: ''
      }
    }
  }

  componentDidMount() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let bikeId = read_cookie('bike');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "testPicture";
    // TEST MUST FAIL
    // let FETCH_URL = BASE_URL + "testPictures";
    let that = this;

    // console.log('Token', JWTToken);
    // console.log('usrId', userId);
    request.open('GET', FETCH_URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.setRequestHeader('x-access-token', JWTToken);
    request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        // DEBUGGING
        // console.log('Status:', this.status);
        // console.log('Headers:', this.getAllResponseHeaders());
        // console.log('Body:', this.responseText);
        that.setState({
          bikeBill: this.responseText
          });
        // console.log('PITRII Text', that.state.bikeBill)
      }
    };
    request.send(JSON.stringify());
  }

  postBill() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let bikeId = read_cookie('bike');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "bikePostBill";
    let that = this;
    // console.log('Token', JWTToken);
    // console.log('usrId', userId);
    request.open('POST', FETCH_URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.setRequestHeader('x-access-token', JWTToken);
    request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        // DEBUGGING
        // console.log('Status:', this.status);
        // console.log('Headers:', this.getAllResponseHeaders());
        // console.log('Body:', this.responseText);

      }
    };
    let body = {
      'bikeId' : bikeId,
      'photoBill' : null
      }
    request.send(JSON.stringify(body));
  }

    submit = () => {
      confirmAlert({
        title: 'Bike deletion',
        message: 'Do you really want to delete your bike?',
         childrenElement: () =>
        <div>
         <input
            className="form-control"
            type="file"
            placeholder="Email"
            required
            onChange={event => this.setState({biikeBill: event.target.value})}
         />
       </div>,
        confirmLabel: 'Yes',
        cancelLabel: 'Cancel',
        onConfirm: () => this.postBill(),
        // onCancel:
      })
    };

  render() {
    return (
      <div className="App bgGen bgBill">
        <AppNavbar />
        <div className="form-inline" type="text">
          <div className="center">
            <div className="bgSpacer"></div>
            <h3 className="App-intro">Bike Bills</h3>
            {!this.state.bikeBill &&
              <div className="bike-detail-box">
                SINCE YOU DON'T HAVE A BILL, ADD ONE NOW!
              </div>
            }
            {this.state.bikeBill &&
              <div className="bike-detail-box">
                  {this.state.bikeBill}
              </div>
            }
            <div className="bgSpacerMicro"></div>
            <button
              className="SignButton"
              style={{marginTop: '10px'}}
              onClick={this.submit}
              >
                Add a Bill
            </button>
          </div>
        </div>
        </div>
    )
  }
}

export default bikeBill;
