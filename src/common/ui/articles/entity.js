import React from "react";

export const Title = ({ title }) => <h3>{title}</h3>;

export const Author = ({ authorid }) => <span>{authorid}</span>;

export const Abstract = ({ abstract, children, right }) => (
  <p className="text-break">
    {children}
    {children && " "}
    <span className="font-italic">{abstract}</span>
    {right && <span className="float-right">{right}</span>}
  </p>
);

export const Content = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }}></div>
);

export const Status = ({ status }) => {
  let type = "badge-primary";

  if (status === "hidden") {
    type = "badge-warning";
  }

  if (status === "active") {
    type = "badge-success";
  }

  if (status === "draft") {
    type = "badge-secondary";
  }

  return <span className={"badge " + type}>{status}</span>;
};
