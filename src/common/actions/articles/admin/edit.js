import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Alert } from "reactstrap";
import Loading from "UI/loading";
import * as ArticleAdminFragments from "Queries/articles/admin/fragments";

const MUTATION = gql`
  mutation ArticleEdit($id: ID!, $input: ArticleInput!) {
    viewer {
      id
      username
      articles {
        admin {
          article(id: $id) {
            edit(input: $input) {
              ...ArticleAdminFragment
            }
          }
        }
      }
    }
  }
  ${ArticleAdminFragments.Article}
`;

export default function({ id, title, abstract, content, onCompleted }) {
  const [
    edit,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(MUTATION, {
    onCompleted: ({
      viewer: {
        id,
        articles: { admin }
      }
    }) => {
      if (id === null) {
        window.location = "/auth";
      }
      if (admin) {
        onCompleted && onCompleted(admin.article.edit);
      }
    }
  });

  return (
    <button
      className="btn btn-primary"
      disabled={mutationLoading}
      onClick={e => {
        e.preventDefault();
        edit({
          variables: {
            id,
            input: {
              title,
              abstract,
              content
            }
          }
        });
      }}
    >
      {mutationLoading ? <Loading /> : "Save"}
    </button>
  );
}
