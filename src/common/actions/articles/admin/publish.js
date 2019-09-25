import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Alert } from "reactstrap";
import Loading from "UI/loading";
import * as ArticleAdminFragments from "Queries/articles/admin/fragments";
import * as ArticleQueries from "Queries/articles";
import * as ConfirmModal from "UI/confirm";

const MUTATION = gql`
  mutation ArticlePublish($id: ID!) {
    viewer {
      id
      username
      articles {
        admin {
          article(id: $id) {
            publish {
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
  const confirmState = ConfirmModal.State(false);

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
    }
  });

  return (
    <ConfirmModal.Component
      state={confirmState}
      trigger={({ open }) => (
        <button
          className="btn btn-sm btn-success"
          disabled={mutationLoading}
          onClick={e => {
            e.preventDefault();
            open();
          }}
        >
          {mutationLoading ? (
            <Loading />
          ) : (
            <i className="fa fa-upload"> Publish</i>
          )}
        </button>
      )}
      body=""
      confirm={({ close }) => (
        <button
          className="btn btn-success"
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
          <i className="fa fa-upload"> Publish</i>
        </button>
      )}
    />
  );
}
