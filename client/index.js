import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
import { Main, UserHome } from './components';
import { MainContainer } from './containers';



ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainContainer}>
          <Route path="home" component={UserHome} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
