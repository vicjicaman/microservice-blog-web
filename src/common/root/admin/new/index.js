import React, { useState } from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import * as ArticleAdminActions from "Actions/articles/admin";
import * as ArticleUI from "UI/articles";

export default ({ history, viewer }) => {
  const [fields, setFields] = useState({
    title: "",
    abstract: "",
    content: ""
  });

  const handleFieldChange = event => {
    event.persist();
    setFields(fields => ({
      ...fields,
      [event.target.name]: event.target.value
    }));
  };

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
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={fields.title}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="abstract">Abstract</label>
                  <input
                    type="text"
                    className="form-control"
                    name="abstract"
                    value={fields.abstract}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    className="form-control"
                    name="content"
                    rows="15"
                    value={fields.content}
                    onChange={handleFieldChange}
                  ></textarea>
                </div>

              </form>
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
