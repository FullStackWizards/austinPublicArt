import React from 'react'
import {Link} from 'react-router'
import NavBar from './NavBar'
import * as auth from '../models/auth'
import * as art from '../models/art'

export default class Favorites extends React.Component {
	constructor() {
		super()
		this.state = {
			favs: []
		}
	}
	
  componentWillMount() {
    let favs;
    auth.fetchFavs()
    .then((res) => {
      favs = res.map((obj) => obj.artId);
      return art.getArt();
    })
    .then((art) => {
      console.log("Favs from server~~", favs)
      console.log("Art from server~~", art)
      let favArtObjects = art.filter((piece) => favs.indexOf(piece._id) !== -1 ? true : false )
      console.log("New OBJS~~", favArtObjects)
      this.setState({ favs: favArtObjects })
    })

  }

  parseImageUrl(imgUrl) {
    imgUrl = imgUrl.split(';')
    return imgUrl
  }

  _renderFavoriteArt(){
    if(this.state.favs.length > 0){
      return this.state.favs.map((art) => {
        return ( 
          <div className="artwork" key={art._id}>
            <img className="artImage" src={this.parseImageUrl(art.Images)[0]} />
          </div>
        )
      })
    } else {
      return (
          <li>
            your favorite art here !
          </li>
        )
    }
  }

	render() {
		return (
      <div>
        <NavBar />
        <br/>
        <br/>
    		<h3>Your Favs!</h3>
    		<div className="artGallery">
    		  {this._renderFavoriteArt()}
     		</div>
  		</div>
    )
	}
}