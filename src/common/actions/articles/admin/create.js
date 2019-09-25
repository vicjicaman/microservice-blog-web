import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Alert } from "reactstrap";
import Loading from "UI/loading";
import * as ArticleAdminFragments from 'Queries/articles/admin/fragments'

const CREATE = gql`
  mutation ArticleCreate($input: ArticleCreateInput!) {
    viewer {
      id
      username
      articles {
        admin {
          create(input: $input) {
            ...ArticleAdminFragment
          }
        }
      }
    }
  }
  ${ArticleAdminFragments.Article}
`;

export default function({ url, title, abstract, content, onCompleted }) {
  const [
    create,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(CREATE, {
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
        onCompleted && onCompleted(admin.create);
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
              url,
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
