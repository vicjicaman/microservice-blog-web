import React from "react";
import * as Articles from "UI/articles";
import { Status } from "UI/articles/entity";

const Item = ({ article, children }) => {
  return <Articles.Item article={article}>{children}</Articles.Item>;
};

export { Item };
