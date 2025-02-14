import { gql } from '@apollo/client';

export const USERS = gql`
  query {
    users {
      id
      email
      password
    }
  }
`;
