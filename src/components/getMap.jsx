/* global google */
import { _ } from "lodash";
import { default as React, Component} from "react";
import { Helmet } from "react-helmet";
import { withGoogleMap, GoogleMap, Marker} from "react-google-maps";

import { API_KEY, BASE_URL } from '../constants';
import { read_cookie, bake_cookie } from 'sfcookies';

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={5}
    defaultCenter={{ lat: read_cookie('lastlat'), lng: read_cookie('lastlng') }}

    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

export default class getMap extends Component {

  state = {
    apiKey: API_KEY,
    markers: [{
      position: {
        lat: "",
        lng: "",
      },
      key: "",
      defaultAnimation: "",
      },
    ],
  };

  componentDidMount() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "tracker/7462C";
    let that = this;
    console.log('Token', JWTToken);
    console.log('usrId', userId);

    request.open('GET', FETCH_URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.setRequestHeader('x-access-token', JWTToken);
    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
      if (this.status === 200)  {
        let myObj = JSON.parse(this.response);

        // console.log('MyObj locations LAT : ', myObj.tracker.locations[0].coordinates[0]);
        // console.log('MyObj locations LONG : ', myObj.tracker.locations[0].coordinates[1]);

        let i = myObj.tracker.locations.length - 2;
        bake_cookie('lastlat', myObj.tracker.locations[i].coordinates[1]);
        bake_cookie('lastlng', myObj.tracker.locations[i].coordinates[0]);

        // console.log("lastpos DIOCANE : ", myObj.tracker.locations[i].coordinates[1], myObj.tracker.locations[i].coordinates[0],);

        const nextMarkers = [
          ...that.state.markers,
          {
            position: {
              lat : myObj.tracker.locations[i].coordinates[1],
              lng : myObj.tracker.locations[i].coordinates[0],
            },
            defaultAnimation: 1,
            // key: "Last Position",
          },
          {
            position: {
              lat : myObj.tracker.locations[i-1].coordinates[1],
              lng : myObj.tracker.locations[i-1].coordinates[0],
            },
            defaultAnimation: 2,
            // key: "Last1",
          },
          {
            position: {
              lat : myObj.tracker.locations[i-2].coordinates[1],
              lng : myObj.tracker.locations[i-2].coordinates[0],
            },
            defaultAnimation: 2,
            // key: "Last2",
          },
          {
            position: {
              lat : myObj.tracker.locations[i-3].coordinates[1],
              lng : myObj.tracker.locations[i-3].coordinates[0],
            },
            defaultAnimation: 2,
            // key: "Last3",
          },
          {
            position: {
              lat : myObj.tracker.locations[i-4].coordinates[1],
              lng : myObj.tracker.locations[i-4].coordinates[0],
            },
            defaultAnimation: 2,
            // key: "Last4",
          },
        ];
        that.setState({
          markers: nextMarkers,
        });
      }
    };
    request.send(JSON.stringify());
  }


  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    console.log("Event latLng : ", event.latLng);
    console.log("NextMarkers : ", nextMarkers);
    this.setState({
      markers: nextMarkers,
    });

    if (nextMarkers.length === 3) {
      this.props.toast(
        `Right click on the marker to remove it`,
        `Also check the code!`
      );
    }
  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
    return (
      <div style={{height: `100%`}}>
        <Helmet
          title="Bike Location"
        />
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>
    );
  }
}
