import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from "./home";
import New from "./new";
import Edit from "./edit";

export default ({ viewer }) => (
  <Switch>
    <Route
      path={"/blog/admin"}
      exact={true}
      component={props => <Home {...props} viewer={viewer} />}
    />
    <Route
      path={"/blog/admin/new"}
      exact={true}
      component={props => <New {...props} viewer={viewer} />}
    />
    <Route
      path={"/blog/admin/edit/:id"}
      component={props => <Edit {...props} viewer={viewer} />}
    />
  </Switch>
);
