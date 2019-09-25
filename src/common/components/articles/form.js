import React, { useState } from "react";

const State = initial => {
  const [fields, setFields] = useState(initial);

  const handleFieldChange = event => {
    event.persist();
    setFields(fields => ({
      ...fields,
      [event.target.name]: event.target.value
    }));
  };

  return { fields, setFields, handleFieldChange };
};

const Component = ({ fields, setFields, handleFieldChange }) => {
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
