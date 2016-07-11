// React package that deals with DOM interactions
import ReactDOM from 'react-dom';

// React package for constructing components (and all non-DOM related actions)
import React from 'react';
import Artists from './components/Artists'

import { Router, Route, Link, browserHistory } from 'react-router'


// Import parent app component
import App from './components/app';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/artists" component={Artists} />   
    <Route path="/:artistName" component={App} />
  </Router>
), document.getElementById('app'))

// Render that component to the DOM!
// ReactDOM.render(<App />, document.getElementById('app'));
