import React from 'react'
//import Map from './Map'
//import {GoogleApiWrapper} from 'GoogleMapsReactComponent'
import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux';
import {fetchGoogle} from '../actions/index';

class TheMap extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			artistLocations: [],
			activeMarker:{},
			showingInfoWindow:false,
			selectedPlace:{},
			location:{},
		}
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



onMarkerClick(props, marker, e){
	console.log("hey now",marker)
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
      height: '95vh'
    }
    console.log("active",this.state.activeMarker)
    var positions = this.props.artists;
    console.log(this.props.artists[0])
    console.log('SO',this.state.location)
    console.log("thiss",this.props.google)
    if(this.props.google){
      this.props.fetchGoogle(this.props.google)
    }
    console.log("MONKEY",this.props.googley)
    return (
      <div style={style}>
      {this.state.location.lat?<Map google={this.props.google || this.props.googley} zoom={16} onClick={this.onMapClicked.bind(this)} initialCenter = {
    this.state.location
  }>
  <Marker name ={'Current Location'} className = {'homeMarker'} position = {this.state.location} onClick={this.onMarkerClick.bind(this)}/>
  {positions.map((yup,index)=>{
  	return(<Marker name = {this.props.artName[index]} onClick={this.onMarkerClick.bind(this)} location = {this.props.artLocation[index].split(';')[0]} title = {this.props.artTitle[index]} artistName = {this.props.artistName[index]} artWeb = {this.props.artWeb[index]} artImage = {this.props.artImage[index].split(';')[0]} position = {yup}/>)
  })}
  <InfoWindow 
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            {this.state.selectedPlace.title ? <div>
            	<h4 className="w3-xlarge w3-text-black w3-padding-medium">Title: {this.state.selectedPlace.title}</h4>
              	<h5 className="w3-xlarge w3-text-black w3-padding-medium">Location: {this.state.selectedPlace.name}</h5>
              	<h5 className="w3-xlarge w3-text-black w3-padding-medium">{this.state.selectedPlace.location}</h5>
              	<h5 className="w3-xlarge w3-text-black w3-padding-medium">Artist: {this.state.selectedPlace.artistName}</h5>
              	<img src={this.state.selectedPlace.artImage}/></div>
              :<div><h4 className="w3-xlarge w3-text-black w3-padding-medium">{this.state.selectedPlace.name}</h4></div>}
            
        </InfoWindow>
        <InfoWindow
        lat = {30.269920000307934}
        lng = {-97.74332000011776}
        content = {'Art'}>
        <div>
        <h3>Hello</h3>
        </div>
        </InfoWindow>
 
  

  
</Map>:null}

      </div>
    )
  }
}

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyBBJCIum7iZSy8nRDjJhSjFjRx4nrGZiPU'
// })(TheMap)

     function mapDispatchToProps(dispatch) { //Think of mapDispatchToProps as this is how you SEND stuff to the store
                return bindActionCreators({
                  fetchGoogle,
                }, dispatch)
              }

              function mapStateToProps(state) { //this of mapStateToProps as this is how you GET stuff from the store
                return {
                  googley: state.google,
                 
                }
              }

              export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: 'AIzaSyBBJCIum7iZSy8nRDjJhSjFjRx4nrGZiPU'
})(TheMap)) 