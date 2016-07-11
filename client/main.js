import ReactDOM from 'react-dom';
import React from 'react';
import Artists from './components/Artists'
import { Router, Route, Link, browserHistory } from 'react-router'
import Home from './components/HomePage'
import Gallery from './components/ArtGallery'

ReactDOM.render((
  <div>
  
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/artists" component={Artists} /> 
    <Route path="/gallery" component={Gallery} />     
    <Route path="/:artistName" component={Gallery} />
  </Router>
  </div>
), document.getElementById('app'))
