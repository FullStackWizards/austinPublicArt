import React from 'react'
//import Map from './Map'
//import {GoogleApiWrapper} from 'GoogleMapsReactComponent'
import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react'


export class TheMap extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			artistLocations: [],
			activeMarker:{},
			showingInfoWindow:false,
			selectedPlace:{}
		}
		console.log("this",this)

	}


onMarkerClick(props, marker, e){
	console.log("hey now")
	this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

}
onMapClicked(props){
	console.log("OH MY")
	if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }

}
  render() {
  	const style = {
      width: '100vw',
      height: '100vh'
    }
    var positions = this.props.artists;
    console.log(this.props.artists[0])
    console.log('SO',this.props)

    
    return (
      <div style={style}>
      <Map google={this.props.google} zoom={14} onClick={this.onMapClicked.bind(this)} initialCenter = {
    {lat: 30.267153,
    lng: -97.743061}
  }>
  {positions.map(yup=>{
  	return(<Marker name = 'hey now' onClick={this.onMarkerClick.bind(this)} position = {yup}/>)
  })}
  <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
 
  

  
</Map>

      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBBJCIum7iZSy8nRDjJhSjFjRx4nrGZiPU'
})(TheMap)