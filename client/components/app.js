import React, {PropTypes} from 'react';

import ArtGallery from './ArtGallery'
import AuthModal from './AuthModal'
import * as auth from '../models/auth'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
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

  render(){
    return (
      <div>
        <h2>Austin Art</h2>
        <AuthModal login={this.login.bind(this)} signUp={this.signUp.bind(this)}/>
        <ArtGallery />
      </div>
    )
  }
}
