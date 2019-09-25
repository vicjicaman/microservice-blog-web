import React from "react";
import * as Articles from "UI/articles";
import { Status } from "UI/articles/entity";

const Item = ({ article }) => {
  return <Articles.Item article={article}></Articles.Item>;
};

export { Item };
