import React, {PropTypes} from 'react';
import {Link} from 'react-router' 

import ArtGallery from './ArtGallery'
import AuthModal from './AuthModal'

import * as auth from '../models/auth'
import * as art from '../models/art'


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      artCollection: []
    }
  }

  componentWillMount() {
    this.fetchArt(this.props.params.artistName)
  }

  componentDidMount() {
    console.log(this.props.params)
  }

  signUp(userData) {
    console.log('signing up in~~~app.js')
    auth.signUp(userData)
    this.setState({loggedIn: true})
  }

  login(userData) {
    console.log('logging in~~~app.js')
    auth.login(userData)
    this.setState({loggedIn: true})
  }

  logout() {
    console.log('logging out')
    this.setState({loggedIn: false})
  }

  fetchArt(artist) {

    art.getArt()
    .then((artwork) => {
      if(artist) {
        this.setState({artCollection: artwork.filter((art) => art['Artist Name'] == artist)})
      }
      else{
        this.setState({artCollection: artwork})
      }
      
    })
  }

  render(){
    return (
      <div>
        <Link to={`/artists`}>artists</Link>
        <h2>Austin Art</h2>
        <AuthModal className="loginButton" login={this.login.bind(this)} signUp={this.signUp.bind(this)}/>
        <ArtGallery className="artGallery" gallery={this.state.artCollection} loggedIn={this.state.loggedIn} fetchArt={this.fetchArt.bind(this)}/>
      </div>
    )
  }
}
