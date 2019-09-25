import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Alert } from "reactstrap";
import Loading from "UI/loading";
import * as ArticleAdminQueries from "Queries/articles/admin";
import * as ConfirmModal from "UI/confirm";

const MUTATION = gql`
  mutation ArticleInactive($id: ID!) {
    viewer {
      id
      username
      articles {
        admin {
          article(id: $id) {
            remove
          }
        }
      }
    }
  }
`;

export default function({ id }) {
  const confirmState = ConfirmModal.State(false);

  const [
    mutation,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(MUTATION, {
    refetchQueries: [{ query: ArticleAdminQueries.List }],
    onCompleted: ({
      viewer: {
        id,
        articles: { admin }
      }
    }) => {
      if (id === null) {
        window.location = "/auth";
      }

    }
  });

  return (


    <ConfirmModal.Component
      state={confirmState}
      trigger={({ open }) => (
        <button
          className="btn btn-sm btn-danger"
          disabled={mutationLoading}
          onClick={e => {
            e.preventDefault();
            open();
          }}
        >
          {mutationLoading ? (
            <Loading />
          ) : (
            <i className="fa fa-times"></i>
          )}
        </button>
      )}
      body=""
      confirm={({ close }) => (
        <button
          className="btn btn-danger"
          onClick={e => {
            e.preventDefault();
            mutation({
              variables: {
                id
              }
            });
            close();
          }}
        >
          <i className="fa fa-times"> Remove</i>
        </button>
      )}
    />
  );
}
