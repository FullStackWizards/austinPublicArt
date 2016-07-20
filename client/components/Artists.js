import React from 'react'
import {Link} from 'react-router'
import NavBar from './NavBar'

import * as art from '../models/art'

export default class Artists extends React.Component {
	render() {
    let artists = this.props.gallery.map(obj => obj['Artist Full Name'])
                                    .filter(onlyUnique)
                                    .sort();

		return (
      <div>
        <NavBar />
    		<h3>Artist List</h3>
    		<ul>
    		{artists.map(name => 
          <li key={name}>
            <Link to={`/${name}`}>{name}</Link>
          </li>
        )}
    		</ul>
  		</div>
    )
	}
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

