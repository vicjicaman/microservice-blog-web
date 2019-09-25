import React from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import { Query } from "react-apollo";
import * as ArticleQueries from "Queries/articles/admin";
import * as ArticleAdminUI from "UI/articles/admin";
import * as ArticleAdminActions from "Actions/articles/admin";

export default ({ history, viewer: { username } }) => (
  <div>
    <div className="row">
      <div className="col-12">
        <Link className="btn btn-sm btn-primary" to={"/blog"}>
          <i className="fa fa-list" /> Published list
        </Link>{" "}
        <Link className="btn btn-sm btn-primary" to={"/blog/admin/new"}>
          <i className="fa fa-plus" /> New
        </Link>
      </div>
    </div>
    <div className="row">
      <Query query={ArticleQueries.List}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error}</p>;

          const {
            viewer: {
              articles: { admin }
            }
          } = data;

          if (admin === null) {
            return <span>No access</span>;
          }

          const { list } = admin;

          return (
            <div className="col-12">
              <ul className="list-group list-group-flush">
                {list.map(article => (
                  <ArticleAdminUI.Item key={article.id} article={article}>
                    <span className="d-block">
                      <span className="float-right">
                        {article.status === "draft" && (
                          <React.Fragment>
                            <ArticleAdminActions.Publish id={article.id} />{" "}
                            <Link
                              className="btn btn-sm btn-primary"
                              to={"/blog/admin/edit/" + article.id}
                            >
                              <i className="fa fa-edit" /> Edit
                            </Link>
                          </React.Fragment>
                        )}

                        {article.status === "active" && (
                          <React.Fragment>
                            <ArticleAdminActions.Inactive id={article.id} />
                          </React.Fragment>
                        )}
                      </span>
                    </span>
                  </ArticleAdminUI.Item>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    </div>
  </div>
);
