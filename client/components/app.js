import React from 'react';

import ArtGallery from './ArtGallery'
//import AuthPannel from './AuthPannel or where ever'

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render(){
    return (
      <div>
        <h2>Austin Art</h2>
        <ArtGallery />
      </div>
    )
  }
}
