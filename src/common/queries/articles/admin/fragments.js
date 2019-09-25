import { gql } from "apollo-boost";
import * as ArticleFragments from 'Queries/articles/fragments'


export const Article = gql `
  fragment ArticleAdminFragment on Article {
    ...ArticleFragment
    status
  }
  ${ArticleFragments.Article}
`;
