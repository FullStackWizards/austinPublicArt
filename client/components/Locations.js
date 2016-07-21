import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import NavBar from './NavBar'
import Info from './Info'

export default class LocationsContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    }
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
    console.log(this.lat, this.lng, this.content)

  }

  render() {  

    //
    //  content tag in Marker stores entire coord...maybe to
    //  be used to display a mini modal?
    //
    //  modals need to be available site wide, would be good
    //  to have Marker's onClick pop up a modal for that art.
    //
    //  coords = hard coded coordinates for testing purposes.
    //        id will correspond to artwork id held in cache.
    //

    const coords = [{id: 0, lat: 30.295874, lng: -97.715524},
                    {id: 1, lat: 30.268915, lng: -97.740378}]

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
              draggable={false}
              content={coord}
              onClick={this.onClick}
              onDragEnd={this.onDragEnd} />
          )}
        </Gmaps>
      </div>
    );
  }

};

// ReactDOM.render(<App />, document.getElementById('gmaps'));