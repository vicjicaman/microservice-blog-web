import React from "react";

import { Route, NavLink, Switch, Link } from "react-router-dom";
import { Query } from "react-apollo";
import * as ArticleUI from "UI/articles";
import * as ArticleQueries from "Queries/articles";

const getArticleData = ({ loading, error, data }) => {
  if (loading || error) {
    return null;
  }

  const {
    viewer: {
      articles: { get }
    }
  } = data;

  return { article: get };
};

export default ({
  history,
  viewer,
  match: {
    params: { url }
  }
}) => (
  <div>
    <div className="row">
      <div className="col-12">
        <span className="float-right">
          <Link className="btn btn-sm btn-primary" to={"/blog"}>
            <i className="fa fa-list" />{' '}Return to list
          </Link>
        </span>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <Query query={ArticleQueries.Get} variables={{ url }}>
          {({ loading, error, data }) => {
            const res = getArticleData({ loading, error, data });

            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error}</p>;

            const { article } = res;

            return (
              <div className="col-12">
                <ArticleUI.Entry article={article} />
              </div>
            );
          }}
        </Query>
      </div>
    </div>
  </div>
);
