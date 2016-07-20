import React from 'react'

import Info from './Info'
import NavBar from './NavBar'

export default class ArtistPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      showInfo: false
		}
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
    let arts = this.props.gallery.filter(art => 
      art['Artist Full Name'] === this.props.params.artistName
    )

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
        {arts.map(art => 
          <div key={art._id} className="soloWork">
            <h3 className="soloArtTitle">{art['Art Title']}</h3>
            <a href="javascript:void(0)" onClick={(e) => this.openInfo(art)} className="artImage">
              <img className='artImage' src={parseImageUrl(art.Images)[0]} />
            </a>
            <div className="soloArtInfo">
              <p>{art['Art Location Name']}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function parseImageUrl (url) {
  return url.split(';')
}
