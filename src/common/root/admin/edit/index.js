import React, { useState } from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import { Query } from "react-apollo";
import * as ArticleAdminActions from "Actions/articles/admin";
import * as ArticleUI from "UI/articles";
import * as ArticleForm from "Comps/articles/form";
import * as ArticleAdminQueries from "Queries/articles/admin";

const getArticleData = ({ loading, error, data }) => {
  if (loading || error) {
    return null;
  }

  const {
    viewer: {
      articles: { admin }
    }
  } = data;

  if (admin === null) {
    return { allowed: false, article: null };
  }

  const {
    get: { title, abstract, content }
  } = admin;

  return { allowed: true, article: { title, abstract, content } };
};

export default ({
  history,
  viewer,
  match: {
    params: { id }
  }
}) => (
  <Query query={ArticleAdminQueries.Get} variables={{ id }}>
    {({ loading, error, data }) => {
      const res = getArticleData({ loading, error, data });

      const { fields, setFields, handleFieldChange } = ArticleForm.State(
        res ? res.article : null
      );

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;

      if (!res.allowed) return <span>No access</span>;
      if (!fields) {
        setFields(res.article);
        return <p>Loading...</p>;
      }

      const preview = {
        authorid: viewer.id,
        ...fields
      };

      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">Edit article</div>
                <div className="card-body">
                  <ArticleForm.Component
                    fields={fields}
                    setFields={setFields}
                    handleFieldChange={handleFieldChange}
                  />
                </div>
                <div className="card-footer">
                  <div className="col-12">
                    <ArticleAdminActions.Edit
                      id={id}
                      title={fields.title}
                      abstract={fields.abstract}
                      content={fields.content}
                      onCompleted={() => history.goBack()}
                    />{" "}
                    <button
                      className="btn btn-danger"
                      onClick={e => {
                        e.preventDefault();
                        history.goBack();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div id="preview" className="col-md-6">
              <ArticleUI.Entry article={preview} />
            </div>
          </div>
        </div>
      );
    }}
  </Query>
);
