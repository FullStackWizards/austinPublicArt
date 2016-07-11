import React from 'react'
import {Link} from 'react-router' 

import * as art from '../models/art'

export default class Artists extends React.Component {
	constructor() {
		super()
		this.state = {
			artists: []
		}
	}
	onlyUnique(value, index, self) { 
    	return self.indexOf(value) === index;
	}

	componentWillMount() {
		art.getArt()
		.then((res) => {
			this.setState({artists: res.map((obj) => obj['Artist Name']).filter(this.onlyUnique)})
			console.log(this.state)
		})
	}
	render() {
		return (
      <div>
  		<h3>Artist List</h3>
  		<ul>
  		{this.state.artists.map((name) => <li key={name}><Link to={`/${name}`}>{name}</Link></li>)}
  		</ul>
  		</div>
    )
	}
}