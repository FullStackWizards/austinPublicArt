import React from 'react';
import {Link} from 'react-router';

import NavBar from './NavBar';

export default class Artists extends React.Component {
  // Just added constructor below
  constructor(props) {
    super(props)

    this.state = {
      // showInfo: false,
      searchTerm: ''
    }
  }

	render() {
    let artists = this.props.gallery.map(obj => obj['Artist Full Name'])
                                    .filter(onlyUnique)
                                    .sort();

		return (
      <div>
        <NavBar />
          <h3 className="artistTitle">Artist List</h3>
          <div className="artistContainer">
        		<ul className="artist-list">
              {artists.map(name =>
                <li key={name}>
                  <Link to={`/${name}`}>{name}</Link>
                </li>
              )}
        		</ul>
          </div>
  		</div>
    )
	}
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

