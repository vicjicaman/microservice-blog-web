import React, { useState } from "react";

const State = initial => {
  const [fields, setFields] = useState(initial);

  const handleFieldChange = event => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    const vals = {
      [name]: value
    };

    if (name === "title") {
      vals.url = value.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
    }

    setFields(fields => ({
      ...fields,
      ...vals
    }));
  };

  return { fields, setFields, handleFieldChange };
};

const Component = ({ mode, fields, setFields, handleFieldChange }) => {
  return (
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
        <label htmlFor="url">Url</label>
        {mode === "create" ? (
          <input
            type="text"
            className="form-control"
            name="url"
            value={fields.url}
            onChange={handleFieldChange}
          />
        ) : (
          <span className="text-muted"><b>{' '}{fields.url}</b></span>
        )}
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
  );
};

export { Component, State };
