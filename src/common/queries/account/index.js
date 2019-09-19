import { gql } from "apollo-boost";

export const GET = gql`
  query ACCOUNT_GET {
    viewer {
      id
      username
      protected {
        account {
          get {
            id
            username
            email
            created_at
          }
        }
      }
    }
  }
`;
