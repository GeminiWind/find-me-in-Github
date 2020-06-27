import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import history from '../../utils/history'
import './index.css';

import SearchPage from '../SearchPage';
import ProfilePage from '../ProfilePage';

const App = () => (
  <BrowserRouter history={history}>
    <Helmet defaultTitle="Find Me in Github">
      <meta name="description" content="Find me in Github" />
    </Helmet>
    <Switch>
      <Route exact path='/' component={SearchPage}/>
      <Route path='/users/:name' component={ProfilePage}/>
    </Switch>
  </BrowserRouter>
);

export default App;
