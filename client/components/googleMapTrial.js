import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';


export default class AMap extends React.Component {

constructor(props) {
    super(props)

    this.state = {
      lat:Number(this.props.location[0]),
      lng: Number(this.props.location[1]),
      location:{}
    }

    console.log("Location",this.props.location)
     navigator.geolocation.getCurrentPosition(suc.bind(this),fail);
    function suc(position){
 var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    this.setState({location:{lat:latitude,lng:longitude}})
    }
    function fail(){
      console.log("booo!")
    }
  }
 


  onMapCreated(map) {
    map.setOptions({


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
      <Gmaps
        width={'800px'}
        height={'400px'}
        lat={(this.state.lat+this.state.location.lat)/2}
        lng={(this.state.lng+this.state.location.lng)/2}
        zoom={15}
        loadingMessage={'Be happy'}
        params={{v: '3.exp', key: 'AIzaSyBBJCIum7iZSy8nRDjJhSjFjRx4nrGZiPU'}}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={this.state.lat}
        lng={this.state.lng}
          draggable={true}
          onDragEnd={this.onDragEnd} />
          <Marker
          lat = {this.state.location.lat}
          lng = {this.state.location.lng}
          />
        <InfoWindow
          lat={this.state.lat}
        lng={this.state.lng}
          content={'Art'}
          onCloseClick={this.onCloseClick} />
          <InfoWindow
           lat = {this.state.location.lat}
          lng = {this.state.location.lng}
          content={'You'}
          onCloseClick={this.onCloseClick} />
      
      </Gmaps>

    );
  }

};