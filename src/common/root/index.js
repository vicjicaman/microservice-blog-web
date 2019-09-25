import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from "./home";
import New from "./new";
import Entry from "./entry";

export default ({ viewer }) => (
  <div>
    <Switch>
      <Route
        path={"/blog"}
        exact={true}
        component={props => <Home {...props} viewer={viewer} />}
      />
      <Route
        path={"/blog/new"}
        exact={true}
        component={props => <New {...props} viewer={viewer} />}
      />
      <Route
        path={"/blog/:id"}
        component={props => <Entry {...props} viewer={viewer} />}
      />
    </Switch>
  </div>
);
