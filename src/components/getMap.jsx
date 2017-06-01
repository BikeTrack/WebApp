import React, { Component } from 'react';
import '../img/App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


class getMap extends Component {

  render() {
    var position = [51.505, -0.09];
    var  map = (
        <Map center={position} zoom={13}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
    );
    return (map);
  }
}

export default getMap;
