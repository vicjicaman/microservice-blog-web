import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import { render } from "./render";
import App from "../common/App.js";
import { reducers, watchers } from "../common/state";


const RESOURCES_BASE_ROUTE = process.env["RESOURCES_BASE_ROUTE"];
const BLOG_BASE_ROUTE_APP = process.env["BLOG_BASE_ROUTE_APP"];
const BLOG_INTERNAL_URL_GRAPH = process.env["BLOG_INTERNAL_URL_GRAPH"];
const BLOG_EXTERNAL_URL_GRAPH = process.env["BLOG_EXTERNAL_URL_GRAPH"];
const BLOG_INTERNAL_PORT_APP = process.env["BLOG_INTERNAL_PORT_APP"];

const app = express();

app.use(BLOG_BASE_ROUTE_APP + "/app", express.static("dist/web"));

app.get("/*", (req, res) => {
  const cxt = {};

  render(
    {
      App,
      req,
      res,
      watchers,
      reducers,
      paths: {
        resources: RESOURCES_BASE_ROUTE,
        base: BLOG_BASE_ROUTE_APP
      },
      urls: {
        external: {
          graphql: BLOG_EXTERNAL_URL_GRAPH
        },
        internal: {
          graphql: BLOG_INTERNAL_URL_GRAPH
        }
      }
    },
    cxt
  );
});

app.listen(BLOG_INTERNAL_PORT_APP, () => {
  console.log(`Blog server is listening on port... ${BLOG_INTERNAL_PORT_APP}`);
});
