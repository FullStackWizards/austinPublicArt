import React from 'react'
import {Link} from 'react-router'
import NavBar from './NavBar'
import * as auth from '../models/auth'
import * as art from '../models/art'

export default class Favorites extends React.Component {
	constructor() {
		super()
		this.state = {
			favs: []
		}
	}
	
  componentWillMount() {
    auth.fetchFavs()
  }


	render() {
		return (
      <div>
        <NavBar />
        <br/>
        <br/>
    		<h3>Your Favs!</h3>
    		<ul>
    		  <li>
          your favorite art here !
          </li>
     		</ul>
  		</div>
    )
	}
}