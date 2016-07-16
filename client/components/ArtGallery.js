import React from 'react'
import ArtWindow from './ArtWindow'
import * as auth from '../models/auth'
import * as art from '../models/art'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artCollection: []
    }
  }

  componentWillMount() {
    this.fetchArt(this.props.params.artistName)
  }
  signUp(userData) {
    console.log('signing up in~~~app.js')
    auth.signUp(userData)
  }
  login(userData) {
    console.log('logging in~~~app.js')
    auth.login(userData)
  }

  fetchArt(artist) {
    art.getArt()
    .then((artwork) => {
      if(artist) {
        this.setState({artCollection: artwork.filter((art) => art['Artist Name'] == artist)})
      }
      else {
        this.setState({artCollection: artwork})
      }   
    })
  }

  render(){
    return (
      <div>
      <br/>
      <br/>
        <h2>Austin Art</h2>
        <ArtWindow className="artGallery" gallery={this.state.artCollection} loggedIn={this.state.loggedIn} fetchArt={this.fetchArt.bind(this)}/>
      </div>
    )
  }
}







