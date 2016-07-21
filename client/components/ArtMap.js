import React from 'react'
import {Link} from 'react-router'
import NavBar from './NavBar'
import * as auth from '../models/auth'
import * as art from '../models/art'
import GoogleMap from 'google-map-react';
import TheMap from './theMap'



export default class ArtistMap extends React.Component {

constructor() {
		super()
		this.state = {
			artists: [],
			artistLat:[],
			artName:[],
			ArtLocation:[],
			ArtTitle:[],
			ArtistName:[],
			ArtImage:[],
			ArtWeb:[]
		}

	}

componentDidMount() {
		art.getArt()
		.then((res) => {
			this.setState({artists: res},(next)=>{
				console.log("artists",this.state.artists)
					var newArray = this.state.artName.slice();
					var artLocation = this.state.ArtLocation.slice();
					var artTitle = this.state.ArtTitle.slice();
					var artistName = this.state.ArtistName.slice();
					var artImage = this.state.ArtImage.slice();
					var artWeb = this.state.ArtWeb.slice();

				var latLong = this.state.artists.map(artist =>{
    				newArray.push(artist['Art Location Name']); 
    				artLocation.push(artist['Art Location Street Address'])
    				artTitle.push(artist['Art Title'])
    				artistName.push(artist['Artist Full Name'])
    				artImage.push(artist['Images'])
    				artWeb.push(artist['Web Detail Page'])

			
    		var stillNotFormatted = artist.Location.split('(')[1]
    		var slicedInfo = stillNotFormatted.slice(0,stillNotFormatted.length-1)
    		var lat = Number(slicedInfo.split(',')[0])
    		var lon = Number(slicedInfo.split(',')[1])
    		var latLon = {lat:lat,lng:lon}
    		return latLon
    		})
				this.setState({artName:newArray})
				this.setState({ArtLocation:newArray})
				this.setState({ArtTitle:newArray})
				this.setState({ArtistName:newArray})
				this.setState({ArtWeb:newArray})
				
				console.log("lat",latLong)
				this.setState({artistLat:latLong})
				console.log("here")
			})


		})
	}

	render() {
		return (
      <div>
        
    		<h3>Artist List </h3>
    		{this.state.artistLat.length>0?<TheMap artists = {this.state.artistLat} artName = {this.state.artName} artLocation = {this.state.ArtLocation} artTitle = {this.state.ArtTitle} artistName = {this.state.ArtistName} artWeb = {this.state.ArtWeb}/>:null}

  		</div>
    )
	}

	}