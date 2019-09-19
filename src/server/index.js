import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import { render } from "./render";
import App from "../common/App.js";
import { reducers, watchers } from "../common/state";

const BASE_ROUTE_APP = process.env["BASE_ROUTE_APP"];
const INTERNAL_URL_GRAPH = "http://" + process.env["INTERNAL_URL_GRAPH"];
const INTERNAL_URL_EVENTS = process.env["INTERNAL_URL_EVENTS"];
const EXTERNAL_URL_GRAPH = "http://" + process.env["EXTERNAL_URL_GRAPH"];
const EXTERNAL_URL_EVENTS = process.env["EXTERNAL_URL_EVENTS"];
const INTERNAL_PORT_APP = process.env["INTERNAL_PORT_APP"];

const app = express();

app.use(
  BASE_ROUTE_APP + "/jquery",
  express.static("/app/node_modules/jquery/dist")
);
app.use(
  BASE_ROUTE_APP + "/bootstrap",
  express.static("/app/node_modules/bootstrap/dist")
);
app.use(
  BASE_ROUTE_APP + "/font-awesome",
  express.static("/app/node_modules/font-awesome")
);
app.use(BASE_ROUTE_APP + "/app", express.static("dist/web"));

app.get("/*", (req, res) => {
  const cxt = {};

  render(
    {
      App,
      req,
      res,
      watchers,
      reducers,
      urls: {
        external: {
          graphql: EXTERNAL_URL_GRAPH,
          events: EXTERNAL_URL_EVENTS
        },
        internal: {
          graphql: INTERNAL_URL_GRAPH,
          events: INTERNAL_URL_EVENTS
        }
      }
    },
    cxt
  );
});

app.listen(INTERNAL_PORT_APP, () => {
  console.log(`Server is listening on port.. ${INTERNAL_PORT_APP}`);
});
