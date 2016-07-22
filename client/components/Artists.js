import React from 'react'
import {Link} from 'react-router'
import NavBar from './NavBar'

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
			this.setState({artists: res.map((obj) => obj['Artist Full Name']).filter(this.onlyUnique)})
		})
	}
	render() {
		return (
      <div>
        <NavBar />
    		<h3 className="w3-xxxlarge w3-text-black"><br/>Artist List</h3>
    		<ul id = "limheight">
    		{this.state.artists.map((name) => <li key={name} className="w3-xlarge w3-text-black"><Link className="w3-xlarge w3-text-black" to={`/${name}`}>{name}</Link>	•	<br/></li>)}
    		</ul>
  		</div>
    )
	}
}