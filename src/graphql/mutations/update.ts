import { gql } from '@apollo/client';

export const UPDATE = gql`
  mutation UpdateUser(
    $id: Int!
    $email: String!
    $name: String
    $lastname: String
    $document: String
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      lastname: $lastname
      document: $document
    ) {
      id
      email
      name
      lastname
      document
    }
  }
`;
