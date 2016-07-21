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
    console.log(this.props.gallery[0])

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

    const coords = [{
      lat: 30.295874, 
      lon: -97.715524
    }];

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
              onClick={this.props.openInfoModal.bind(null, this.props.gallery[0])}
              onDragEnd={this.onDragEnd} />
          )}
        </Gmaps>
      </div>
    );
  }

};
