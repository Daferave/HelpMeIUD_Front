import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

let marker;

class MapEdit extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    map: null,
    maps: null,
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11,
  };

  handleApiLoaded = (map, maps) => {
    this.setState({map});
    this.setState({maps});

}

_onClickMap = (event) => {
    console.log(event)
    console.log(this.state.map)
    console.log(this.state.maps)
    const location = {lat: event.lat, lng: event.lng};
    if(marker){
        console.log(location)
        marker.setPosition(location);
    }else{
        marker = new this.state.maps.Marker({
            position: location,
            draggable: true,
            label: location.lat + ", " + location.lng,
            map: this.state.map,
            streetViewControl: true
        });
    }

    this.props.onClickMap(event, this.state.map)
}

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  showPosition = (position) => {
    this.setState({center: {lat: position.coords.latitude,
    lng: position.coords.longitude}});
  }

  componentDidMount = () => {
    this.getLocation();
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          draggable="true"
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded( map, maps)}
          onClick={this._onClickMap}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapEdit;