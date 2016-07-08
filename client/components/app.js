import React from 'react';

import ArtGallery from './ArtGallery'
import AuthPanel from './AuthPanel'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
  }

  login() {
    console.log('logging in')
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
        <AuthPanel loggedIn={this.state.loggedIn} loginFunction={this.login.bind(this)} logoutFunction={this.logout.bind(this)}/>
        <ArtGallery />
      </div>
    )
  }
}
