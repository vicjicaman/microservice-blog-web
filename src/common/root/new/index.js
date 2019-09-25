import React, { useState } from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import * as ArticleActions from "Actions/articles";

export default ({ history }) => {
  const [fields, setFields] = useState({
    title: "",
    abstract: "",
    content: "",
    status: "draft"
  });

  const handleFieldChange = event => {
    event.persist();
    setFields(fields => ({
      ...fields,
      [event.target.name]: event.target.value
    }));
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

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={fields.status}
                    onChange={handleFieldChange}
                  >
                    <option value="draft">draft</option>
                    <option value="hidden">hidden</option>
                    <option value="active">active</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="col-12">
                <ArticleActions.Create
                  title={fields.title}
                  abstract={fields.abstract}
                  content={fields.content}
                  status={fields.status}
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
          <Article
            title={fields.title}
            abstract={fields.abstract}
            content={fields.content}
          />
        </div>
      </div>
    </div>
  );
};

const Article = ({ title, abstract, content }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p className="font-italic">{abstract}</p>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};
