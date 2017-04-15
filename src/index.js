import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './App';

import './styles/index.css';

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Route path="*" component={App} />
  </Router>
  , document.getElementById('root')
);
