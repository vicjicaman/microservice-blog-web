import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from "./home";
import Admin from "./admin";
import Entry from "./entry";

export default ({ viewer }) => (
    <Switch>
      <Route
        path={"/blog"}
        exact={true}
        component={props => <Home {...props} viewer={viewer} />}
      />
      <Route
        path={"/blog/admin"}
        component={props => <Admin {...props} viewer={viewer} />}
      />
      <Route
        path={"/blog/:url"}
        component={props => <Entry {...props} viewer={viewer} />}
      />
    </Switch>
);
