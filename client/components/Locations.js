import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import NavBar from './NavBar'
import InfoModal from './InfoModal'
import * as helpers from '../helpers'

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

  render() {  

    //
    //  Map displays list of harcoded coordinates
    //  and each coordinate matches up by idx with
    //  what is stored in the temp art cache.
    //
    //  To Do:
    //  - add gps coordinates to temp cache
    //    * by making api calls to gapi when the 
    //      temp cache is created
    //  - modify map call below to map over 
    //    this.props.gallery instead of coords 
    //
    // coords for testing:
    //
    const coords = [{lat: 30.295874, lon: -97.715524},
                    {lat: 30.296874, lon: -97.715524},
                    {lat: 30.294874, lon: -97.715524},
                    {lat: 30.297874, lon: -97.715524},
                    {lat: 30.298874, lon: -97.715524},
                    {lat: 30.285874, lon: -97.715524},
                    {lat: 30.215874, lon: -97.715524},
                    {lat: 30.290874, lon: -97.715524},
                    {lat: 30.291874, lon: -97.715524},
                    {lat: 30.299874, lon: -97.715524}];

    return (
      <div>
        <NavBar />
        {this.props.showInfoModal ?
          <InfoModal 
            onClose={this.props.closeInfoModal} 
            updateCurrent={this.props.updateCurrentArt} 
            currentArt={this.props.currentArt} 
            parseImageUrl={helpers.parseImageUrl}
          /> :
          null}
        <Gmaps
          width={'100vw'}
          height={'100vh'}
          lat={30.274649}
          lng={-97.740370}
          zoom={12}
          loadingMessage={'Be happy'}
          params={{v: '3.exp', key: 'AIzaSyAzhwRABci2uwXxlC07KKYNmOzMde2Z1bY'}}
          onMapCreated={this.onMapCreated}>
          {coords.map((coord, idx) =>
            <Marker
              key={idx}
              lat={coord.lat}
              lng={coord.lon}
              draggable={false}
              onClick={this.props.openInfoModal.bind(null, this.props.gallery[idx])}
              onDragEnd={this.onDragEnd} />
          )}
        </Gmaps>
      </div>
    );
  }
};
