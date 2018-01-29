import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SignupPage  from '../components/SignupPage';
import HomePage from '../components/HomePage';
import ListPage from '../components/ListPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/list/:slug" component={ListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
