import React from 'react';
import {Link} from 'react-router';
import SearchInput, {createFilter} from 'react-search-input'
import NavBar from './NavBar';

export default class Artists extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ''
    }
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }


	render() {
    // const filteredArt = this.props.gallery.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    const filteredArtists = this.props.gallery
                                    .filter(createFilter(this.state.searchTerm, ['Artist Full Name']))
    .map(obj => obj['Artist Full Name'])
                                    .filter(onlyUnique)
                                    .sort();

		return (
      <div>
        <NavBar
          searchUpdated={this.searchUpdated.bind(this)}
          searchTerm={this.state.searchTerm}
        />

        <h3 className="artistTitle">Artist List</h3>
        <div className="artistContainer">
      		<ul className="artist-list">
            {filteredArtists.map(name =>
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

