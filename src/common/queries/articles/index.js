import { gql } from "apollo-boost";
import * as ArticleFragments from "Queries/articles/fragments";

export const List = gql`
  query ArticleList {
    viewer {
      id
      username
      articles {
        list {
          ...ArticleListFragment
        }
      }
    }
  }
  ${ArticleFragments.ArticleList}
`;

export const Get = gql`
  query ArticleList($url: String!) {
    viewer {
      id
      username
      articles {
        get(url: $url) {
          ...ArticleFragment
        }
      }
    }
  }
  ${ArticleFragments.Article}
`;
