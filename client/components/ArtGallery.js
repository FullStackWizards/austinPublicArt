import React from 'react'
import ArtWindow from './ArtWindow'
import * as auth from '../models/auth'
import * as art from '../models/art'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tempCollection: [],
      artCollection: []
    }
  }

  componentWillMount() {
    this.update()
  }
  update() {
    this.fetchArt(this.props.params.artistName)
    .then(() => {
      this.getLikes()
    })
  }
  signUp(userData) {
    auth.signUp(userData)
  }
  login(userData) {
    auth.login(userData)
  }

  fetchArt(artist) {
    return art.getArt()
    .then((artwork) => {
      if(artist) {
        this.setState({tempCollection: artwork.filter((art) => art['Artist Name'] == artist)})
      }
      else {
        this.setState({tempCollection: artwork})
      }   
    })
  }

  getLikes() {
    console.log('getting likes')
    var results = [];
    this.state.tempCollection.forEach((artWork) => {
      art.getLikes(artWork._id)
      .then((likeCount) => {
        results.push(Object.assign(artWork, {likeCount: likeCount.likeCount.length}))
        if (results.length === this.state.tempCollection.length) {
          console.log('done')
          this.setState({artCollection: results})
        }
      })
    })  
  }

  render(){
    return (
      <div>
        <br/>
        <br/>
        <h2>Austin Art</h2>
        <ArtWindow className="artGallery" update={this.update.bind(this)} gallery={this.state.artCollection} loggedIn={this.state.loggedIn} fetchArt={this.fetchArt.bind(this)}/>
      </div>
    )
  }
}







