import React from 'react'
import ArtWindow from './ArtWindow'
import * as auth from '../models/auth'
import * as art from '../models/art'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempCollection: [],
      artCollection: [],
      hipCollection: []
    }
  }

  componentWillMount() {
    if(true){
      this.update()
    }
  }

  update() {
    console.log("params",this.props.params)
    this.fetchArt(this.props.params.artistName)
    .then(() => {
       this.getLikes()
       this.getTrash()
       this.getHipster()
    })
  }

  signUp(userData) {
    auth.signUp(userData)
  }
  login(userData) {
    auth.login(userData)
  }

  fetchArt(artist) {
    console.log("hhhry")
    return art.getArt()
    .then((artwork) => {
      if(artist) {
        this.setState({tempCollection: artwork.filter((art) => art['Artist Full Name'] == artist)})
      }
      else {
        this.setState({tempCollection: artwork})
      }   
      console.log("what!")
    })
  }

  getLikes() {
    var results = [];
    this.state.tempCollection.forEach((artWork) => {
      art.getLikes(artWork._id)
      .then((likeCount) => {
        results.push(Object.assign(artWork, {likeCount: likeCount.likeCount}))
        if (results.length === this.state.tempCollection.length) {
          this.setState({artCollection: results})
        }
      })
    })  
  }

  getTrash(){
    var trashResults = [];
    this.state.tempCollection.forEach((artWork) => {
      art.getTrash(artWork._id)
      .then((trashCount) => {
        trashResults.push(Object.assign(artWork, {trashCount: trashCount.trashCount}))
        if (trashResults.length === this.state.tempCollection.length) {  
          this.setState({trashCollection: trashResults})
        }
      })
    }) 
  }

  getHipster(){
    var hipResults = [];
    this.state.tempCollection.forEach((artWork) => {
      art.getHipster(artWork._id)
      .then((userScore) => {
        hipResults.push(Object.assign(artWork, {userScore: userScore.userScore}))
        if(hipResults.length === this.state.tempCollection.length) {
          this.setState({hipCollection: hipResults})
        }
      })
    })
  }


  render(){

    return (
      <div>
        <br/>
        <br/>
        <ArtWindow className="artGallery" update={this.update.bind(this)}  gallery={this.state.artCollection} loggedIn={this.state.loggedIn} fetchArt={this.fetchArt.bind(this)}/>
      </div>
    )
  }
}







