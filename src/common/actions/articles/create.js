import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Alert } from "reactstrap";
import Loading from "UI/loading";

const CREATE = gql`
  mutation ArticleCreate($input: ArticleInput!) {
    viewer {
      id
      username
      articles {
        create(input: $input) {
          id
          title
          abstract
          content
          authorid
          created_at
        }
      }
    }
  }
`;

export default function({ title, abstract, content, status, onCompleted }) {
  const [
    create,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(CREATE, {
    onCompleted: ({ viewer: { id, articles } }) => {
      if (id === null) {
        window.location = "/auth";
      }
      if (articles) {
        onCompleted && onCompleted(articles.create);
      }
    }
  });

  return (
    <button
      className="btn btn-primary"
      disabled={mutationLoading}
      onClick={e => {
        e.preventDefault();
        create({
          variables: {
            input: {
              title,
              abstract,
              content,
              status
            }
          }
        });
      }}
    >
      {mutationLoading ? <Loading /> : "Save"}
    </button>
  );
}
