
import ReactDOM from 'react-dom';

import React from 'react';
import Artists from './components/Artists'

import { Router, Route, Link, browserHistory } from 'react-router'

import App from './components/HomePage';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/artists" component={Artists} />   
    <Route path="/:artistName" component={App} />
  </Router>
), document.getElementById('app'))

// Render that component to the DOM!
// ReactDOM.render(<App />, document.getElementById('app'));
