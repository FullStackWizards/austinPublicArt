import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import NavBar from './NavBar'

// const coords = {
//   lat: 30.268915,
//   lng: -97.740378
// };

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

    const coords = [{lat: 30.295874, lng: -97.715524},
                    {lat: 30.268915, lng: -97.740378}]

    return (
      <div>
        <NavBar />
        <Gmaps
          width={'100vw'}
          height={'100vh'}
          lat={30.274649}
          lng={-97.740370}
          zoom={12}
          loadingMessage={'Be happy'}
          params={{v: '3.exp', key: 'AIzaSyAzhwRABci2uwXxlC07KKYNmOzMde2Z1bY'}}
          onMapCreated={this.onMapCreated}
        >
          {coords.map((coord, idx) =>
            <Marker
              key={idx}
              lat={coord.lat}
              lng={coord.lng}
              draggable={true}
              onDragEnd={this.onDragEnd} />
          )}
        </Gmaps>
      </div>
    );
  }

};

// ReactDOM.render(<App />, document.getElementById('gmaps'));