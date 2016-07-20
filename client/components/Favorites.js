import React from 'react';
import {Link} from 'react-router';
import * as auth from '../models/auth';
import Info from './Info'

import NavBar from './NavBar';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favs: []
    };
  }

  componentWillMount() {
    let favIds;

    auth.fetchFavs()
      .then(res => {
        favIds = res.map(obj => obj.artId);
        return this.props.gallery.filter(art => favIds.includes(art._id));
      })
      .then(favArts => {
        this.setState({ favs: favArts })
      })
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

	render() {
		return (
      <div>
        <NavBar />
        {this.state.showInfo ? 
          <Info 
            onClose={this.closeInfo.bind(this)} 
            loggedIn={this.props.loggedIn} 
            updateCurrent={this.updateCurrent.bind(this)} 
            currentArt={this.state.currentArt} 
            parseImageUrl={this.parseImageUrl.bind(this)}
          /> :
          null}
        <br/>
        <br/>
    		<h3>Your Favs!</h3>

    		<div className="artGallery">
          {this.state.favs.length > 0 ?
            this.state.favs.map(art =>
            <div className="soloWork" key={art._id}>
              <h3 className="soloArtTitle">{art['Art Title']}</h3>
              <img className="artImage" src={parseImageUrl(art.Images)[0]} />
              <div className="soloArtInfo">
                <p>{art['Art Location Name']}</p>
              </div>
            </div>) :

            <span>
              You don't have any favorites yet! 
            </span>}
     		</div>
  		</div>
    )
	}
}

function parseImageUrl(url) {
  return url.split(';');
}

