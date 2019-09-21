import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from "./home";

export default ({ viewer }) => (
  <div>
    <Switch>
      <Route
        path={"/blog"}
        exact={true}
        component={props => <Home {...props} viewer={viewer} />}
      />
    </Switch>
  </div>
);
