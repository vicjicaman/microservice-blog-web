import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Alert } from "reactstrap";
import Loading from "UI/loading";
import * as ArticleAdminFragments from "Queries/articles/admin/fragments";
import * as ArticleQueries from "Queries/articles";

const MUTATION = gql`
  mutation ArticleInactive($id: ID!) {
    viewer {
      id
      username
      articles {
        admin {
          article(id: $id) {
            inactive {
              ...ArticleAdminFragment
            }
          }
        }
      }
    }
  }
  ${ArticleAdminFragments.Article}
`;

export default function({ id }) {
  const [
    mutation,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(MUTATION, {
    refetchQueries: [{ query: ArticleQueries.List }],
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
        onCompleted && onCompleted(admin.article.inactive);
      }
    }
  });

  return (
    <button
      className="btn btn-sm btn-warning"
      disabled={mutationLoading}
      onClick={e => {
        e.preventDefault();
        mutation({
          variables: {
            id
          }
        });
      }}
    >
      {mutationLoading ? (
        <Loading />
      ) : (
        <i className="fa fa-exclamation"> Inactive</i>
      )}
    </button>
  );
}
