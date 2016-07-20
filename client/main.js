import {render} from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App'
import Home from './components/Home'
import Artists from './components/Artists'
import Gallery from './components/Gallery'
import ArtistPage from './components/ArtistPage'
<<<<<<< 2bef10c1050339b50f985a1a8f636c0ff74333fc
import Favorites from './components/Favorites'
import Locations from './components/Locations'
=======
import FavsPage from './components/FavsPage'
import LocationsContainer from './components/Locations'




>>>>>>> Adds react-gmap to package.json. Locations renders map with single hardcoded marker to /locations : )

//Create the route configuration
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    <Route path="/" component={Home} />
    	<Route path="locations" component={LocationsContainer} />
    	<Route path="artists" component={Artists} /> 
	    <Route path="gallery" component={Gallery} />     
      <Route path="favorites" component={Favorites} />
      <Route path=":artistName" component={ArtistPage} />
    </Route>
  </Router>
), document.getElementById('app'))



 
