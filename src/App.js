import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import WeatherSearch from './pages/WeatherSearch';
import WeatherByZip from './pages/WeatherByZip';
import PageNotFound from './pages/PageNotFound';

import './App.css';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path='/'>
        <Redirect to='/weather-app/' />
      </Route>
      <Route exact path='/weather-app'>
        <WeatherSearch />
      </Route>
      <Route path='/weather-app/weather/zip'>
        <WeatherByZip />
      </Route>
      <PageNotFound />
    </Switch>
  </div>
);

export default App;


