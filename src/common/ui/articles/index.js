import React from "react";
import { Title, Author, Abstract, Content, Status } from "UI/articles/entity";

const Header = ({ title }) => (
  <React.Fragment>
    <Title title={title} />
  </React.Fragment>
);

const Description = ({ abstract, authorid, status }) => (
  <Abstract
    abstract={abstract}
    right={
      <span className="small">
        By: <Author authorid={authorid} />
      </span>
    }
  >
    <Status status={status} />
  </Abstract>
);

const Item = ({ article, children }) => {
  const { title, authorid, abstract, status } = article;
  return (
    <li className="list-group-item">
      <Header title={title} />
      <Description abstract={abstract} authorid={authorid} status={status} />
      {children}
    </li>
  );
};

const Entry = ({ article }) => {
  const { title, abstract, content, authorid } = article;

  return (
    <div>
      <Header title={title} />
      <Description abstract={abstract} authorid={authorid} />
      <Content content={content} />
    </div>
  );
};

export { Entry, Item };
