import {render} from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App'
import Home from './components/Home'
import Artists from './components/Artists'
import Gallery from './components/Gallery'
import ArtistPage from './components/ArtistPage'
import Favorites from './components/Favorites'
import Locations from './components/Locations'

//Create the route configuration
render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    	<Route path="locations" component={Locations} />
    	<Route path="artists" component={Artists} />
	    <Route path="gallery" component={Gallery} />
      <Route path="favorites" component={Favorites} />
      <Route path=":artistName" component={ArtistPage} />
    </Route>
  </Router>
), document.getElementById('app'))
