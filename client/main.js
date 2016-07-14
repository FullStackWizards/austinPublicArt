import {render} from 'react-dom';
import React from 'react';
import Artists from './components/Artists'
import { Router, Route, Link, browserHistory } from 'react-router'
import Home from './components/HomePage'
import Gallery from './components/ArtGallery'
import ArtistPage from './components/ArtistPage'




//Create the route configuration
render((
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
	    <Route path="artists" component={Artists} /> 
	    <Route path="gallery" component={Gallery} />     
	    <Route path=":artistName" component={ArtistPage} />
  </Router>
), document.getElementById('app'))



 