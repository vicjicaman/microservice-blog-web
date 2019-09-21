import { gql } from "apollo-boost";


export const List = gql`
  query ArticleList {
    viewer {
      id
      username
      article {
        list {
          id
          title
          abstract
          content
          created_at
          authorid
        }
      }
    }
  }
`;
