import { gql } from "apollo-boost";

export const Article = gql `
  fragment ArticleFragment on Article {
    id
    title
    url
    abstract
    content
    created_at
    authorid
  }
`;
