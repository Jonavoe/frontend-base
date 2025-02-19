import { gql } from '@apollo/client';

export const DELETE = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
