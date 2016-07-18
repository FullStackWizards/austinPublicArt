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
      let favArtObjects = art.filter((piece) => favs.includes(piece._id))
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
          <span>
            You don't have any favorites yet! 
          </span>
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