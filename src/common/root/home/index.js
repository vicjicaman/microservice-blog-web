import React from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import { Query } from "react-apollo";
import * as ArticleQueries from "Queries/articles";

export default ({ history, viewer: { username } }) => (
  <div>
    <div className="row">
      <Query query={ArticleQueries.List}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error}</p>;

          const {
            viewer: {
              article: { list }
            }
          } = data;

          return (
            <div className="col-12">
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
