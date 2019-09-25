import { gql } from "apollo-boost";
import * as ArticleAdminFragments from 'Queries/articles/admin/fragments'


export const List = gql`
  query ArticleAdminList {
    viewer {
      id
      username
      articles {
        admin {
          list {
            ...ArticleAdminFragment
          }
        }
      }
    }
  }
  ${ArticleAdminFragments.Article}
`;


export const Get = gql`
  query ArticleAdminGet ($id:ID!) {
    viewer {
      id
      username
      articles {
        admin {
          get (id:$id) {
            ...ArticleAdminFragment
          }
        }
      }
    }
  }
  ${ArticleAdminFragments.Article}
`;
