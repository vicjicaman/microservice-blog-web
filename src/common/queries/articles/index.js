import { gql } from "apollo-boost";
import * as ArticleFragments from 'Queries/articles/fragments'

export const List = gql`
  query ArticleList {
    viewer {
      id
      username
      articles {
        list {
          ...ArticleFragment
        }
      }
    }
  }
  ${ArticleFragments.Article}
`;
