import React from "react";
import { isAuthenticate } from "./auth";
import Login from '../src/Pages/Login/index';
import CreateAccount from '../src/Pages/CreateAccount/index';
import Dashboard from '../src/Pages/Dashboard/index';
import ChurrasList from './Pages/ChurrasList/index';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const RouteDashboard = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticate() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
    />
  );
  

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Login />} />
      <Route exact path="/createAccount" component={() => <CreateAccount />} />
      <Route path="/churras" render={(props) => <ChurrasList {...props} />} />
      <RouteDashboard path="/app" component={() => <Dashboard />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;