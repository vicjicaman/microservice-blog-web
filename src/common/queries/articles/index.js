import { gql } from "apollo-boost";


export const List = gql`
  query ArticleList {
    viewer {
      id
      username
      articles {
        list {
          id
          title
          abstract
          content
          status
          created_at
          authorid
        }
      }
    }
  }
`;
