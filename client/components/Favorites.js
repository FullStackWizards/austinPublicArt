import React from 'react'
import {Link} from 'react-router'
import NavBar from './NavBar'
import * as auth from '../models/auth'
import * as art from '../models/art'
import Info from './Info'

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

  openInfo(art) {
    this.setState({showInfo: true});
    this.setState({currentArt: art})
    console.log("openInfo has been called",art)
  }
  closeInfo() {
    this.setState({showInfo: false});
  }
  updateCurrent(likeCount) {
    this.setState({currentArt: Object.assign(this.state.currentArt)})
  }

  _renderFavoriteArt(){
    if(this.state.favs.length > 0){
      return this.state.favs.map((art) => {
        return ( 
          <div className="soloWork" key={art._id}>
            <h3 className="soloArtTitle">{art['Art Title']}</h3>
            <a href="javascript:void(0)" onClick={(e) => this.openInfo(art)} className="artImage">
            <img className="artImage" src={this.parseImageUrl(art.Images)[0]} /></a>
            <div className="soloArtInfo">
              <p>{art['Art Location Name']}</p>
            </div>
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
        {this.state.showInfo? 
          <Info onClose={this.closeInfo.bind(this)} loggedIn={this.props.loggedIn} updateCurrent={this.updateCurrent.bind(this)} currentArt={this.state.currentArt} parseImageUrl={this.parseImageUrl.bind(this)}/>
          : null}
        <br/>
        <br/>
    		<h3>Your Favs!</h3>
    		<div className="favGallery">
    		  {this._renderFavoriteArt()}
     		</div>
  		</div>
    )
	}
}
