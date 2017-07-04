import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home/Home';
import Dashboard from './containers/Dashboard/Dashboard';

const Routes = () => (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/dashboard' component={Dashboard}/>
    </Switch>
)
export default Routes;