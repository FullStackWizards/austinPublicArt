import React from 'react'
import NavBar from './NavBar'
import * as art from '../models/art'

export default class ArtistPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			art: []
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

  render() {
    return (
      <div>
        <NavBar />
        <br/>
        <br/>
        {this.state.art.map(art => {
          return (
            <div key={art._id} className="soloWork">
              <h3 className="soloArtTitle">{art['Art Title']}</h3>
              <img src={this.parseImageUrl(art.Images)[0]} />
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