import React from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import { Query } from "react-apollo";
import * as ArticleQueries from "Queries/articles";

export default ({ history, viewer: { username } }) => (
  <div>
    <div className="row">
      <div className="col-12">
        <Link to={"/blog/new"}>New</Link>
      </div>
    </div>
    <div className="row">
      <Query query={ArticleQueries.List}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error}</p>;

          const {
            viewer: {
              articles: { list }
            }
          } = data;

          return (
            <div className="col-12">
              List of articles
              <ul className="list-group list-group-flush">
                {list.map(({ id, title }) => (
                  <li key={id} className="list-group-item">
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    </div>
  </div>
);
