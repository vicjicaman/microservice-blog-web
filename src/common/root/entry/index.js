import React from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";

export default ({
  match: {
    params: { id }
  }
}) => (
  <div>
    <div className="row">
      <div className="col-12">article with {id}</div>
    </div>
  </div>
);
