import React, { useState } from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import * as ArticleAdminActions from "Actions/articles/admin";
import * as ArticleUI from "UI/articles";
import * as ArticleForm from "Comps/articles/form";

export default ({ history, viewer }) => {
  const { fields, setFields, handleFieldChange } = ArticleForm.State({
    title: "",
    abstract: "",
    content: ""
  });

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
                <ArticleAdminActions.Create
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
};
