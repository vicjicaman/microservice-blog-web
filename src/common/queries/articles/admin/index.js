import { gql } from "apollo-boost";
import * as ArticleAdminFragments from 'Queries/articles/admin/fragments'


export const List = gql`
  query ArticleList {
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
