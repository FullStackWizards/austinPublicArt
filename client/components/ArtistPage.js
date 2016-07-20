import React from 'react'
import * as art from '../models/art'
import Info from './Info'
import NavBar from './NavBar'

export default class ArtistPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			art: [],
		}
	}

	componentWillMount() {
    this.fetchArt(this.props.params.artistName)
  }
  fetchArt(artist) {
    art.getArt()
    .then((artwork) => {
      if(artist) {
        this.setState({art: artwork.filter((art) => art['Artist Full Name'] == artist)})
      }
      else {
        this.setState({art: artwork})
      }
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

  render() {
    return (
      <div>
        <NavBar />
        {this.state.showInfo ?
          <Info onClose={this.closeInfo.bind(this)} loggedIn={this.props.loggedIn} updateCurrent={this.updateCurrent.bind(this)} currentArt={this.state.currentArt} parseImageUrl={this.parseImageUrl.bind(this)}/>
          : null}
        <br/>
        <br/>
        {this.state.art.map(art => {
          return (
            <div key={art._id} className="soloWork">
              <h3 className="soloArtTitle">{art['Art Title']}</h3>
              <a href="javascript:void(0)" onClick={(e) => this.openInfo(art)} className="artImage">
              <img className='artImage' src={this.parseImageUrl(art.Images)[0]} /></a>
              <div className="soloArtInfo">
                <p>{art['Art Location Name']}</p>
              </div>
            </div>
          )
        })}
      </div>

    )
  }

}