import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_API_UR,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      'x-apollo-operation-name': 'true',
      'apollo-require-preflight': 'true',
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
