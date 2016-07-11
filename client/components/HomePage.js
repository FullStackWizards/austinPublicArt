import React, {PropTypes} from 'react';
import {Link} from 'react-router' 
import NavBar from './NavBar'

export default class HomePage extends React.Component {

  render() {
    return (
      <div>
        <div>
        <NavBar />
        </div>
        <div >
          <h2>HomePage</h2>
        </div>
      </div>
    )
  }
}



