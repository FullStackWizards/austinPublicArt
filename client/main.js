import {render} from 'react-dom';
import React from 'react';
import Artists from './components/Artists'
import { Router, Route, Link, hashHistory } from 'react-router'
import Home from './components/HomePage'
import Gallery from './components/ArtGallery'
import ArtistPage from './components/ArtistPage'
import FavsPage from './components/FavsPage'
import ArtistMap from './components/ArtMap'



//Create the route configuration test
render((
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    	<Route path="artists" component={Artists} /> 
    	<Route path="map" component={ArtistMap} />
	    <Route path="gallery" component={Gallery} />    
      <Route path="favorites" component={FavsPage} />
      <Route path=":artistName" component={ArtistPage} />
         
   
  </Router>
), document.getElementById('app'))



 