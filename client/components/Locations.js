import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import NavBar from './NavBar'

const coords = {
  lat: 30.268915,
  lng: -97.740378
};

export default class LocationsContainer extends React.Component{
  constructor(props) {
    super(props);
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render() {
    return (
      <div>
        <NavBar />
        <Gmaps
          width={'100vw'}
          height={'100vh'}
          lat={coords.lat}
          lng={coords.lng}
          zoom={12}
          loadingMessage={'Be happy'}
          params={{v: '3.exp', key: 'AIzaSyAzhwRABci2uwXxlC07KKYNmOzMde2Z1bY'}}
          onMapCreated={this.onMapCreated}>
          <Marker
            lat={coords.lat}
            lng={coords.lng}
            draggable={true}
            onDragEnd={this.onDragEnd} />
          <InfoWindow
            lat={coords.lat}
            lng={coords.lng}
            content={'Thanks Patrick!'}
            onCloseClick={this.onCloseClick} />
          <Circle
            lat={coords.lat}
            lng={coords.lng}
            radius={500}
            onClick={this.onClick} />
        </Gmaps>
      </div>
    );
  }

};

// ReactDOM.render(<App />, document.getElementById('gmaps'));