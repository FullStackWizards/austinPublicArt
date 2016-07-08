import React from 'react';

import ArtGallery from './ArtGallery'
import AuthModal from './AuthModal'

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
        <AuthModal />
        <ArtGallery />
      </div>
    )
  }
}
