/* global google */
import { _ } from "lodash";
import { default as React, Component} from "react";
import { Helmet } from "react-helmet";
import { withGoogleMap, GoogleMap, Marker} from "react-google-maps";

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    defaultCenter={{ lat: 50.633333, lng: 3.066667 }}

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
    markers: [{
      position: {
        lat: 50.633333,
        lng: 3.066667,
      },
      key: `Actual`,
      defaultAnimation: 1,
    },
    {
      position: {
        lat: 50.65,
        lng: 3.0667,
      },
      key: `Actual-1`,
      defaultAnimation: 3,
    },
    {
      position: {
        lat: 50.633,
        lng: 3.0467,
      },
      key: `Actual-2`,
      defaultAnimation: 3,
    },
    {
      position: {
        lat: 50.64,
        lng: 3.0267,
      },
      key: `Actual-3`,
      defaultAnimation: 3,
    },
    {
      position: {
        lat: 50.63,
        lng: 3.0567,
      },
      key: `Actual-4`,
      defaultAnimation: 3,
    }],
  };

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
