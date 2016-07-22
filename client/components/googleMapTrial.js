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
    console.log(this.state.lat,this.state.lng,this.state.location.lat,this.state.location.lng)
     var R = 6371000
     var lat1 = this.state.lat*Math.PI/180
     var lng1 = this.state.lng*Math.PI/180
     var lat2 =this.state.location.lat*Math.PI/180
     var lng2 = this.state.location.lng*Math.PI/180
     var deltaLat = lat1-lat2
     var deltaLng = lng1-lng2
     var a =  Math.sin(deltaLat/2)*Math.sin(deltaLat/2)+Math.cos(lat1)*Math.cos(lat2)*Math.sin(deltaLng/2)*Math.sin(deltaLng/2);
     var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     var d = R*c
     console.log("D",lat1,lat2,lng1,lng2,deltaLat,deltaLng,a,c,d)

    var lat = this.state.lat
    console.log("work?",lat*Math.PI/180)
    return (
      <Gmaps
        width={'800px'}
        height={'400px'}
        lat={this.state.lat}
        lng={this.state.lng}
        zoom={d>10000?10:15} 
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