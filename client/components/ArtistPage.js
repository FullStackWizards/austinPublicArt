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
        <br/>
        <h1 className="w3-jumbo w3-text-black">{this.props.params.artistName}</h1>
        <br/>
      
        {this.state.art.map(art => {
          return (
            <div key={art._id} className="soloWork">
              <h3 className="soloArtTitle w3-xxlarge w3-text-black">{art['Art Title']}</h3>
              <img src={this.parseImageUrl(art.Images)[0]} />
              <div className="soloArtInfo w3-large w3-text-black">
                <p>{art['Art Location Name']}</p>
              </div>
            </div>
          )
        })}
      </div>

    )
  }

}