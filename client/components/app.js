import React, {PropTypes} from 'react';

import ArtGallery from './ArtGallery'
import AuthModal from './AuthModal'
import * as auth from '../models/auth'
import * as art from '../models/art'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      artCollection: null
    }
  }

  componentWillMount() {
    this.fetchArt()
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

  fetchArt() {
    art.getArt()
    .then((artwork) => {
      this.setState({artCollection: artwork})
    })
  }

  render(){
    return (
      <div>
        <h2>Austin Art</h2>
        <AuthModal className="loginButton" login={this.login.bind(this)} signUp={this.signUp.bind(this)}/>
        <ArtGallery className="artGallery" gallery={this.state.artCollection} loggedIn={this.state.loggedIn} fetchArt={this.fetchArt.bind(this)}/>
      </div>
    )
  }
}
